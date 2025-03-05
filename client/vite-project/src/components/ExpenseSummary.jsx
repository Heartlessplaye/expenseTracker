import React, { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { PieChart, DollarSign, Calendar } from "lucide-react";


const ExpenseSummary = ({ expenses, totalAmount, dateRange }) => {
  const [netAmount, setNetAmount] = useState(0);
  const categoryTotals = useMemo(() => {
    const totals = {};
    let  amo = 0;
    expenses.forEach((expense) => {
      if (!totals[expense.category]) {
        totals[expense.category] = 0;
      }
      amo += expense.amount;
      totals[expense.category] += expense.amount;
    });

    setNetAmount(amo);

    const categoryData = Object.entries(totals).map(
      ([category, total]) => ({
        category,
        total,
        percentage: (total / totalAmount) * 100,
      })
    );

    return categoryData.sort((a, b) => b.total - a.total);
  }, [expenses, totalAmount]);

  const getRandomColor = (index) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-gray-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 text-sm font-medium flex items-center">
            <DollarSign size={16} className="mr-1" />
            Total Expenses
          </h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">
          ${netAmount?.toFixed(2)}
        </p>

        {dateRange && (
          <div className="mt-2 text-sm text-gray-500 flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>
              {format(parseISO(dateRange.start), "MMM dd")} -{" "}
              {format(parseISO(dateRange.end), "MMM dd, yyyy")}
            </span>
          </div>
        )}
      </div>

      {categoryTotals.length > 0 && (
        <div>
          <h3 className="text-gray-600 text-sm font-medium mb-3 flex items-center">
            <PieChart size={16} className="mr-1" />
            Expenses by Category
          </h3>

          <div className="space-y-3">
            {categoryTotals.map((category, index) => (
              <div key={category.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{category.category}</span>
                  <span className="font-medium">
                    ${category.total.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${getRandomColor(index)}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {expenses.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <p>No expense data to display</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;
