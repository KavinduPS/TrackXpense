import React, { ReactNode, useState } from "react";
import AddExpenseForm from "../../components/ExpenseForm";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import {
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetAllExpensesQuery,
  useUpdateExpenseMutation,
} from "../../modules/expenses/expensesApiSlice";
import { Expense as ExpenseType } from "../../types";
import { toast } from "react-toastify";
import TransactionCard from "../../components/TransactionCard";
import { EditExpenseModal } from "../../components/EditExpenseModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const Expense: React.FC = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseType | null>();

  const [addExpense] = useAddExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const { data, isFetching } = useGetAllExpensesQuery();

  const handleEditButtonClick = (expense: ExpenseType): void => {
    setEditingExpense(expense);
    setIsEditModalVisible(true);
  };

  const handleCloseEditModal = (): void => {
    setIsEditModalVisible(false);
  };

  const handleDeleteButtonClick = (expense: ExpenseType): void => {
    setEditingExpense(expense);
    setIsDeleteModalVisible(true);
  };

  const handleCancelDelete = (): void => {
    setIsDeleteModalVisible(false);
  };

  const handleAddExpense = async (expense: ExpenseType): Promise<void> => {
    try {
      await addExpense(expense).unwrap();
      toast.success("Expense added successfully");
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  const handleUpdateExpense = async (
    editingExpense: ExpenseType
  ): Promise<void> => {
    try {
      await updateExpense(editingExpense).unwrap();
      setIsEditModalVisible(false);
      toast.success("Expense updated successfully");
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  const handleDeleteExpense = async (): Promise<void> => {
    try {
      await deleteExpense(editingExpense).unwrap();
      setIsDeleteModalVisible(false);
      toast.success("Expense deleted successfully");
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  const renderExpenses = (): ReactNode => {
    if (isFetching) {
      return <h2>Loading</h2>;
    }

    if (data && data.length > 0) {
      return data
        .slice(0, 5)
        .map((expense) => (
          <TransactionCard
            key={expense._id}
            expense={expense}
            onEditButtonClick={handleEditButtonClick}
            onDeleteButtonClick={handleDeleteButtonClick}
          />
        ));
    }

    return <h2>No expenses added yet.</h2>;
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900  ">
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <i className="absolute top-0 right-0 p-6">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "380px", height: "60px" }}
            />
          </i>
          <div className="flex w-full justify-between">
            <div className=" ml-14 mt-32 flex  justify-center">
              <AddExpenseForm onAddExpense={handleAddExpense} />
            </div>
            <div className="mt-32 w-full ml-28 mr-12 flex justify-center border border-gray-200 rounded-lg pt-5 h-5/6">
              <div className="w-11/12 pb-5">
                <h2 className=" text-white text-xl pb-2">Recent Expenses</h2>
                {renderExpenses()}
              </div>
              {isEditModalVisible && editingExpense && (
                <EditExpenseModal
                  isVisible={isEditModalVisible}
                  onCloseModal={handleCloseEditModal}
                  editingExpense={editingExpense}
                  onSaveExpense={handleUpdateExpense}
                />
              )}
              {isDeleteModalVisible && editingExpense && (
                <DeleteConfirmationModal
                  isVisible={isDeleteModalVisible}
                  onConfirm={handleDeleteExpense}
                  onCancel={handleCancelDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
