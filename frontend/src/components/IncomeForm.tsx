import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addIncome } from "../State/incomSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Income } from "../types";

type AddIncomeFormProps = {
  onAddIncome: (income: Income) => Promise<void>;
};

const AddIncomeForm = ({ onAddIncome }: AddIncomeFormProps) => {
  // const dispatch = useDispatch();

  const initialValues: Income = {
    name: "",
    amount: 0,
    date: new Date(Date.now()).toISOString().split("T")[0],
    category: "",
    reference: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Add Income name"),
    amount: Yup.number()
      .required("Add Income amount")
      .positive("Amount must be positive")
      .typeError("Input only numbers"),
    category: Yup.string().required("Select category"),
    reference: Yup.string().required("Add reference"),
  });

  const handleSubmit = (
    values: Income,
    { resetForm }: { resetForm: () => void }
  ): void => {
    onAddIncome(values);
    resetForm();
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
              Add Income
            </h2>
            <Field
              className="w-80 h-10 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
              type="text"
              name="name"
              placeholder="Expense Name"
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
              name="amount"
              placeholder="Amount"
              pattern="[0-9]*"
            />
            <div className="flex justify-center items-center text-left rounded-lg">
              {touched.amount && errors.amount && (
                <div className="text-red-600 w-80 pl-3">{errors.amount}</div>
              )}
            </div>
          </div>

          <div>
            <Field
              type="date"
              name="date"
              className="w-80 h-10 mt-5 pl-3 pr-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
            />
            <div className="flex justify-center items-center text-left rounded-lg">
              {touched.date && errors.date && (
                <div className="text-red-600 w-80 pl-3"></div>
              )}
            </div>
          </div>

          <div>
            <Field
              as="select"
              name="category"
              className="w-80 h-10 mt-5 pl-3 border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
            >
              <option value="" className="text-zinc-900">
                Category
              </option>
              <option value="Salary">Salary</option>
                  <option value="Secoundary Income">Secoundary Income</option>
                  <option value="Housing/Rent">Housing/Rent</option>
                  <option value="Sales">Sales</option>
                  <option value="Bank Interest">Bank Interest</option>
                  <option value="Share market">Share market</option>
                  <option value="Other">Other</option>
            </Field>
            <div className="flex justify-center items-center text-left rounded-lg">
              {touched.category && errors.category && (
                <div className="text-red-600 w-80 pl-4">{errors.category}</div>
              )}
            </div>
          </div>

          <div>
            <Field
              className="w-80 h-32 mt-5 px-3 pt-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
              as="textarea"
              name="reference"
              placeholder="Reference"
            />
            <div className="flex justify-center items-center text-left rounded-lg">
              {touched.reference && errors.reference && (
                <div className="text-red-600 w-80 pl-3">{errors.reference}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-80 h-10 mt-5 pl-3 bg-orange-200 rounded-lg text-zinc-900"
          >
            Add Income
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddIncomeForm;
