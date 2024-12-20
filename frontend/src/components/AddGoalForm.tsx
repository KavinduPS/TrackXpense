import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Goal } from "../types";

type AddGoalFormProps = {
  onAddGoal: (goal: Goal) => Promise<void>;
};

const AddGoalForm = ({ onAddGoal }: AddGoalFormProps) => {
  const initialValues: Goal = {
    name: "",
    targetAmount: 0,
    savedAmount: 0,
    deadline: new Date(Date.now()).toISOString().split("T")[0],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Add Goal name"),
    targetAmount: Yup.number()
      .required("Add goal target amount")
      .positive("Amount must be positive")
      .typeError("Input only numbers"),
    savedAmount: Yup.number()
      .moreThan(-1, "Amount must 0 or greater")
      .typeError("Input only numbers"),
    deadline: Yup.string().required("Enter deadline"),
  });

  const handleSubmit = (values: Goal): void => {
    onAddGoal(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form>
          <div>
            <h2 className="text-gray-200 text-xl font-semibold mb-4">
              Add Goal
            </h2>
            <Field
              className="w-80 h-10 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
              type="text"
              name="name"
              placeholder="Goal Name"
            />
            <div className="flex justify-center items-center text-left rounded-lg">
              {touched.name && errors.name && (
                <div className="text-red-600 w-80 pl-3">{errors.name}</div>
              )}
            </div>
          </div>

          <div>
            <Field
              className="w-80 h-10 mt-5 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
              type="text"
              name="targetAmount"
              placeholder="Goal target"
              pattern="[0-9]*"
            />
            <div className="flex justify-center items-center text-left rounded-lg">
              {touched.targetAmount && errors.targetAmount && (
                <div className="text-red-600 w-80 pl-3">
                  {errors.targetAmount}
                </div>
              )}
            </div>
          </div>
          <div>
            <Field
              className="w-80 h-10 mt-5 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
              type="text"
              name="savedAmount"
              placeholder="Current savins"
              pattern="[0-9]*"
            />
            <div className="flex justify-center items-center text-left rounded-lg">
              {touched.savedAmount && errors.savedAmount && (
                <div className="text-red-600 w-80 pl-3">
                  {errors.savedAmount}
                </div>
              )}
            </div>
          </div>

          <div>
            <Field
              type="date"
              name="deadline"
              className="w-80 h-10 mt-5 pl-3 pr-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
            />
            <div className="flex justify-center items-center text-left rounded-lg">
              {touched.deadline && errors.deadline && (
                <div className="text-red-600 w-80 pl-3"></div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-80 h-10 mt-5 pl-3 bg-orange-200 rounded-lg text-zinc-900"
          >
            Add Goal
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddGoalForm;
