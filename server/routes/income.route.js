import { Router } from "express";
import {
  createIncome,
  getIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/income.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// INCOME ROUTES
router.get("/", requireAuth, getIncomes);
router.get("/:id", requireAuth, getIncome);
router.post("/", requireAuth, createIncome);
router.put("/:id", requireAuth, updateIncome);
router.delete("/:id", requireAuth, deleteIncome);

export default router;
