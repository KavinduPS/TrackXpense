import React, { ReactElement, ReactNode, useState } from "react";
import AddIncomeForm from "../../components/IncomeForm";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import { Income as IncomeType } from "../../types";
import { toast } from "react-toastify";
import { EditIncomeModal } from "../../components/EditIncomeModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import {
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useGetAllIncomesQuery,
  useUpdateIncomeMutation,
} from "../../modules/incomes/incomesApiSlice";
import IncomeCard from "../../components/IncomeCard";

const Income: React.FC = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [editingIncome, setEditingIncome] = useState<IncomeType | null>();

  const [addIncome] = useAddIncomeMutation();
  const [updateIncome] = useUpdateIncomeMutation();
  const [deleteIncome] = useDeleteIncomeMutation();
  const { data, isFetching, refetch } = useGetAllIncomesQuery();

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

  const handleAddIncome = async (income: IncomeType): Promise<void> => {
    try {
      await addIncome(income).unwrap();
      toast.success("Income added successfully");
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  const handleUpdateIncome = async (
    editingIncome: IncomeType
  ): Promise<void> => {
    try {
      await updateIncome(editingIncome).unwrap();
      setIsEditModalVisible(false);
      toast.success("Income updated successfully");
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  const handleDeleteIncome = async (): Promise<void> => {
    try {
      await deleteIncome(editingIncome).unwrap();
      setIsDeleteModalVisible(false);
      toast.success("Income deleted successfully");
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  const renderIncomes = (): ReactNode => {
    if (isFetching) {
      return <h2>Loading</h2>;
    }

    if (data && data.length > 0) {
      return data.map((income) => (
        <IncomeCard
          key={income._id}
          income={income}
          onEditButtonClick={handleEditButtonClick}
          onDeleteButtonClick={handleDeleteButtonClick}
        />
      ));
    }
    return <h2>No income added yet.</h2>;
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 ">
      <div className="flex">
        <div className="flex fixed">
          <Sidebar />
        </div>

        <div className=" flex-grow pl-80">
          <div className="absolute top-0 right-8 p-6">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "380px", height: "60px" }}
            />
          </div>

          <div className="flex w-full justify-between mt-28">
            <div className=" ml-14  flex  justify-center">
              <AddIncomeForm onAddIncome={handleAddIncome} />
            </div>
            <div className="border border-gray-200 mr-14  w-full ml-14 rounded-lg pt-5 text-gray-200 text-lg">
              <h2>Incomes chart</h2>
            </div>
          </div>
          <div className="flex w-full relative mb-12">
            <div className="mt-10 w-full pb-10 ml-14 mr-12 flex justify-center border border-gray-200 rounded-lg pt-5 h-1/2  ">
              <div className="w-11/12 pb-6">
                <h2 className=" text-gray-200 text-xl pb-8">
                  Income transactions
                </h2>
                <div className="h-96 overflow-y-auto">{renderIncomes()}</div>
              </div>
            </div>
          </div>
          {isEditModalVisible && editingIncome && (
            <EditIncomeModal
              isVisible={isEditModalVisible}
              onCloseModal={handleCloseEditModal}
              editingIncome={editingIncome}
              onSaveIncome={() => {}}
            />
          )}
          {isDeleteModalVisible && editingIncome && (
            <DeleteConfirmationModal
              isVisible={isDeleteModalVisible}
              onConfirm={handleDeleteIncome}
              onCancel={handleCancelDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Income;
