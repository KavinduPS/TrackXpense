import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface PasswordForm {
  password: string;
  confirmpassword: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const initialValues: PasswordForm = { password: "", confirmpassword: "" };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: PasswordForm): Promise<void> => {
    try {
      const { password, confirmpassword } = values;

      if (password !== confirmpassword) {
        toast.error("Passwords do not match");
        return;
      }

      console.log("Submitting new password:", password);

      toast.success("Password updated successfully!");
    } catch (error: any) {
      console.error("Error updating password:", error);

      toast.error("Something went wrong. Please try again.");
    }
  };

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
                  name="password"
                  type="password"
                  placeholder="New password"
                  className="mt-2 w-72 h-10 px-2 border rounded-lg text-zinc-900 focus:outline-none"
                />

                <div className="flex justify-center items-center text-left rounded-lg">
                  {touched.password && errors.password && (
                    <div className="text-red-600 w-72 pl-2">
                      {errors.password}
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
