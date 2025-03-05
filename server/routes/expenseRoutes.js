// POST /expenses → Add a new expense.
// GET /expenses → Retrieve all expenses.
// GET /expenses?category=Food&date=YYYY-MM-DD → Filter expenses.
// GET /expenses/total?start=YYYY-MM-DD&end=YYYY-MM-DD → Get total expenses for a date range.

import express from "express";
import {
  createExpense,
  getAllExpenses,
  getTotalExpenses
} from "../controllers/expenseController.js";
const router = express.Router();

// CREATE EXPENSE 
router.route("/").post(createExpense);

// GET ALL EXPENSES
router.route("/").get(getAllExpenses);

// GET TOTAL EXPENSES FROM A PARTICULAR DATE RANGE
router.route("/total").get(getTotalExpenses);

export default router;
