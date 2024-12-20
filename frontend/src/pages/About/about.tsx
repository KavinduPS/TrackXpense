import React from "react";
import "../../index.css";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

interface ContactForm {
  name: "";
  email: "";
  message: "";
}

const About: React.FC = () => {
  const initialValues: ContactForm = { name: "", email: "", message: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string().required("Write feedback"),
  });

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      <Sidebar />
      <div className="relative flex-1">
        <div className="absolute top-0 right-0 p-6 ">
          <img
            src={logo}
            alt="TrackXpense Logo"
            style={{ width: "380px", height: "60px" }}
          />
        </div>
        <div className="text-left ml-20 mt-40 text-xl ">
          <h1>Contact Us</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }}
          >
            {({ touched, errors }) => (
              <Form>
                <div>
                  <Field
                    name="name"
                    placeholder="Name"
                    className="mt-10 w-60 h-9 rounded-lg  px-2 text-base mr-20 border border-gray-400 hover:border-gray-600 focus:outline-none bg-zinc-900"
                  />
                </div>
                {touched.name && errors.name && (
                  <div className="text-red-600 pr-20 mr-5 text-base">
                    {errors.name}
                  </div>
                )}

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="mt-5 w-60 h-9 rounded-lg px-2 text-base mr-20 border border-gray-400 hover:border-gray-600 focus:outline-none bg-zinc-900"
                  />
                </div>
                {touched.email && errors.email && (
                  <div className="text-red-600 pr-24 mr-2 text-base">
                    {errors.email}
                  </div>
                )}

                <div>
                  <Field
                    as="textarea"
                    name="message"
                    placeholder="Message"
                    className="mt-5 w-60 rounded-lg px-2 text-base mr-20 h-40 border border-gray-400 hover:border-gray-600 focus:outline-none bg-zinc-900"
                  />
                </div>
                {touched.message && errors.message && (
                  <div className="text-red-600 pr-24 mr-2 text-base">
                    {errors.message}
                  </div>
                )}

                <div className="mt-10 ">
                  <button
                    type="button"
                    className="w-60 h-9 rounded-lg text-zinc-900 text-lg bg-orange-200"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default About;
