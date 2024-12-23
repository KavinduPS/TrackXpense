import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useResetPasswordMutation,
  useVerifyResetTokenMutation,
} from "../../modules/auth/authApiSlice";
import Spinner from "../../components/Spin";

interface PasswordForm {
  newPassword: string;
  confirmpassword: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { token, user } = useParams();
  const initialValues: PasswordForm = { newPassword: "", confirmpassword: "" };
  const [tokenValidity, setTokenValidity] = useState<boolean | null>();

  const [verifyResetToken] = useVerifyResetTokenMutation();
  const [resetPassword] = useResetPasswordMutation();

  const validationSchema = Yup.object({
    newPassword: Yup.string().required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  useEffect(() => {
    const verifyRoute = async (): Promise<void> => {
      if (!token || !user) {
        toast.error("Invalid link");
        setTimeout(() => navigate("/"), 2000);
        return;
      }
      try {
        const response = await verifyResetToken({ token, user }).unwrap();
        if (response.isValidToken) {
          setTokenValidity(true);
        } else {
          toast.error("Expired reset link");
          navigate("/");
        }
      } catch (error) {
        toast.error("Invalid or expired reset link");
        navigate("/");
      }
    };
    verifyRoute();
  }, [token, user, navigate]);

  const handleSubmit = async (values: PasswordForm): Promise<void> => {
    try {
      const { newPassword, confirmpassword } = values;
      if (newPassword !== confirmpassword) {
        toast.error("Passwords do not match");
        return;
      }
      await resetPassword({
        token,
        user,
        newPassword,
      });
      toast.success("Password updated successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  if (tokenValidity == null) {
    return <Spinner />;
  }

  if (!tokenValidity) {
    return null;
  }

  return (
    <div className="flex min-h-screen text-white bg-zinc-900 justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form>
            <div className="w-96 h-auto bg-Dark rounded-lg p-8">
              <h2 className="text-lg text-gray-200 font-semibold ">
                Change Password
              </h2>
              <div>
                <h2 className="mt-8 pl-4 text-left">New password</h2>
                <Field
                  name="newPassword"
                  type="password"
                  placeholder="New password"
                  className="mt-2 w-72 h-10 px-2 border rounded-lg text-zinc-900 focus:outline-none"
                />

                <div className="flex justify-center items-center text-left rounded-lg">
                  {touched.newPassword && errors.newPassword && (
                    <div className="text-red-600 w-72 pl-2">
                      {errors.newPassword}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="mt-5 pl-4 text-left">Confirm new password</h2>
                <Field
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="mt-2 w-72 h-10 px-2 border rounded-lg text-zinc-900 focus:outline-none"
                />

                <div className="flex justify-center items-center text-left rounded-lg">
                  {touched.confirmpassword && errors.confirmpassword && (
                    <div className="text-red-600 w-72 pl-2">
                      {errors.confirmpassword}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-center items-center space-x-8 mt-14">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="w-32 bg-gray-200 h-10 rounded-lg text-zinc-900"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className=" w-32 bg-green-300 h-10 rounded-lg text-zinc-900"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
