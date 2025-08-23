import { prisma } from "../db/prisma";

//GET ALL INCOMES
export const getIncomes = async (req, res) => {
  try {
    const { start, end } = req.query;
    const userId = req.user.user_id;

    let whereClause = { user_id: userId };

    if (start || end) {
      whereClause.date = {};
      if (start) whereClause.date.gte = new Date(start);
      if (end) whereClause.date.lte = new Date(end);
    }

    const incomes = await prisma.income.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    res.json(incomes);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//GET BY ID
export const getIncomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;

    const income = await prisma.income.findFirst({
      where: {
        income_id: parseInt(id),
        user_id: userId,
      },
      include: {
        category: true,
      },
    });

    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }

    res.json(income);
  } catch (error) {
    console.error("Error fetching income:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//POST
export const createIncome = async (req, res) => {
  try {
    const { amount, date, source, description, category_id } = req.body;
    const userId = req.user.user_id;

    if (!amount || !date || !source || !category_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const category = await prisma.incomeCategory.findFirst({
      where: {
        category_id: parseInt(category_id),
        OR: [{ user_id: userId }, { user_id: null }],
      },
    });

    if (!category) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const income = await prisma.income.create({
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        source,
        description,
        user_id: userId,
        category_id: parseInt(category_id),
      },
      include: {
        category: true,
      },
    });

    res.status(201).json(income);
  } catch (error) {
    console.error("Error creating income:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//PUT - PATCH
export const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, source, description, category_id } = req.body;
    const userId = req.user.user_id;

    const existingIncome = await prisma.income.findFirst({
      where: {
        income_id: parseInt(id),
        user_id: userId,
      },
    });

    if (!existingIncome) {
      return res.status(404).json({ error: "Income not found" });
    }

    if (category_id) {
      const category = await prisma.incomeCategory.findFirst({
        where: {
          category_id: parseInt(category_id),
          OR: [{ user_id: userId }, { user_id: null }],
        },
      });

      if (!category) {
        return res.status(400).json({ error: "Invalid category" });
      }
    }

    const income = await prisma.income.update({
      where: {
        income_id: parseInt(id),
      },
      data: {
        ...(amount && { amount: parseFloat(amount) }),
        ...(date && { date: new Date(date) }),
        ...(source && { source }),
        ...(description !== undefined && { description }),
        ...(category_id && { category_id: parseInt(category_id) }),
      },
      include: {
        category: true,
      },
    });

    res.json(income);
  } catch (error) {
    console.error("Error updating income:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//DELETE
export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;

    const income = await prisma.income.findFirst({
      where: {
        income_id: parseInt(id),
        user_id: userId,
      },
    });

    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }

    await prisma.income.delete({
      where: {
        income_id: parseInt(id),
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
