import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordForm {
  email: string;
}

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}
export const ForgotModal = ({
  onClose,
  onSubmit,
}: ForgotPasswordModalProps) => {
  const navigate = useNavigate();
  const initialValues: ForgotPasswordForm = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
  });

  const handleSubmit = (values: ForgotPasswordForm) => {
    onSubmit(values.email);
    navigate("/forgotpassword");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form>
          <div className="p-8 h-auto w-auto bg-Dark ">
            <h2 className="pb-3 text-gray-200 font-semibold">
              Enter your Email
            </h2>
            <div>
              <Field
                name="email"
                placeholder="Email"
                className=" w-72 h-10 rounded-lg px-2 focus:outline-none"
              />
              <div className="flex justify-center items-center text-left rounded-lg">
                {touched.email && errors.email && (
                  <div className="text-red-600 w-72 pl-2">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="flex flex-row mt-8 space-x-8">
              <button
                type="button"
                onClick={onClose}
                className="w-32 bg-gray-200 h-10 rounded-lg text-zinc-900"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-32 bg-green-300 h-10 rounded-lg text-zinc-900"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotModal;
