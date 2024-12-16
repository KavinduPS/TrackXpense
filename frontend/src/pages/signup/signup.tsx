import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../modules/users/usersSlice";
import { useRegisterMutation } from "../../modules/users/usersApiSlice";
import * as Yup from "yup";
import "../../index.css";
import { AuthState, setCredentials } from "../../modules/auth/authSlice";
import { toast } from "react-toastify";

interface signForm {
  name: "";
  username: "";
  password: "";
  email: "";
}

interface RootState {
  auth: AuthState;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { user } = useSelector((state: RootState) => state.auth);

  const initialValues: signForm = {
    name: "",
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSignup = async (values: signForm): Promise<void> => {
    try {
      const { name, email, password } = values;
      const response = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      toast(error?.data?.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className=" h-screen flex justify-center  items-center bg-zinc-900 ">
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
          onSubmit={handleSignup}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <div>
                <Field
                  name="name"
                  placeholder="Name"
                  className="mt-20 w-3/6 h-10 rounded-lg px-2 focus:outline-none"
                />

                {touched.name && errors.name && (
                  <div className="text-red-600 text-center mr-36">
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <Field
                  name="username"
                  placeholder="Username"
                  className="mt-5 w-3/6 h-10 rounded-lg px-2 focus:outline-none"
                />

                {touched.username && errors.username && (
                  <div className="text-red-600 text-center mr-28">
                    {errors.username}
                  </div>
                )}
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="mt-5 w-3/6 h-10 rounded-lg px-2 focus:outline-none"
                />

                {touched.password && errors.password && (
                  <div className="text-red-600 text-center mr-32 ml-3">
                    {errors.password}
                  </div>
                )}
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="E mail"
                  className="mt-5 w-3/6 h-10 rounded-lg px-2 focus:outline-none"
                />

                {touched.email && errors.email && (
                  <div className="text-red-600 text-center mr-36 ">
                    {errors.email}
                  </div>
                )}
              </div>
              {isLoading && <h2>Loading...</h2>}
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-3/6 bg-green-200 h-10 rounded-lg text-zinc-700"
                >
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
