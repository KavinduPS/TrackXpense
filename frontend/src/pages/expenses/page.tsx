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
import { EditExpenseModal } from "../../components/EditExpenseModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import ExpenseCard from "../../components/ExpenseCard";

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
      return data.map((expense) => (
        <ExpenseCard
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
        <div className="flex fixed">
          <Sidebar />
        </div>

        <div className="flex-grow pl-80">
          <i className="absolute top-0 right-8 p-6">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "380px", height: "60px" }}
            />
          </i>
          <div className="flex w-full justify-between mt-28">
            <div className=" ml-14 flex  justify-center">
              <AddExpenseForm onAddExpense={handleAddExpense} />
            </div>
            <div className="border border-gray-200 mr-14 w-full ml-14 rounded-lg pt-5 text-gray-200 text-lg">
              Expenses chart
            </div>
          </div>
          <div className="flex w-full relative mb-12">
            <div className="mt-10 w-full pb-10 ml-14 mr-14 flex justify-center border border-gray-200 rounded-lg pt-5 h-1/2">
              <div className="w-11/12 pb-6">
                <h2 className=" text-gray-200 text-xl pb-8">
                  Expense transactions
                </h2>
                <div className="h-96 overflow-y-auto">{renderExpenses()}</div>
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
