import { ReactNode, useState } from "react";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import AddGoalForm from "../../components/AddGoalForm";
import { Goal } from "../../types";
import { toast } from "react-toastify";
import GoalCard from "../../components/GoalCard";
import {
  useAddGoalMutation,
  useAddSavingMutation,
  useDeleteGoalMutation,
  useGetAllGoalsQuery,
} from "../../modules/goals/goalsApiSlice";
import Spinner from "../../components/Spin";
import AddSavingsModal from "../../components/AddSavingsModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

type Props = {};

const Goals = (props: Props) => {
  const [isAddSavingModalVisible, setIsAddSavingModalVisible] =
    useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>();

  const { isFetching, data } = useGetAllGoalsQuery();
  const [addGoal] = useAddGoalMutation();
  const [AddSaving] = useAddSavingMutation();
  const [deleteGoal] = useDeleteGoalMutation();

  const handleAddGoal = async (goal: Goal): Promise<void> => {
    try {
      await addGoal(goal).unwrap();
      toast.success("Goal added successfully");
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  const handleAddSavingsClick = (goal: Goal): void => {
    setEditingGoal(goal);
    setIsAddSavingModalVisible(true);
  };

  const handleSaveGoal = async (amount: number): Promise<void> => {
    try {
      await AddSaving({
        goalId: editingGoal?._id,
        amount: amount,
      }).unwrap();
      setIsAddSavingModalVisible(false);
      setEditingGoal(null);
      toast.success("Saving added succesfully");
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  const handleCloseModal = (): void => {
    setIsAddSavingModalVisible(false);
  };

  const handleDeleteGoal = async (): Promise<void> => {
    try {
      await deleteGoal(editingGoal).unwrap();
      setIsDeleteModalVisible(false);
      toast.success("Goal deleted successfully");
      setEditingGoal(null);
    } catch (error: any) {
      console.log(error);
      toast(error?.data?.message);
    }
  };

  const handleCancelDelete = (): void => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteClick = (goal: Goal) => {
    setIsDeleteModalVisible(true);
    setEditingGoal(goal);
  };

  const renderGoals = (): ReactNode => {
    if (isFetching) {
      return (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg text-blue-700">
          <Spinner />
        </div>
      );
    }

    if (data) {
      return data.map((goal) => (
        <GoalCard
          key={goal._id}
          goal={goal}
          onAddSavings={handleAddSavingsClick}
          onDeleteClick={handleDeleteClick}
        />
      ));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900  ">
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <i className="absolute top-0 right-8 p-6">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "380px", height: "60px" }}
            />
          </i>
          <div className="flex w-full justify-between">
            <div className=" ml-14 mt-32 flex  justify-center">
              <AddGoalForm onAddGoal={handleAddGoal} />
            </div>
            <div className="mt-32 w-full ml-28 mr-12 flex flex-col border border-gray-200 rounded-lg pt-5 relative h-[600px]">
              <div className="text-center ">
                <h2 className="text-white text-xl">Your Goals</h2>
              </div>
              <div className="w-11/12 mx-auto pb-5 h-[550px] overflow-y-auto">
                {renderGoals()}
              </div>
              {isAddSavingModalVisible && editingGoal && (
                <AddSavingsModal
                  isVisible={isAddSavingModalVisible}
                  goal={editingGoal}
                  onSaveGoal={handleSaveGoal}
                  onCloseModal={handleCloseModal}
                />
              )}
              {isDeleteModalVisible && (
                <DeleteConfirmationModal
                  isVisible={isDeleteModalVisible}
                  onConfirm={handleDeleteGoal}
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

export default Goals;
