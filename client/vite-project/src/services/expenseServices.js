import axios from 'axios'; 

const API_URL = 'http://localhost:5000/api';

export const addExpense = async (expense) => {
    try {
        console.log(expense);
      const response = await axios.post(`${API_URL}/expense`, expense);
      return response?.data;
    } catch (error) {
      console.error('Error adding expense:', error);
      return null;
    }
  };

//   fetchExpenses, fetchExpenseTotal

export const fetchExpenses = async (filter) => {
    try {
        let url = `${API_URL}/expense`;
        const params = {};
        console.log(filter);
        
        if (filter.category) {
          params.category = filter.category;
        }
        
        if (filter.startDate && filter.endDate) {
          params.startDate = filter.startDate;
          params.endDate = filter.endDate;
        }
        
        const response = await axios.get(url, { params });
        return response.data;
      } catch (error) {
        console.error('Error fetching expenses:', error);
        return [];
      }

}

export const fetchExpenseTotal = async (startDate, endDate) => {
    try {
        const response = await axios.get(`${API_URL}/expense/total`, {
          params: { startDate, endDate }
        });
        return response.data.total;
      } catch (error) {
        console.error('Error fetching expense total:', error);
        return 0;
      }
}