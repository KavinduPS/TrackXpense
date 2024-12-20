import React from "react";
import logo from "../../assets/trackxpense_logo.png";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "../../index.css";

interface loginForm {
  username: string;
  password: string;
}
const Login: React.FC = () => {
  const initialValues: loginForm = { username: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="h-screen bg-zinc-700 flex justify-center items-center ">
      <div className="w-1/3">
        <div className="flex justify-center">
          <img src={logo} alt="TrackXpense Logo" />
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

              <div className="my-5">
                <a href="#" className="text-neutral-100 ">
                  Forgot password ?
                </a>
              </div>
              <div className="my-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-3/6 bg-orange-200 h-9 rounded-lg text-zinc-700"
                >
                  Login
                </button>
              </div>

              <p className="my-5 text-neutral-100">Don't have an account ?</p>

              <div className="my-5">
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
export default Login;
