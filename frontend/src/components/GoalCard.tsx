import { Goal } from "../types";

type GoalCardProps = {
  goal: Goal;
  onAddSavings: (goal: Goal) => void;
  onDeleteClick: (goal: Goal) => void;
};

const GoalCard = ({ goal, onAddSavings, onDeleteClick }: GoalCardProps) => {
  const { name, targetAmount, savedAmount, deadline } = goal;
  const progress = (savedAmount / targetAmount) * 100;
  return (
    <div className="bg-zinc-800 rounded-lg flex flex-col w-full p-1 mt-5 ">
      <div className="rounded-lg  h-12 mb-1 flex justify-between items-center">
        <div className="flex flex-row">
          <p className="text-white ml-6">{name} - </p>
          {savedAmount < targetAmount ? (
            <p className="text-white">
              {goal.savedAmount.toLocaleString()}
              {goal.targetAmount.toLocaleString()}
            </p>
          ) : (
            <p className="text-white">Goal achieved</p>
          )}
        </div>
        <div>
          <button
            onClick={() => onAddSavings(goal)}
            className="text-white mr-2 bg-green-500 rounded-lg py-1 px-2"
          >
            Add savings
          </button>
          <button
            onClick={() => onDeleteClick(goal)}
            className="text-white bg-red-500 mr-6 rounded-lg py-1 px-2"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="rounded-lg h-24 flex flex-col items-center justify-center">
        <div className="flex flex-row"></div>
        <div className="w-11/12 rounded-full bg-white h-1/4 mt-2 mb-2">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-200">
          <span>{Math.round(progress)}% completed</span>
          <p> - </p>
          <span>Due: {new Date(deadline).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
