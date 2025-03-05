import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const expenseTypes = [
  "Food",
  "Housing",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Education",
  "Travel",
  "Other",
];

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    category: {
      type: String,
      required: true,
      enum: expenseTypes,
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Expense", expenseSchema);
