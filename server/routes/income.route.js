import { Router } from "express";
import {
  createIncome,
  getIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/income.controller.js";

const router = Router();

// INCOME ROUTES
router.get("/", getIncomes);
router.get("/:id", getIncome);
router.post("/", createIncome);
router.put("/:id", updateIncome);
router.delete("/:id", deleteIncome);

export default router;
