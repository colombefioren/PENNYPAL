import { prisma } from "../../db/prisma";

//---------------INCOME---------------//

//POST
const createIncome = async (userId, data) => {
  return await prisma.income.create({
    data: {
      ...data,
      user: { connect: { user_id: userId } },
    },
    include: { category: true },
  });
};

//GET ALL (with start and end date query params)
const getIncomes = async (userId, filters = {}) => {
  const where = { user_id: userId };

  if (filters.start || filters.end) {
    where.date = {};
    if (filters.start) where.date.gte = new Date(filters.start);
    if (filters.end) where.date.lte = new Date(filters.end);
  }

  return await prisma.income.findMany({
    where,
    include: { category: true },
    orderBy: { date: "desc" },
  });
};

//GET BY ID
const getIncomeById = async (id, userId) => {
  return await prisma.income.findFirst({
    where: { income_id: parseInt(id), user_id: userId },
    include: { category: true },
  });
};

//UPDATE
const updateIncome = async (id, userId, data) => {
  const income = await prisma.income.findFirst({
    where: { income_id: parseInt(id), user_id: userId },
  });

  if (!income) {
    throw new Error("Income not found or not authorized");
  }

  return await prisma.income.update({
    where: { income_id: parseInt(id) },
    data,
    include: { category: true },
  });
};

//DELETE
const deleteIncome = async (id, userId) => {
  const income = await prisma.income.findFirst({
    where: { income_id: parseInt(id), user_id: userId },
  });

  if (!income) {
    throw new Error("Income not found or not authorized");
  }

  await prisma.income.delete({
    where: { income_id: parseInt(id) },
  });
};

//---------------INCOME CATEGORY---------------//

//GET ALL
const getIncomeCategories = async (userId) => {
  return await prisma.incomeCategory.findMany({
    where: {
      OR: [{ user_id: null }, { user_id: userId }],
    },
    orderBy: [{ is_custom: "asc" }, { category_name: "asc" }],
  });
};

//GET ALL BY USER
const getIncomeCategoriesByUser = async (userId) => {
  return await prisma.incomeCategory.findMany({
    where: {
      user_id: userId,
    },
    orderBy: [{ is_custom: "asc" }, { category_name: "asc" }],
  });
};

//POST
const createIncomeCategory = async (userId, data) => {
  const existingCategory = await prisma.incomeCategory.findFirst({
    where: {
      category_name: data.category_name,
      user_id: userId,
    },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return await prisma.incomeCategory.create({
    data: {
      ...data,
      is_custom: true,
      user: { connect: { user_id: userId } },
    },
  });
};

//UPDATE
const updateIncomeCategory = async (id, userId, data) => {
  const category = await prisma.incomeCategory.findFirst({
    where: { category_id: parseInt(id), user_id: userId },
  });

  if (!category) {
    throw new Error("Category not found or not authorized");
  }

  if (data.category_name) {
    const duplicateCategory = await prisma.incomeCategory.findFirst({
      where: {
        category_name: data.category_name,
        user_id: userId,
        NOT: { category_id: parseInt(id) },
      },
    });

    if (duplicateCategory) {
      throw new Error("Category name already exists");
    }
  }

  return await prisma.incomeCategory.update({
    where: { category_id: parseInt(id) },
    data,
  });
};

//DELETE
const deleteIncomeCategory = async (id, userId) => {
  const category = await prisma.incomeCategory.findFirst({
    where: { category_id: parseInt(id), user_id: userId },
  });

  if (!category) {
    throw new Error("Category not found or not authorized");
  }

  const incomesUsingCategory = await prisma.income.count({
    where: { category_id: parseInt(id) },
  });

  if (incomesUsingCategory > 0) {
    throw new Error("Cannot delete category that is being used by incomes");
  }

  await prisma.incomeCategory.delete({
    where: { category_id: parseInt(id) },
  });
};

export default {
  createIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
  getIncomeCategories,
  createIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
};
