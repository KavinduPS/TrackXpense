import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../State/store";
import logo from "../../assets/trackxpense_logo.png";
import "../../index.css";
import Sidebar from "../../components/Sidebar";
import ChangePasswordModal, {
  ChangePasswordForm,
} from "../../components/ChangepasswordModal";
import {
  useChangePasswordMutation,
  useUpdateUserMutation,
} from "../../modules/auth/authApiSlice";
import { toast } from "react-toastify";
import ProfileForm, { ProfileFormData } from "../../components/ProfileForm";
import { updateUserDetails } from "../../modules/auth/authSlice";

const Settings: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [changePassword] = useChangePasswordMutation();
  const [updateUser] = useUpdateUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const userData = {
    _id: user?.id,
    name: user?.name,
    email: user?.email,
  };

  const handleUpdateUserDetails = async (
    data: ProfileFormData
  ): Promise<void> => {
    try {
      const res = await updateUser({
        ...data,
        _id: user?.id,
      });
      dispatch(updateUserDetails(data));
      toast.success("User details updated successfully");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handlePasswordChange = async (values: ChangePasswordForm) => {
    const { currentPassword, newPassword } = values;
    try {
      await changePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }).unwrap();
      toast.success("Password updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex min-h-screen  text-white bg-zinc-900">
      <div className="fixed">
        <Sidebar />
      </div>

      <div className="flex pl-80">
        <div className="absolute top-0 right-8 p-6 w-1/4">
          <img src={logo} alt="TrackXpense Logo" />
        </div>
        <div>
          <div className="ml-14 mt-28">
            <ProfileForm
              userData={userData}
              onConfirm={handleUpdateUserDetails}
            />
          </div>

          <div className="p-5 bg-Dark w-[470px] h-36 ml-14 mt-12 flex justify-center items-center rounded-lg">
            <button
              className="text-gray-200 text-lg  border border-gray-600 w-96 h-10 rounded-lg flex items-center justify-center hover:bg-gray-200 hover:text-zinc-900"
              onClick={openModal}
            >
              Change Password
            </button>
          </div>
          {isModalOpen && (
            <ChangePasswordModal
              onSubmit={handlePasswordChange}
              closeModal={closeModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
