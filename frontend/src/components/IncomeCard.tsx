import React from "react";
import { Income } from "../types";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

type IncomeCardProps = {
  income: Income;
  onEditButtonClick: (item: Income) => void;
  onDeleteButtonClick: (item: Income) => void;
};

const IncomeCard = ({
  income,
  onEditButtonClick,
  onDeleteButtonClick,
}: IncomeCardProps) => {
  const { name, amount, date, source } = income;
  return (
    <div className="py-2 ">
      <div className="flex items-center justify-between p-4 w-full bg-zinc-900 rounded text-gray-200">
        <div className="text-left text-gray-200 font-semibold w-1/5">
          <p className="text-sm text-gray-600">Date</p>
          {date.toString().split("T")[0]}
        </div>
        <div className="text-left text-gray-200 font-semibold w-1/5">
          <p className="text-sm text-gray-600">Name</p>
          {name}
        </div>
        <div className="text-left text-gray-200 font-semibold w-1/5">
          <p className="text-sm text-gray-600">Amount</p>
          {amount}
        </div>
        <div className="text-left text-gray-200 font-semibold w-1/5">
          <p className="text-sm text-gray-600">Source</p>
          {source}
        </div>
        <div>
          <div className="flex flex-row justify-around space-x-4 w-1/5">
            <button
              className="text-blue-700 text-3xl"
              onClick={() => onEditButtonClick(income)}
            >
              <AiFillEdit />
            </button>
            <button
              onClick={() => onDeleteButtonClick(income)}
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

export default IncomeCard;
