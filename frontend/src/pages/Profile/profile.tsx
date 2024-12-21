import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../State/store";
import { setUser } from "../../modules/users/usersSlice";
import { AiFillEdit } from "react-icons/ai";
import logo from "../../assets/trackxpense_logo.png";
import "../../index.css";
import Sidebar from "../../components/Sidebar";
import ChangePasswordModal, {
  ChangePasswordForm,
} from "../../components/ChangepasswordModal";
import { useChangePasswordMutation } from "../../modules/users/usersApiSlice";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [changePassword] = useChangePasswordMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setTempName(user.name);
    setTempEmail(user.email);
  }, [user]);

  const handleSave = () => {
    setName(tempName);
    setEmail(tempEmail);
    dispatch(setUser({ name: tempName, email: tempEmail }));
    setIsEditNamemodalOpen(false);
    setIsEditEmailmodalOpen(false);
  };

  const [isEditNamemodalOpen, setIsEditNamemodalOpen] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [isEditEmailmodalOpen, setIsEditEmailmodalOpen] = useState(false);
  const [tempEmail, setTempEmail] = useState(user.email);

  const openEditNamemodal = () => {
    setTempName(user.name);
    setIsEditNamemodalOpen(true);
  };

  const closeEditNamemodal = () => {
    setIsEditNamemodalOpen(false);
  };

  const openEditEmailmodal = () => {
    setTempEmail(user.email);
    setIsEditEmailmodalOpen(true);
  };

  const closeEditEmailmodal = () => {
    setIsEditEmailmodalOpen(false);
  };

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

        <div className="mt-40">
          <div className="ml-20">
            <p className="font-semibold text-Linen text-left">Name</p>
          </div>

          <div className="flex justify-between items-center ml-20 mt-3 w-72 h-10 rounded-lg border border-gray-400 hover:border-gray-600 focus:outline-none">
            <p className=" text-Linen ml-4 text-lg">{name}</p>
            <button
              className="text-Lightgray mr-4 text-xl"
              onClick={openEditNamemodal}
            >
              <AiFillEdit />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="ml-20">
            <p className="font-semibold text-Linen text-left">Email</p>
          </div>

          <div className="flex justify-between items-center ml-20 mt-3 w-72 h-10 rounded-lg border border-gray-400 hover:border-gray-600 focus:outline-none">
            <p className="text-lg text-Linen ml-4">{email}</p>
            <button
              className="text-Lightgray mr-4 text-xl"
              onClick={openEditEmailmodal}
            >
              <AiFillEdit />
            </button>
          </div>
        </div>

        <div className="ml-20">
          <button
            className="text-gray-200 text-lg mt-16 border border-gray-200 w-72 h-10 rounded-lg flex items-center justify-center"
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

      {isEditNamemodalOpen && (
        <div className="fixed inset-0 bg-zinc-900  bg-opacity-90 flex justify-center items-center">
          <div className=" p-6 rounded-lg w-96 bg-zinc-700">
            <h3 className="text-lg font-semibold mb-4">Edit Name</h3>

            <div className="mb-4">
              <input
                type="text"
                value={tempName}
                placeholder="Name"
                onChange={(e) => setTempName(e.target.value)}
                className="mt-1 w-full px-3 py-2 text-lg bg-gray-200 rounded-md text-zinc-900 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeEditNamemodal}
                className="text-zinc-900 px-4 py-2 rounded-md w-20 bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-300 text-zinc-900 px-4 py-2 rounded-md w-20"
                disabled={!tempName}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditEmailmodalOpen && (
        <div className="fixed inset-0 bg-zinc-900  bg-opacity-90 flex justify-center items-center">
          <div className=" p-6 rounded-lg w-96 bg-zinc-700">
            <h3 className="text-lg font-semibold mb-4">Edit Email</h3>

            <div className="mb-4">
              <input
                type="email"
                value={tempEmail}
                placeholder="Email"
                onChange={(e) => setTempEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 text-lg bg-gray-200 rounded-md text-zinc-900 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeEditEmailmodal}
                className="text-zinc-900 px-4 py-2 rounded-md w-20 bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-300 text-zinc-900 px-4 py-2 rounded-md w-20"
                disabled={!tempEmail}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
