import { prisma } from "../db/prisma";

//GET ALL INCOME CATEGORIES
export const getIncomeCategories = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const categories = await prisma.incomeCategory.findMany({
      where: {
        OR: [{ user_id: null }, { user_id: userId }],
      },
      orderBy: [
        { is_custom: "asc" }, //system categories are displayed first
        { category_name: "asc" },
      ],
    });

    res.json(categories);
  } catch (error) {
    console.error("Error fetching income categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//POST
export const createIncomeCategory = async (req, res) => {
  try {
    const { category_name, icon_url, icon_emoji } = req.body;
    const userId = req.user.user_id;

    if (!category_name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const existingCategory = await prisma.incomeCategory.findFirst({
      where: {
        category_name,
        user_id: userId,
      },
    });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = await prisma.incomeCategory.create({
      data: {
        category_name,
        icon_url,
        icon_emoji,
        is_custom: true,
        user_id: userId,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating income category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//PUT - PATCH
export const updateIncomeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, icon_url, icon_emoji } = req.body;
    const userId = req.user.user_id;

    if (!category_name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const existingCategory = await prisma.incomeCategory.findFirst({
      where: {
        category_id: parseInt(id),
        user_id: userId,
      },
    });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const duplicateCategory = await prisma.incomeCategory.findFirst({
      where: {
        category_name,
        user_id: userId,
        NOT: {
          category_id: parseInt(id),
        },
      },
    });

    if (duplicateCategory) {
      return res.status(400).json({ error: "Category name already exists" });
    }

    const category = await prisma.incomeCategory.update({
      where: {
        category_id: parseInt(id),
      },
      data: {
        category_name,
        icon_url,
        icon_emoji,
      },
    });

    res.json(category);
  } catch (error) {
    console.error("Error updating income category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//DELETE
export const deleteIncomeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user_id;

    const category = await prisma.incomeCategory.findFirst({
      where: {
        category_id: parseInt(id),
        user_id: userId,
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const incomesUsingCategory = await prisma.income.count({
      where: {
        category_id: parseInt(id),
      },
    });

    if (incomesUsingCategory > 0) {
      return res.status(400).json({
        error: "Cannot delete category that is being used by incomes",
      });
    }

    await prisma.incomeCategory.delete({
      where: {
        category_id: parseInt(id),
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting income category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
