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
        <div className="absolute inset-0 flex justify-center items-center bg-Dark bg-opacity-50 rounded-lg text-blue-700">
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
        <div className="flex fixed">
          <Sidebar />
        </div>
        <div className="flex-grow pl-80">
          <i className="absolute top-0 right-8 p-6 w-1/4">
            <img src={logo} alt="Logo" />
          </i>
          <div className="flex w-full justify-between mt-28">
            <div className="flex justify-center flex-shrink-0 p-8 ml-14 bg-Dark rounded-lg h-auto">
              <AddGoalForm onAddGoal={handleAddGoal} />
            </div>

            <div className="w-full ml-7 mr-12 flex flex-col bg-Dark rounded-lg pt-5 relative max-h-1/2 pb-3">
              <h2 className="text-gray-200 text-xl pb-5">Your Goals</h2>

              <div className="w-11/12 mx-auto h-[500px] overflow-y-auto">
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
