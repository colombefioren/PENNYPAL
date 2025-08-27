import incomeService from "../services/income.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//---------------INCOME---------------//

export const createIncome = asyncHandler(async (req, res) => {
  const { amount, date, source, description } = req.body;

  if (!amount || !date) {
    return res
      .status(400)
      .json({ error: "Missing required fields: amount and date are required" });
  }

  const incomeData = {
    amount: parseFloat(amount),
    source: source || "",
    description: description || "",
  };

  const parsedDate = new Date(date);
  if (!isNaN(parsedDate.getTime())) {
    incomeData.date = parsedDate;
  } else {
    return res.status(400).json({ error: "Invalid date format" });
  }

  try {
    const income = await incomeService.createIncome(
      req.user.user_id,
      incomeData
    );
    res.status(201).json(income);
  } catch (error) {
    console.error("Error creating income:", error);
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
