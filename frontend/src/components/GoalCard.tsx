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
    <div className="space-y-5">
      <div className="bg-zinc-900 rounded-lg flex flex-col w-full mb-4 ">
        <div className="rounded-lg  h-12 mb-1 flex justify-between items-center">
          <div className="flex flex-row mt-3">
            <p className="text-white ml-7  font-semibold">{name} : </p>
            {savedAmount < targetAmount ? (
              <div className="flex flex-row">
                <p className=" pl-2  text-red-500 ">
                  {goal.savedAmount.toLocaleString()}
                  <span className="text-gray-200">/</span>
                </p>
                <p className=" text-green-300">
                  {goal.targetAmount.toLocaleString()}{" "}
                </p>
              </div>
            ) : (
              <p className=" pl-1 text-green-300">Goal achieved</p>
            )}
          </div>
          <div className="mt-3">
            <button
              onClick={() => onAddSavings(goal)}
              className="text-white mr-2 bg-green-500 rounded-lg py-1 px-2"
            >
              Add savings
            </button>
            <button
              onClick={() => onDeleteClick(goal)}
              className="text-white bg-red-500 mr-7 rounded-lg py-1 px-2"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="rounded-lg h-16 flex flex-col items-center justify-center">
          <div className="w-11/12 rounded-full bg-white h-7 mt-2 mb-2">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-200 mx-7 mb-4 ">
          <div>{Math.round(progress)}% completed</div>
          <div>Due: {new Date(deadline).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
