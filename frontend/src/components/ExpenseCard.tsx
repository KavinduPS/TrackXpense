import { Expense } from "../types";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

type ExpenseCardProps = {
  expense: Expense;
  onEditButtonClick: (item: Expense) => void;
  onDeleteButtonClick: (item: Expense) => void;
};

const ExpenseCard = ({
  expense,
  onEditButtonClick,
  onDeleteButtonClick,
}: ExpenseCardProps) => {
  const { name, amount, date, category } = expense;
  return (
    <div className="py-2">
      <div className="flex items-center justify-between p-4 w-full bg-zinc-900 rounded text-gray-200">
        <div className="text-left text-gray-200 font-semibold w-1/5">
          {date.toString().split("T")[0]}
        </div>
        <div className="text-left text-gray-200 font-semibold w-1/5">
          {name}
        </div>
        <div className="text-left text-gray-200 font-semibold w-1/5">
          {amount}
        </div>
        <div className="text-left text-gray-200 font-semibold w-1/5">
          {category}
        </div>
        <div>
          <div className="flex flex-row justify-around space-x-4 w-1/5">
            <button
              className="text-blue-700 text-3xl"
              onClick={() => onEditButtonClick(expense)}
            >
              <AiFillEdit />
            </button>
            <button
              onClick={() => onDeleteButtonClick(expense)}
              className="text-red-500 text-3xl"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
