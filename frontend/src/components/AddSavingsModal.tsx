import React from "react";
import { Goal } from "../types";
import * as Yup from "yup";
import { Field, Formik, Form } from "formik";

type AddSavings = {
  amount: number;
};

type AddSavingsModalProps = {
  isVisible: boolean;
  goal: Goal;
  onCloseModal: () => void;
  onSaveGoal: (amount: number) => Promise<void>;
};

const AddSavingsModal = ({
  isVisible,
  goal,
  onCloseModal,
  onSaveGoal,
}: AddSavingsModalProps) => {
  const initialValues: AddSavings = {
    amount: 0,
  };

  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("Enter a saving amount")
      .positive("Amount must be positive")
      .typeError("Input only numbers"),
  });

  const handleSubmit = (values: AddSavings): void => {
    console.log(typeof values.amount);
    onSaveGoal(values.amount);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form>
          <div
            className={`fixed inset-0 flex justify-center items-center transition-colors flex-col border-2 border-black w-200 bg-zinc-900 bg-opacity-90 ${
              isVisible ? "visible bg-black/50" : "invisible"
            }`}
          >
            <div className=" p-10 w-1/3 bg-zinc-700 rounded-lg">
              <div>
                <h2 className="text-gray-200 text-xl font-semibold mb-4">
                  Add saving
                </h2>
                <Field
                  className="w-80 h-10 pl-3 bg-zinc-700 border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
                  type="number"
                  name="amount"
                  placeholder="Saving amount"
                />
                <div className="flex justify-center items-center text-left rounded-lg">
                  {touched.amount && errors.amount && (
                    <div className="text-red-600 w-80 pl-3">
                      {errors.amount}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-80 h-10 mt-5 pl-3 bg-green-300 rounded-lg text-zinc-900"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="w-80 h-10 mt-5 pl-3 bg-orange-200 rounded-lg text-zinc-900"
                  onClick={onCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddSavingsModal;
