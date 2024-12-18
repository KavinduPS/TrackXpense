import React, { useState, useEffect } from 'react';

interface Income {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
}

type EditIncomeModalProps = {
  isOpen: boolean;
  income: Income;
  onSave: (updatedIncome: Income) => void;
  onCancel: () => void;
};

const EditIncomeModal: React.FC<EditIncomeModalProps> = ({ isOpen, income, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Income>(income);

  useEffect(() => {
    setFormData(income); // Set initial data when modal opens
  }, [income]);

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
        <h2 className="text-lg font-semibold mb-4 text-blue-600">Edit Income</h2>

        <div className="flex items-center mb-4">
          <label htmlFor="name" className="w-32 text-black font-medium">Income Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Income Name"
            className="w-full p-2 border rounded-lg text-black"
          />
        </div>
        
        <div className="flex items-center mb-4">
          <label htmlFor="amount" className="w-32 text-black font-medium">Income Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Income Amount"
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
            <option value="Primary Job">Primary Job</option>
            <option value="Secondary Job">Secondary Job</option>
            <option value="Sales">Sales</option>
            <option value="Rent">Rent</option>
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

export default EditIncomeModal;
