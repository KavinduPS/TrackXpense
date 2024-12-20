import React from "react";
import { Expense } from "../types";

type ModalProps = {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirmationModal: React.FC<ModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
}) => {
  const handleConfirm = (): void => {
    onConfirm();
  };
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors flex-col border-2 border-black w-200 ${
        isVisible ? "visible bg-black/50" : "invisible"
      }`}
    >
      <div className="bg-gray-200 p-4 rounded shadow-lg">
        <h2 className="text-lg mb-4 text-[rgb(23,107,135)]">Confirm Delete</h2>
        <p className="text-black">
          {" "}
          Are you sure you want to delete this record?
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-2 py-1 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
