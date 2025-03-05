import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Filter,
  DollarSign,
  Calendar,
  BarChart,
} from "lucide-react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseSummary from "./components/ExpenseSummary";
import { fetchExpenses, fetchExpenseTotal } from "./services/expenseServices";
// import { Expense, ExpenseFilter as FilterType } from './types';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const data = await fetchExpenses(filter);
      const expensesData = data?.data;
      setExpenses(expensesData);

     
      if (filter.startDate && filter.endDate) {
        const total = await fetchExpenseTotal(filter.startDate, filter.endDate);
        setTotalAmount(total);
      } else {
        
        const sum = expensesData?.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        console.log(sum);
        setTotalAmount(sum);
      }
    } catch (error) {
      console.error("Error loading expenses:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleExpenseAdded = () => {
    setShowForm(false);
    loadExpenses();
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setShowFilter(false);
  };

  const handleFilterReset = () => {
    setFilter({
      category: "",
      startDate: "",
      endDate: "",
    });
    setShowFilter(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <DollarSign size={24} />
            <h1 className="text-xl font-bold">Expense Tracker</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-1 bg-indigo-700 hover:bg-indigo-800 px-3 py-2 rounded-md transition-colors"
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md transition-colors"
            >
              <PlusCircle size={16} />
              <span>Add Expense</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {showForm && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <ExpenseForm
              onExpenseAdded={handleExpenseAdded}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {showFilter && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <ExpenseFilter
              currentFilter={filter}
              onFilterChange={handleFilterChange}
              onReset={handleFilterReset}
              onCancel={() => setShowFilter(false)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Calendar size={18} className="mr-2" />
                  Expense History
                </h2>
                {(filter.category || filter.startDate || filter.endDate) && (
                  <div className="text-sm text-gray-500 flex items-center">
                    <span>Filtered view</span>
                    <button
                      onClick={handleFilterReset}
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
              <ExpenseList
                expenses={expenses}
                loading={loading}
                onExpenseDeleted={loadExpenses}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <BarChart size={18} className="mr-2" />
                Summary
              </h2>
              <ExpenseSummary
                expenses={expenses}
                totalAmount={totalAmount}
                dateRange={
                  filter.startDate && filter.endDate
                    ? {
                        start: filter.startDate,
                        end: filter.endDate,
                      }
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
