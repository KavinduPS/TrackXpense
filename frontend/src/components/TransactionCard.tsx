import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Expense } from "../types";

type TransactionCardProps = {
  expense: Expense;
  onEditButtonClick: (item: Expense) => void;
  onDeleteButtonClick: (item: Expense) => void;
};

const TransactionCard = ({
  expense,
  onEditButtonClick,
  onDeleteButtonClick,
}: TransactionCardProps) => {
  const { name, amount } = expense;
  return (
    <div className="py-2">
      {" "}
      <div
        // key={exp.id}
        className="flex items-center justify-between p-4 w-full bg-Dark rounded text-gray-200"
      >
        <div className="text-left text-Darkgrayishviolet font-semibold">
          {name + " " + amount}
        </div>
        <div className="mt-6 text-left text-Darkgrayishviolet font-semibold">
          {/* <p>{exp.date}</p> */}
        </div>
        <div className="flex space-x-3">
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
  );
};

export default TransactionCard;
