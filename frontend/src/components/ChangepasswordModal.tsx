import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPassword } from "../modules/users/usersSlice";
import { RootState } from "../State/store";

interface ChangePasswordModalProps {
  closeModal: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  closeModal,
}) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (newPassword === confirmPassword) {
      dispatch(setPassword(newPassword));
      closeModal();
      setError("Both fields are required.");
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-50">
      <div className="bg-zinc-700 p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Change Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full text-zinc-900 p-2 mb-4 border rounded-md focus:outline-none "
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full text-zinc-900 p-2 mb-4 border rounded-md focus:outline-none"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="mr-4 text-zinc-900 px-4 py-2 rounded-md w-20 bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-300 text-zinc-900 p-2 rounded-md w-20"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
