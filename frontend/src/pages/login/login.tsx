import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/trackxpense_logo.png";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../modules/users/usersApiSlice";
import { AuthState, setCredentials } from "../../modules/auth/authSlice";
import { toast } from "react-toastify";
import "../../index.css";

interface loginForm {
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

  const initialValues: loginForm = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (values: loginForm): Promise<void> => {
    try {
      const { email, password } = values;
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
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

                {touched.email && errors.email && (
                  <div className="text-red-600 mr-2 -ml-28">{errors.email}</div>
                )}
              </div>
              {touched.email && errors.email && (
                <div className="text-red-600 pr-20 mr-2">{errors.email}</div>
              )}
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="mt-5 w-72 h-10 rounded-lg px-2 focus:outline-none"
                />

                {touched.password && errors.password && (
                  <div className="text-red-600  mr-3 -ml-28">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="my-5">
                <a href="#" className="text-neutral-100 ">
                  Forgot password ?
                </a>
              </div>
              <div className="my-5">
                {isLoading && <h2>Loading...</h2>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-72 bg-orange-200 h-10 rounded-lg text-zinc-700"
                >
                  Login
                </button>
              </div>

              <p className="my-5 text-neutral-100">Don't have an account ?</p>

              <div className="my-5">
                <Link to="/signup">
                  <button
                    type="button"
                    className="w-72 bg-green-200 h-10 rounded-lg text-zinc-700"
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
