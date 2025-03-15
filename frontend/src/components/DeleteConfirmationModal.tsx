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
      className={`fixed inset-0 flex justify-center items-center bg-zinc-900 bg-opacity-90 flex-col border-2 border-black w-200 ${
        isVisible ? "visible " : "invisible"
      }`}
    >
      <div className="bg-zinc-700 p-7 rounded-lg shadow-lg">
        <h2 className="text-lg mb-4 text-gray-200">Confirm Delete</h2>
        <p className="text-gray-200">
          Are you sure you want to delete this record?
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-zinc-900 px-2 py-1 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-500 text-gray-200 px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
