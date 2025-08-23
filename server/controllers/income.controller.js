import incomeService from "../services/income.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//---------------INCOME---------------//

export const createIncome = asyncHandler(async (req, res) => {
  const { amount, date, source, description, category_id } = req.body;

  if (!amount || !category_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const incomeData = {
    amount: parseFloat(amount),
    source: source || "",
    description: description || "",
    category: { connect: { category_id: parseInt(category_id) } },
  };

  if (date) {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      incomeData.date = parsedDate;
    }
  }

  const income = await incomeService.createIncome(req.user.user_id, incomeData);
  res.status(201).json(income);
});

export const getIncomes = asyncHandler(async (req, res) => {
  const { start, end } = req.query;
  const filters = {};

  if (start) filters.start = new Date(start);
  if (end) filters.end = new Date(end);

  const incomes = await incomeService.getIncomes(req.user.user_id, filters);
  res.json(incomes);
});

export const getIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const income = await incomeService.getIncomeById(id, req.user.user_id);

  if (!income) {
    return res.status(404).json({ error: "Income not found" });
  }

  res.json(income);
});

export const updateIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (updates.date) updates.date = new Date(updates.date);
  if (updates.amount) updates.amount = parseFloat(updates.amount);
  if (updates.category_id) {
    updates.category = {
      connect: { category_id: parseInt(updates.category_id) },
    };
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
    res.status(404).json({ error: error.message });
  }
});

export const deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await incomeService.deleteIncome(id, req.user.user_id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//---------------INCOME CATEGORIES---------------//

export const getIncomeCategories = asyncHandler(async (req, res) => {
  const categories = await incomeService.getIncomeCategories(req.user.user_id);
  res.json(categories);
});

export const getIncomeCategoriesByUser = asyncHandler(async (req, res) => {
  const categories = await incomeService.getIncomeCategoriesByUser(
    req.user.user_id
  );
  res.json(categories);
});

export const createIncomeCategory = asyncHandler(async (req, res) => {
  const { category_name, icon_url, icon_emoji } = req.body;

  if (!category_name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
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
    res.status(400).json({ error: error.message });
  }
});

export const updateIncomeCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category_name, icon_url, icon_emoji } = req.body;

  if (!category_name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const category = await incomeService.updateIncomeCategory(
      id,
      req.user.user_id,
      { category_name, icon_url, icon_emoji }
    );
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export const deleteIncomeCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await incomeService.deleteIncomeCategory(id, req.user.user_id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
