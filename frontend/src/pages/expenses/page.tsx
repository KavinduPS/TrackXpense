import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; 
import Sidebar from '../../components/Sidebar';
import logo from "../../assets/trackxpense_logo.png";
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal'; 
import EditExpenseModal from '../../components/EditExpenseModal';

interface Expense {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
}

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseData, setExpenseData] = useState<Partial<Expense>>({
    name: '',
    amount: 0,
    date: '',
    category: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExpenseData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addExpense = () => {
    if (expenseData.name && expenseData.amount && expenseData.date && expenseData.category) {
      const newExpense: Expense = {
        id: expenses.length + 1,
        name: expenseData.name!,
        amount: Number(expenseData.amount),
        date: expenseData.date!,
        category: expenseData.category!,
      };
      setExpenses([...expenses, newExpense]);
      setExpenseData({ name: '', amount: 0, date: '', category: '' });
    }
  };

  const openDeleteModal = (id: number) => {
    setExpenseToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setExpenseToDelete(null);
  };

  const confirmDelete = () => {
    if (expenseToDelete !== null) {
      setExpenses(expenses.filter(expense => expense.id !== expenseToDelete));
    }
    closeDeleteModal();
  };

  const openEditModal = (expense: Expense) => {
    setExpenseToEdit(expense);
    setExpenseData(expense); // Pre-fill the form with the selected expense data
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setExpenseToEdit(null);
    setExpenseData({ name: '', amount: 0, date: '', category: '' }); // Reset the form
  };

  const handleSaveEdit = () => {
    if (expenseToEdit) {
      const updatedExpense: Expense = {
        ...expenseToEdit,
        ...expenseData, // Merge the changes from the form
        amount: Number(expenseData.amount), // Ensure amount is a number
      };

      setExpenses(expenses.map(expense => (expense.id === updatedExpense.id ? updatedExpense : expense)));
      closeEditModal();
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-600 text-white">
      <Sidebar />

      <div className="flex-grow p-8">
        <div className="relative">
          <div className="absolute top-0 right-6 m-4">
            <img src={logo} alt="TrackXpense Logo" style={{ width: '380px', height: '80px' }} />
          </div>
        </div>

        <div className="flex justify-between mt-40">
          <div className="w-full lg:w-1/3 p-4 bg-zinc-700 rounded-lg mr-8">
            <h2 className="text-xl mb-4">Expenses</h2>
            <input
              type="text"
              name="name"
              value={expenseData.name || ''}
              onChange={handleChange}
              placeholder="Expense Name"
              className="w-full p-2 mb-4 bg-zinc-600 rounded-lg"
            />
            <input
              type="number"
              name="amount"
              value={expenseData.amount || ''}
              onChange={handleChange}
              placeholder="Expense Amount"
              className="w-full p-2 mb-4 bg-zinc-600 rounded-lg"
            />
            <input
              type="date"
              name="date"
              value={expenseData.date || ''}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-zinc-600 rounded-lg"
            />
            <select
              name="category"
              value={expenseData.category || ''}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-zinc-600 rounded-lg"
            >
              <option value="" disabled>Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Others">Others</option>
            </select>
            <textarea
              name="reference"
              placeholder="Add A Reference"
              className="w-full p-2 mb-4 bg-zinc-600 rounded-lg"
            ></textarea>
            <button
              onClick={addExpense}
              className="w-full py-2 bg-orange-500 rounded-lg text-white font-semibold"
            >
              + Add Expense
            </button>
          </div>

          <div className="w-full lg:w-2/3 p-4 bg-zinc-800 rounded-lg">
            <h2 className="text-xl mb-4">Your Expenses</h2>
            <div className="space-y-4">
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <div key={expense.id} className="flex justify-between items-center p-4 bg-zinc-700 rounded-lg">
                    <div>
                      <p className="font-semibold">{expense.name}</p>
                      <p className="text-sm">LKR {expense.amount}</p>
                      <p className="text-sm">{expense.date}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button 
                        className="text-yellow-500"
                        onClick={() => openEditModal(expense)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => openDeleteModal(expense.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No expenses added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />

      {/* Edit Expense Modal */}
      <EditExpenseModal
  isOpen={isEditModalOpen}
  expense={expenseToEdit || { id: 0, name: '', amount: 0, date: '', category: '' }} // Default to a blank expense object
  onSave={handleSaveEdit}
  onCancel={closeEditModal}
/>

    </div>
  );
};

export default Expenses;
