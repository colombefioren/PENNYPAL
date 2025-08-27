import { prisma } from "../db/prisma.js";

//---------------INCOME---------------//

//POST
const createIncome = async (userId, data) => {
  return await prisma.income.create({
    data: {
      ...data,
      user: { connect: { id: userId } },
    },
  });
};

//GET ALL (with start and end date query params)
const getIncomes = async (userId, filters = {}) => {
  const where = { userId };

  if (filters.start || filters.end) {
    where.date = {};
    if (filters.start) where.date.gte = new Date(filters.start);
    if (filters.end) where.date.lte = new Date(filters.end);
  }

  return await prisma.income.findMany({
    where,
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
};

//GET BY ID
const getIncomeById = async (id, userId) => {
  return await prisma.income.findFirst({
    where: { id: parseInt(id), userId },
  });
};

//UPDATE
const updateIncome = async (id, userId, data) => {
  const income = await prisma.income.findFirst({
    where: { id: parseInt(id), userId },
  });

  if (!income) {
    throw new Error("Income not found or not authorized");
  }

  return await prisma.income.update({
    where: { id: parseInt(id) },
    data,
  });
};

//DELETE
const deleteIncome = async (id, userId) => {
  const income = await prisma.income.findFirst({
    where: { id: parseInt(id), userId },
  });

  if (!income) {
    throw new Error("Income not found or not authorized");
  }

  await prisma.income.delete({
    where: { id: parseInt(id) },
  });
};

export default {
  createIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
};
