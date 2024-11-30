import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/trackxpense_logo.png";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "../../index.css";
import { loginUser } from "../../services/API/apiServices";

interface loginForm {
  email: string;
  password: string;
}
const Login: React.FC = () => {
  const navigate = useNavigate();
  const initialValues: loginForm = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values: loginForm) => {
    try {
      const { email, password } = values;
      const response = await loginUser(email, password);
      if (response) {
        navigate("/dashboard");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center "
      style={{ backgroundColor: "#352F44" }}
    >
      <div className="w-1/3">
        <div className="flex justify-center">
          <img src={logo} alt="TrackXpense Logo" />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <div>
                <Field
                  name="email"
                  placeholder="Email"
                  className="mt-20 w-3/6 h-9 rounded-lg px-2"
                />
              </div>
              {touched.email && errors.email && (
                <div className="text-red-600 pr-20 mr-2">{errors.email}</div>
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
