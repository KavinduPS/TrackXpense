import React, { useEffect } from "react";
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

interface LoginForm {
  email: string;
  password: string;
}

interface RequestPasswordResetForm {
  email: string;
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
    password: Yup.string().required("Password is required"),
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
      console.log(response);
      dispatch(setUser({ ...response }));
      navigate("/dashboard");
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  const handlePasswordResetRequest = async (
    data: RequestPasswordResetForm
  ): Promise<void> => {
    try {
      await forgotPassword(data).unwrap();
    } catch (error: any) {
      toast(error?.data?.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-zinc-900 ">
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
                  className="mt-20 w-72 h-10 rounded-lg px-2 focus:outline-none"
                />
                <div className="flex justify-center items-center text-left rounded-lg">
                  {touched.email && errors.email && (
                    <div className="text-red-600 w-72 pl-2">{errors.email}</div>
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
                <a href="#" className="text-neutral-100 ">
                  Forgot password ?
                </a>
              </div>
              <div className="my-5">
                <div className="text-blue-700">{isLoading && <Spinner />}</div>

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
                    className="w-72 bg-green-200 h-10 rounded-lg text-zinc-900"
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
