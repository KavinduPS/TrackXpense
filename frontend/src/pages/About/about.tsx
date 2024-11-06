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
    <div
      className="flex min-h-screen  text-white"
      style={{ backgroundColor: "#352F44" }}
    >
      <Sidebar />
      <div className="relative">
        <div className="text-left ml-20 mt-40 text-xl ">
          <h1>Contact Us</h1>
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
              <div className="ml-20">
                <Field
                  name="name"
                  placeholder="Name"
                  className="mt-10 w-60 h-9 rounded-lg px-2 mr-20"
                />
              </div>
              {touched.name && errors.name && (
                <div className="text-red-600 pr-20 mr-5">{errors.name}</div>
              )}

              <div className="ml-20">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="mt-5 w-60 h-9 rounded-lg px-2 mr-20"
                />
              </div>
              {touched.email && errors.email && (
                <div className="text-red-600 pr-24 mr-2 ">{errors.email}</div>
              )}

              <div className="ml-20">
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Message"
                  className="mt-5 w-60 rounded-lg px-2 mr-20 h-40"
                />
              </div>
              {touched.message && errors.message && (
                <div className="text-red-600 pr-24 mr-2">{errors.message}</div>
              )}

              <div className="mt-10 ">
                <button
                  type="button"
                  className="w-60 h-9 rounded-lg text-zinc-700"
                  style={{ backgroundColor: "#FDCB9E" }}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-40 w-60">
        <h2>About Us</h2>
        <div className="text-justify">
          <h2>
            Your financial peace of mind is our mission. Simplify your budgeting
            and stay on top of your expenses with our user-friendly and
            innovative platform."
          </h2>
        </div>
      </div>
    </div>
  );
};

export default About;
