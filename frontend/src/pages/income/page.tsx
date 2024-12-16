import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import EditIncomeModal from "../../components/EditIncomeModal";

interface Income {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
}

const Incomes: React.FC = () => {
  const [income, setIncome] = useState<Income[]>([]);
  const [incomeData, setIncomeData] = useState<Partial<Income>>({
    name: "",
    amount: 0,
    date: "",
    category: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState<number | null>(null);
  const [incomeToEdit, setIncomeToEdit] = useState<Income | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setIncomeData({
      ...incomeData,
      [name]: value,
    });
  };

  const addIncome = () => {
    if (
      incomeData.name &&
      incomeData.amount &&
      incomeData.date &&
      incomeData.category
    ) {
      const newIncome: Income = {
        id: income.length + 1,
        name: incomeData.name!,
        amount: Number(incomeData.amount),
        date: incomeData.date!,
        category: incomeData.category!,
      };
      setIncome([...income, newIncome]);
      setIncomeData({ name: "", amount: 0, date: "", category: "" });
    }
  };

  const openDeleteModal = (id: number) => {
    setIncomeToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setIncomeToDelete(null);
  };

  const confirmDelete = () => {
    if (incomeToDelete !== null) {
      setIncome(income.filter((item) => item.id !== incomeToDelete));
    }
    closeDeleteModal();
  };

  const openEditModal = (income: Income) => {
    setIncomeToEdit(income);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setIncomeToEdit(null);
  };

  const saveEdit = (updatedIncome: Income) => {
    setIncome(
      income.map((item) =>
        item.id === updatedIncome.id ? updatedIncome : item
      )
    );
    closeEditModal();
  };

  return (
    <div className="flex min-h-screen bg-zinc-600 text-white">
      <Sidebar />

      <div className="flex-grow p-8">
        <div className="relative">
          <div className="absolute top-0 right-6 m-4">
            <img
              src={logo}
              alt="TrackXpense Logo"
              style={{ width: "380px", height: "80px" }}
            />
          </div>
        </div>

        <div className="flex justify-between mt-40">
          <div className="w-full lg:w-1/3 p-4 bg-zinc-700 rounded-lg mr-8">
            <h2 className="text-xl mb-4">Income</h2>
            <input
              type="text"
              name="name"
              value={incomeData.name || ""}
              onChange={handleChange}
              placeholder="Income Name"
              className="w-full p-2 mb-4 bg-zinc-600 rounded-lg"
            />
            <input
              type="number"
              name="amount"
              value={incomeData.amount || ""}
              onChange={handleChange}
              placeholder="Income Amount"
              className="w-full p-2 mb-4 bg-zinc-600 rounded-lg"
            />
            <input
              type="date"
              name="date"
              value={incomeData.date || ""}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-zinc-600 rounded-lg"
            />
            <select
              name="category"
              value={incomeData.category || ""}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-zinc-600 rounded-lg"
            >
              <option value="" disabled>
                Category
              </option>
              <option value="Primary Job">Primary Job</option>
              <option value="Secondary Job">Secondary Job</option>
              <option value="Sales">Sales</option>
              <option value="Rent">Rent</option>
              <option value="Others">Others</option>
            </select>
            <textarea
              name="reference"
              placeholder="Add A Reference"
              className="w-full p-2 mb-4 bg-zinc-600 rounded-lg"
            ></textarea>
            <button
              onClick={addIncome}
              className="w-full py-2 bg-orange-500 rounded-lg text-white font-semibold"
            >
              + Add Income
            </button>
          </div>

          <div className="w-full lg:w-2/3 p-4 bg-zinc-800 rounded-lg">
            <h2 className="text-xl mb-4">Your Income</h2>
            <div className="space-y-4">
              {income.length > 0 ? (
                income.map((income) => (
                  <div
                    key={income.id}
                    className="flex justify-between items-center p-4 bg-zinc-700 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{income.name}</p>
                      <p className="text-sm">LKR {income.amount}</p>
                      <p className="text-sm">{income.date}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        className="text-yellow-500"
                        onClick={() => openEditModal(income)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => openDeleteModal(income.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No incomes added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {/* <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      /> */}

      {/* Edit Income Modal */}
      {incomeToEdit && (
        <EditIncomeModal
          isOpen={isEditModalOpen}
          income={incomeToEdit}
          onSave={saveEdit}
          onCancel={closeEditModal}
        />
      )}
    </div>
  );
};

export default Incomes;
