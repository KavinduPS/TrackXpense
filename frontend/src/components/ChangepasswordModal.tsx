import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

interface ChangePasswordModalProps {
  onSubmit: (passwordData: ChangePasswordForm) => Promise<void>;
  closeModal: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  onSubmit,
  closeModal,
}) => {
  const dispatch = useDispatch();

  const initialValues: ChangePasswordForm = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(4, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const handleSubmit = async (values: ChangePasswordForm) => {
    onSubmit(values);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-Dark p-8 rounded-lg w-96">
        <h2 className="text-xl mb-4">Change Password</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <h2 className="mb-2 text-left">Current password</h2>
                <Field
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  className="w-full text-zinc-900 p-2 mb-2 border rounded-md focus:outline-none"
                />
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <h2 className="mb-2 text-left">New password</h2>
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className="w-full text-zinc-900 p-2 mb-2 border rounded-md focus:outline-none"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <h2 className="mb-2 text-left">Confirm new password</h2>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="w-full text-zinc-900 p-2 mb-2 border rounded-md focus:outline-none"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-4 text-zinc-900 px-4 py-2 rounded-md w-20 bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-300 text-zinc-900 p-2 rounded-md w-20"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
