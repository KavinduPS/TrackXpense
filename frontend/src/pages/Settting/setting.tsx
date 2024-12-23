import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../State/store";
import logo from "../../assets/trackxpense_logo.png";
import "../../index.css";
import Sidebar from "../../components/Sidebar";
import ChangePasswordModal, {
  ChangePasswordForm,
} from "../../components/ChangepasswordModal";
import { useChangePasswordMutation } from "../../modules/auth/authApiSlice";
import { toast } from "react-toastify";
import ProfileForm from "../../components/ProfileForm";

const Settings: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const name = user?.name || "Default Name";
  const email = user?.email || "Default Email";

  const userData = { name, email };
  const [changePassword] = useChangePasswordMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePasswordChange = async (values: ChangePasswordForm) => {
    const { currentPassword, newPassword } = values;
    try {
      console.log(values);
      const res = await changePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }).unwrap();
      console.log(res);
      toast.success("Password updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex min-h-screen  text-white bg-zinc-900">
      <Sidebar />

      <div className="flex-1 relative">
        <div className="absolute top-0 right-8 p-6 ">
          <img
            src={logo}
            alt="TrackXpense Logo"
            style={{ width: "380px", height: "60px" }}
          />
        </div>

        <div className="ml-14 mt-28">
          <ProfileForm
            userData={userData}
            onConfirm={() => {
              console.log("");
            }}
          />
        </div>

        <div className="p-5 bg-Dark w-[470px] h-36 ml-14 mt-12 flex justify-center items-center rounded-lg">
          <button
            className="text-gray-200 text-lg  border border-gray-600 w-96 h-10 rounded-lg flex items-center justify-center hover:bg-gray-200 hover:text-zinc-900"
            onClick={openModal}
          >
            Change Password
          </button>

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
