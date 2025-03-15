import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/trackxpense_logo.png";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "../../modules/auth/authApiSlice";
import { AuthState, setUser } from "../../modules/auth/authSlice";
import { toast } from "react-toastify";
import "../../index.css";
import Spinner from "../../components/Spin";
import ForgotModal from "../../components/ForgotPasswordModal";

interface LoginForm {
  email: string;
  password: string;
}

interface RootState {
  auth: AuthState;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [forgotPassword] = useForgotPasswordMutation();

  const initialValues: LoginForm = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (values: LoginForm): Promise<void> => {
    try {
      const { email, password } = values;
      const response = await login({ email, password }).unwrap();
      dispatch(setUser({ ...response }));
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handlePasswordResetRequest = async (email: string): Promise<void> => {
    try {
      await forgotPassword({ email }).unwrap();
      navigate("/");
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen flex justify-center items-center bg-zinc-900 ">
      <div className="flex justify-between">
        <div className=" font-semibold w-3/6 h-screen flex justify-center items-center bg-cover bg-login-image bg-no-repeat">
          <div className="w-4/5 bg-zinc-900 flex items-center justify-center flex-col px-8 py-12 rounded-2xl bg-opacity-55 ">
            <img className="w-2/3 h-auto" src={logo} alt="TrackXpense Logo" />

            <h2 className="mt-3 text-xl text-white">
              Your Financial Companion
            </h2>
            <div className="flex items-center justify-center mt-10 text-white">
              <h2 className="text-centers text-2xl ">
                Track, Visualize, and Achieve Your Financial Goals Effortlessly.
              </h2>
            </div>

            <div className=" flex justify-center items-center mt-10 flex-col space-y-3 text-lg text-white">
              <h3>✔ Manage your income and expenses seamlessly.</h3>
              <h3>✔ Set and achieve financial goals.</h3>
              <h3>✔ Gain insights with interactive charts.</h3>
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="w-1/3 mr-32 flex justify-center items-center flex-col relative">
          <p className="text-4xl text-orange-200 mb-10">LOGIN </p>
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
                    className=" w-72 h-10 rounded-lg px-2 focus:outline-none"
                  />
                  <div className="flex justify-center items-center text-left rounded-lg">
                    {touched.email && errors.email && (
                      <div className="text-red-600 w-72 pl-2">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="mt-5 w-72 h-10 rounded-lg px-2 focus:outline-none"
                  />
                  <div className="flex justify-center items-center text-left rounded-lg">
                    {touched.password && errors.password && (
                      <div className="text-red-600  w-72 pl-2">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="my-5">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenModal();
                    }}
                    className="text-orange-200 cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="my-5 ">
                  {isLoading && (
                    <div className=" text-blue-700 ">
                      <Spinner />
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-72 bg-orange-200 h-10 rounded-lg text-zinc-900"
                  >
                    Login
                  </button>
                </div>

                <p className="my-5 text-neutral-100">Don't have an account ?</p>

                <div className="my-5">
                  <Link to="/signup">
                    <button
                      type="button"
                      className="w-72 bg-green-300 h-10 rounded-lg text-zinc-900"
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-zinc-900 bg-opacity-100 flex justify-center items-center">
          <ForgotModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handlePasswordResetRequest}
          />
        </div>
      )}
    </div>
  );
};
export default Login;
