import incomeService from "../services/income.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//---------------INCOME---------------//

export const createIncome = asyncHandler(async (req, res) => {
  const { amount, date, source, description, category_id } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const incomeData = {
    amount: parseFloat(amount),
    source: source || "",
    description: description || "",
  };

  if (category_id) {
    incomeData.category = { connect: { category_id: parseInt(category_id) } };
  } else {
    incomeData.category = { connect: { category_id: 1 } };
  }

  if (date) {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      incomeData.date = parsedDate;
    } else {
      return res.status(400).json({ error: "Invalid date format" });
    }
  } else {
    incomeData.date = new Date();
  }

  try {
    const income = await incomeService.createIncome(
      req.user.user_id,
      incomeData
    );
    res.status(201).json(income);
  } catch (error) {
    console.error("Error creating income:", error);

    if (
      error.message.includes("category") ||
      error.message.includes("Category")
    ) {
      return res.status(400).json({ error: "Invalid category specified" });
    }

    res.status(500).json({ error: "Failed to create income" });
  }
});

export const getIncomes = asyncHandler(async (req, res) => {
  const { start, end } = req.query;
  const filters = {};

  if (start) {
    const parsedStart = new Date(start);
    if (!isNaN(parsedStart.getTime())) {
      filters.start = parsedStart;
    } else {
      return res.status(400).json({ error: "Invalid start date format" });
    }
  }

  if (end) {
    const parsedEnd = new Date(end);
    if (!isNaN(parsedEnd.getTime())) {
      filters.end = parsedEnd;
    } else {
      return res.status(400).json({ error: "Invalid end date format" });
    }
  }

  try {
    const incomes = await incomeService.getIncomes(req.user.user_id, filters);
    res.json(incomes);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ error: "Failed to fetch incomes" });
  }
});

export const getIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid income ID" });
  }

  try {
    const income = await incomeService.getIncomeById(id, req.user.user_id);

    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }

    res.json(income);
  } catch (error) {
    console.error("Error fetching income:", error);
    res.status(500).json({ error: "Failed to fetch income" });
  }
});

export const updateIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid income ID" });
  }

  const updates = req.body;

  if (updates.amount !== undefined) {
    if (isNaN(parseFloat(updates.amount))) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    updates.amount = parseFloat(updates.amount);
  }

  if (updates.date) {
    const parsedDate = new Date(updates.date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }
    updates.date = parsedDate;
  }

  if (updates.category_id !== undefined) {
    if (updates.category_id === null || updates.category_id === "") {
      updates.category = { connect: { category_id: 1 } };
    } else {
      const categoryId = parseInt(updates.category_id);
      if (isNaN(categoryId)) {
        return res.status(400).json({ error: "Invalid category ID" });
      }
      updates.category = { connect: { category_id: categoryId } };
    }
    delete updates.category_id;
  }

  try {
    const income = await incomeService.updateIncome(
      id,
      req.user.user_id,
      updates
    );
    res.json(income);
  } catch (error) {
    console.error("Error updating income:", error);

    if (
      error.message.includes("not found") ||
      error.message.includes("not authorized")
    ) {
      return res
        .status(404)
        .json({ error: "Income not found or not authorized" });
    }

    if (
      error.message.includes("category") ||
      error.message.includes("Category")
    ) {
      return res.status(400).json({ error: "Invalid category specified" });
    }

    res.status(500).json({ error: "Failed to update income" });
  }
});

export const deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid income ID" });
  }

  try {
    await incomeService.deleteIncome(id, req.user.user_id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting income:", error);

    if (
      error.message.includes("not found") ||
      error.message.includes("not authorized")
    ) {
      return res
        .status(404)
        .json({ error: "Income not found or not authorized" });
    }

    res.status(500).json({ error: "Failed to delete income" });
  }
});

//---------------INCOME CATEGORIES---------------//

export const getIncomeCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await incomeService.getIncomeCategories(
      req.user.user_id
    );
    res.json(categories);
  } catch (error) {
    console.error("Error fetching income categories:", error);
    res.status(500).json({ error: "Failed to fetch income categories" });
  }
});

export const getIncomeCategoriesByUser = asyncHandler(async (req, res) => {
  try {
    const categories = await incomeService.getIncomeCategoriesByUser(
      req.user.user_id
    );
    res.json(categories);
  } catch (error) {
    console.error("Error fetching user income categories:", error);
    res.status(500).json({ error: "Failed to fetch user income categories" });
  }
});

export const createIncomeCategory = asyncHandler(async (req, res) => {
  try {
    const { category_name, icon_url, icon_emoji } = req.body;

    if (!category_name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const category = await incomeService.createIncomeCategory(
      req.user.user_id,
      {
        category_name,
        icon_url,
        icon_emoji,
      }
    );
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating income category:", error);

    if (error.message.includes("already exists")) {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: "Failed to create income category" });
  }
});

export const updateIncomeCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, icon_url, icon_emoji } = req.body;

    if (!category_name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const category = await incomeService.updateIncomeCategory(
      id,
      req.user.user_id,
      { category_name, icon_url, icon_emoji }
    );
    res.json(category);
  } catch (error) {
    console.error("Error updating income category:", error);

    if (
      error.message.includes("not found") ||
      error.message.includes("not authorized")
    ) {
      return res.status(404).json({ error: error.message });
    }

    if (error.message.includes("already exists")) {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: "Failed to update income category" });
  }
});

export const deleteIncomeCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    await incomeService.deleteIncomeCategory(id, req.user.user_id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting income category:", error);

    if (
      error.message.includes("not found") ||
      error.message.includes("not authorized")
    ) {
      return res.status(404).json({ error: error.message });
    }

    if (error.message.includes("being used")) {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: "Failed to delete income category" });
  }
});
