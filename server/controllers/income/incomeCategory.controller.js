import { incomeService } from "../../services/income/income.service";
import { asyncHandler } from "../../utils/asyncHandler";

const getIncomeCategories = asyncHandler(async (req, res) => {
  const categories = await incomeService.getIncomeCategories(req.user.user_id);
  res.json(categories);
});

const createIncomeCategory = asyncHandler(async (req, res) => {
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

const updateIncomeCategory = asyncHandler(async (req, res) => {
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

const deleteIncomeCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await incomeService.deleteIncomeCategory(id, req.user.user_id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default {
  getIncomeCategories,
  createIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
};
