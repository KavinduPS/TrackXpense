import React, { ReactElement, ReactNode, useState } from "react";
import AddIncomeForm from "../../components/IncomeForm";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
// import {
//   useAddExpenseMutation,
//   useDeleteExpenseMutation,
//   useGetAllExpensesQuery,
//   useUpdateExpenseMutation,
// } from "../../modules/expenses/expensesApiSlice";
import { Income as IncomeType } from "../../types";
import { toast } from "react-toastify";
import TransactionCard from "../../components/TransactionCard";
import { EditIncomeModal } from "../../components/EditIncomeModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const Income: React.FC = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [editingIncome, setEditingIncome] = useState<IncomeType | null>();

  // const [addIncome] = useAddIncomeMutation();
  // const [updateIncome] = useUpdateIncomeMutation();
  // const [deleteIncome] = useDeleteIncomeMutation();
  // const { data, isFetching, refetch } = useGetAllIncomesQuery();

  const handleEditButtonClick = (income: IncomeType): void => {
    setEditingIncome(income);
    setIsEditModalVisible(true);
  };

  const handleCloseEditModal = (): void => {
    setIsEditModalVisible(false);
  };

  const handleDeleteButtonClick = (income: IncomeType): void => {
    setEditingIncome(income);
    setIsDeleteModalVisible(true);
  };

  const handleCancelDelete = (): void => {
    setIsDeleteModalVisible(false);
  };

  // Backend-related operations
  /*
  const handleAddIncome = async (income: IncomeType): Promise<void> => {
    try {
      await addIncome(income).unwrap();
      // refetch();
      toast.success("Income added successfully");
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  const handleUpdateIncome = async (
    editingIncome: IncomeType
  ): Promise<void> => {
    try {
      console.log("save pressed", editingIncome);
      await updateIncome(editingIncome).unwrap();
      setIsEditModalVisible(false);
      toast.success("Income updated successfully");
    } catch (error: any) {
      console.log(error);
      toast(error?.data?.message);
    }
  };

  const handleDeleteIncome = async (
    editingIncome: IncomeType
  ): Promise<void> => {
    try {
      console.log("save pressed", editingIncome);
      await deleteIncome(editingIncome).unwrap();
      setIsDeleteModalVisible(false);
      toast.success("Income deleted successfully");
    } catch (error: any) {
      console.log(error);
      toast(error?.data?.message);
    }
  };
  */

  const renderIncomes = (): ReactNode => {
    // Mock frontend implementation for rendering incomes
    /*
    if (isFetching) {
      return <h2>Loading</h2>;
    }

    if (data && data.length > 0) {
      return data
        .slice(0, 5)
        .map((income) => (
          <TransactionCard
            key={income._id}
            income={income}
            onEditButtonClick={handleEditButtonClick}
            onDeleteButtonClick={handleDeleteButtonClick}
          />
        ));
    }
    */

    return <h2>No income added yet.</h2>;
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
              {/* Mock handler passed to AddIncomeForm */}
              <AddIncomeForm onAddIncome={async (income) => Promise.resolve()} />
            </div>
            <div className="mt-32 w-full ml-28 mr-12 flex justify-center border border-gray-200 rounded-lg pt-5 h-5/6">
              <div className="w-11/12 pb-5">
                <h2 className=" text-white text-xl pb-2">Recent Incomes</h2>
                {renderIncomes()}
              </div>
              {isEditModalVisible && editingIncome && (
                <EditIncomeModal
                  isVisible={isEditModalVisible}
                  onCloseModal={handleCloseEditModal}
                  editingIncome={editingIncome}
                  onSaveIncome={() => {}} // Mock handler
                />
              )}
              {/* {isDeleteModalVisible && editingIncome && (
                // <DeleteConfirmationModal
                //   isVisible={isDeleteModalVisible}
                //   // deletingIncome={editingIncome}
                //   onCancel={handleCancelDelete}
                //   onConfirm={() => {}} // Mock handler
                // />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
