import React, { useState, useEffect } from 'react';

interface Expense {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
}

type EditExpenseModalProps = {
  isOpen: boolean;
  expense: Expense;
  onSave: (updatedExpense: Expense) => void;
  onCancel: () => void;
};

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({ isOpen, expense, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Expense>(expense);

  useEffect(() => {
    setFormData(expense); // Set initial data when modal opens
  }, [expense]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const handleSave = () => {
    onSave(formData); // Pass updated data back to parent component
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">Edit Expense</h2>

        <div className="flex items-center mb-4">
          <label htmlFor="name" className="w-32 text-black font-medium">Expense Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Expense Name"
            className="w-full p-2 border rounded-lg text-black"
          />
        </div>
        
        <div className="flex items-center mb-4">
          <label htmlFor="amount" className="w-32 text-black font-medium">Expense Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Expense Amount"
            className="w-full p-2 border rounded-lg text-black"
          />
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="date" className="w-32 text-black font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-black"
          />
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="category" className="w-32 text-black font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-black"
          >
            <option value="" disabled>Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
