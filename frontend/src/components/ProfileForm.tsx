import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../State/store";
import { setUser } from "../modules/users/usersSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export interface ProfileForm {
  name: string;
  email: string;
}
type ProfileFormProps = {
  userData: ProfileForm;
  onConfirm: () => void;
};

const Profile = ({ userData, onConfirm }: ProfileFormProps) => {
  const { name, email } = userData;
  const initialValues: ProfileForm = { name: name, email: email };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });

  return (
    <div className="p-8 bg-Dark w-[470px] h-96 rounded-lg flex justify-center items-center flex-col">
      <h2 className="text-gray-200 text-xl font-semibold mb-4">Profile</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={onConfirm}
      >
        {({ touched, errors }) => (
          <Form className="w-96">
            <div className="mb-4">
              <h2 className="text-left pb-1">Name</h2>
              <Field
                className="w-full h-10 pl-3 border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
                type="text"
                name="name"
                placeholder="Name"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-left pb-1">Email</h2>
              <Field
                className="w-full h-10 pl-3 border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
                type="email"
                name="email"
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <div className="text-red-600">{errors.email}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-10 mt-5 bg-green-300 rounded-lg text-zinc-900"
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
