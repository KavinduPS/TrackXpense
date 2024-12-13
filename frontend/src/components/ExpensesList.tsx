import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../State/store";
import { deleteExpense, editExpense } from "../State/ExpenseSlice";
import EditExpenseModal from "../components/EditExpenseModal";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const ExpenseList: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expense.expenses);
  const dispatch = useDispatch();

  const [editExpenseData, setEditExpenseData] = useState<any | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteExpense(id));
  };

  const handleEdit = (expense: any) => {
    setEditExpenseData(expense);
  };

  const handleSaveChanges = (updatedData: any) => {
    dispatch(editExpense(updatedData));
    setEditExpenseData(null);
  };

  const handleCancel = () => {
    setEditExpenseData(null);
  };

  const handleChange = (field: string, value: string | number) => {
    setEditExpenseData((prevData: any) => ({ ...prevData, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-gray-200 text-xl font-semibold mb-4">Expense List</h2>
      {expenses.length > 0 ? (
        expenses.map((exp) => (
          <div
            key={exp.id}
            className="flex items-center justify-between p-4 w-full bg-green-300 rounded "
          >
            <div className="text-left text-Darkgrayishviolet font-semibold">
              <p>{exp.name}</p>
              <p>LKR {exp.amount}</p>
            </div>
            <div className="mt-6 text-left text-Darkgrayishviolet font-semibold">
              <p>{exp.date}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(exp)}
                className="text-blue-700 text-3xl"
              >
                <AiFillEdit />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="text-red-500 text-3xl"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-200 ">No expenses added yet.</p>
      )}

      {editExpenseData && (
        <EditExpenseModal
          expenseData={editExpenseData}
          onSave={handleSaveChanges}
          onCancel={handleCancel}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default ExpenseList;
