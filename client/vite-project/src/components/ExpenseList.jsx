import React from "react";
import { format, parseISO } from "date-fns";
import { Trash2 } from "lucide-react";
// import { deleteExpense } from '../services/expenseService';

// interface ExpenseListProps {
//   expenses: Expense[];
//   loading: boolean;
//   onExpenseDeleted: () => void;
// }

const ExpenseList = ({ expenses, loading }) => {
  //   const handleDelete = async (id) => {
  //     if (window.confirm('Are you sure you want to delete this expense?')) {
  //       const success = await deleteExpense(id);
  //       if (success) {
  //         onExpenseDeleted();
  //       }
  //     }
  //   };

  const getCategoryColor = (category) => {
    const colors = {
      Food: "bg-red-100 text-red-800",
      Transportation: "bg-blue-100 text-blue-800",
      Housing: "bg-green-100 text-green-800",
      Utilities: "bg-yellow-100 text-yellow-800",
      Entertainment: "bg-purple-100 text-purple-800",
      Healthcare: "bg-pink-100 text-pink-800",
      Shopping: "bg-indigo-100 text-indigo-800",
      Education: "bg-teal-100 text-teal-800",
      Travel: "bg-orange-100 text-orange-800",
      Other: "bg-gray-100 text-gray-800",
    };

    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading expenses...</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">
          No expenses found. Add your first expense to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense) => (
            <tr key={expense._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(parseISO(expense.date), "MMM dd, yyyy")}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {expense.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                    expense.category
                  )}`}
                >
                  {expense.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                ${expense.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {/* <button
                  onClick={() => handleDelete(expense._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
