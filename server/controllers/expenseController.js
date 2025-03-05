import { Expense } from "../models/Expense.js";

export const createExpense = async (req, res) => {
  try {
    // const { amount, category, date, description } = req.body;
    console.log(req.body);
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json({ success: true, data: newExpense });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const expenses = await Expense.find(filter).sort({ date: -1 });

    res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTotalExpenses = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const totalExpenses = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    console.log(totalExpenses);
    res.status(200).json({
      success: true,
      data:
        totalExpenses?.length > 0
          ? { totalExpenses: totalExpenses[0].total }
          : {
              totalExpenses: 0,
            },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
