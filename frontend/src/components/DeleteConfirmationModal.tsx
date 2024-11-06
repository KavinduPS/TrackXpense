import React from 'react';

type ModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  };
  

  const DeleteConfirmationModal: React.FC<ModalProps> = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-200 p-4 rounded shadow-lg">
          <h2 className="text-lg mb-4 text-[rgb(23,107,135)]">Confirm Delete</h2>
          <p className="text-black"> Are you sure you want to delete this record?</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={onCancel}
              className="bg-gray-300 text-black px-2 py-1 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
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
  
