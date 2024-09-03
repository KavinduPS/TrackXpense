import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "../../index.css";

interface signForm {
  username: "";
  password: "";
  email: "";
}

const Signup: React.FC = () => {
  const initialValues: signForm = { username: "", password: "", email: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  return (
    <div className=" h-screen bg-zinc-700 flex justify-center  items-center ">
      <div
        className="absolute inset-0 bg-signup-bg bg-cover bg-center opacity-10 bg-no-repeat "
        style={{
          backgroundSize: " 95%",
          backgroundPosition: " -425% 30%",
        }}
      ></div>

      <div className=" relative w-1/3">
        <div className="flex justify-center text-4xl text-orange-200 ">
          <p>SIGN UP</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <div>
                <Field
                  name="username"
                  placeholder="Username"
                  className="mt-20 w-3/6 h-9 rounded-lg px-2"
                />
              </div>
              {touched.username && errors.username && (
                <div className="text-red-600 pr-20 mr-2">{errors.username}</div>
              )}
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="mt-5 w-3/6 h-9 rounded-lg px-2"
                />
              </div>
              {touched.password && errors.password && (
                <div className="text-red-600 pr-20 mr-2 ">
                  {errors.password}
                </div>
              )}

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="E mail"
                  className="mt-5 w-3/6 h-9 rounded-lg px-2"
                />
              </div>
              {touched.email && errors.email && (
                <div className="text-red-600 pr-24 mr-5 ">{errors.email}</div>
              )}

              <div className="mt-10">
                <Link to="/signup">
                  <button
                    type="button"
                    className="w-3/6 bg-green-200 h-9 rounded-lg text-zinc-700"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
