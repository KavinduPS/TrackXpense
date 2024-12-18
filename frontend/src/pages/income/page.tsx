import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import logo from "../../assets/trackxpense_logo.png";
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import EditIncomeModal from '../../components/EditIncomeModal';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
  name: Yup.string().required("Add expense name"),
  amount: Yup.number()
    .required("Add expense amount")
    .positive("Amount must be positive")
    .typeError("Input only numbers"),
  date: Yup.string().required("Choose a date"),
  category: Yup.string().required("Select category"),
  reference: Yup.string().required("Add reference"),
});

interface Income {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
}

const Incomes: React.FC = () => {
  const [income, setIncome] = useState<Income[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState<number | null>(null);
  const [incomeToEdit, setIncomeToEdit] = useState<Income | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      amount: '',
      date: '',
      category: '',
      reference: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newIncome: Income = {
        id: income.length + 1,
        name: values.name,
        amount: Number(values.amount),
        date: values.date,
        category: values.category,
      };
      setIncome([...income, newIncome]);
      resetForm();
    },
  });

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
    <div className="flex min-h-screen bg-Darkgrayishviolet text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow p-6">
        {/* Logo */}
        <div className="absolute top-0 right-0 p-6 ">
          <img src={logo} alt="TrackXpense Logo" style={{ width: '380px', height: '70px' }} />
        </div>

        {/* Flex Container for Form and Income List */}
        <div className="flex flex-row mt-32 space-x-32">
          {/* Add Income Form */}
          <div className="w-1/3 bg-Darkgrayishviolet p-6 rounded-lg">
            <h2 className="text-xl mb-4">Add Income</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Income Name"
                className="w-3/4 h-10 pl-3 bg-Darkgrayishviolet border border-white rounded-lg text-white focus:outline-none"
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}

              <input
                type="number"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                placeholder="Income Amount"
                className="w-3/4 h-10 pl-3 bg-Darkgrayishviolet border border-white rounded-lg text-white focus:outline-none"
              />
              {formik.errors.amount && formik.touched.amount && (
                <p className="text-red-500 text-sm">{formik.errors.amount}</p>
              )}

              <input
                type="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                className="w-3/4 h-10 pl-3 bg-Darkgrayishviolet border border-white rounded-lg text-white focus:outline-none"
              />
              {formik.errors.date && formik.touched.date && (
                <p className="text-red-500 text-sm">{formik.errors.date}</p>
              )}

              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                className="w-3/4 h-10 pl-3 bg-Darkgrayishviolet border border-white rounded-lg text-white focus:outline-none"
              >
                <option value="" disabled>Category</option>
                <option value="Primary Job">Primary Job</option>
                <option value="Secondary Job">Secondary Job</option>
                <option value="Sales">Sales</option>
                <option value="Rent">Rent</option>
                <option value="Others">Others</option>
              </select>
              {formik.errors.category && formik.touched.category && (
                <p className="text-red-500 text-sm">{formik.errors.category}</p>
              )}

              <textarea
                name="reference"
                value={formik.values.reference}
                onChange={formik.handleChange}
                placeholder="Add A Reference"
                className="w-3/4 h-40 pl-3 bg-Darkgrayishviolet border border-white rounded-lg text-white focus:outline-none"
              ></textarea>
              {formik.errors.reference && formik.touched.reference && (
                <p className="text-red-500 text-sm">{formik.errors.reference}</p>
              )}

              <button
                type="submit"
                className="w-3/4 h-10 bg-orange-300 rounded-lg text-gray-800 font-semibold"
              >
                + Add Income
              </button>
            </form>
          </div>

          {/* Income List */}
          <div className="w-2/3 Darkgrayishviolet p-6 rounded-lg">
            <h2 className="text-xl mb-4">Your Income</h2>
            <div className="space-y-4">
              {income.length > 0 ? (
                income.map((income) => (
                  <div key={income.id} className="flex justify-between items-center p-4  bg-green-300 border border-Darkgrayishviolet rounded-lg">
                    <div className='text-black'>
                      <p className="font-semibold text-left">{income.name}</p>
                      <p className="text-sm">LKR {income.amount} <span className="ml-60">{income.date}</span></p>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        className="text-blue-700 text-xl"
                        onClick={() => openEditModal(income)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 text-xl"
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

        {/* Modals */}
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
        />
        {incomeToEdit && (
          <EditIncomeModal
            isOpen={isEditModalOpen}
            income={incomeToEdit}
            onSave={saveEdit}
            onCancel={closeEditModal}
          />
        )}
      </div>
    </div>
  );
};

export default Incomes;
