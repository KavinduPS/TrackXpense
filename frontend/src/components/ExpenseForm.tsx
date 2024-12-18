import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../State/ExpenseSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Expense } from "../types";

type AddExpenseFormProps = {
  onAddExpense: (expense: Expense) => Promise<void>;
};

const AddExpenseForm = ({ onAddExpense }: AddExpenseFormProps) => {
  // const dispatch = useDispatch();

  const initialValues: Expense = {
    name: "",
    amount: 0,
    date: new Date(Date.now()).toISOString().split("T")[0],
    category: "",
    reference: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Add expense name"),
    amount: Yup.number()
      .required("Add expense amount")
      .positive("Amount must be positive")
      .typeError("Input only numbers"),
    category: Yup.string().required("Select category"),
    reference: Yup.string().required("Add reference"),
  });

  const handleSubmit = (
    values: Expense,
    { resetForm }: { resetForm: () => void }
  ): void => {
    onAddExpense(values);
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
              Add Expense
            </h2>
            <Field
              className="w-80 h-10 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
              type="text"
              name="name"
              placeholder="Expense Name"
            />
            {touched.name && errors.name && (
              <div className="text-red-600 mr-2 -ml-28">{errors.name}</div>
            )}
          </div>

          <div>
            <Field
              className="w-80 h-10 mt-5 pl-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
              type="text"
              name="amount"
              placeholder="Amount"
              pattern="[0-9]*"
            />
            {touched.amount && errors.amount && (
              <div className="text-red-600 mr-2 -ml-28">{errors.amount}</div>
            )}
          </div>

          <div>
            <Field
              type="date"
              name="date"
              className="w-80 h-10 mt-5 pl-3 pr-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
            />
            {touched.date && errors.date && (
              <div className="text-red-600 mr-2 -ml-28"></div>
            )}
          </div>

          <div>
            <Field
              as="select"
              name="category"
              className="w-80 h-10 mt-5 px-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
            >
              <option value="" className="text-gray-50">
                Category
              </option>
              <option value="Groceries">Groceries</option>
              <option value="Dining/Restaurants">Dining/Restaurants</option>
              <option value="Housing/Rent">Housing/Rent</option>
              <option value="Utilities">Utilities</option>
              <option value="Transportation">Transportation</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </Field>
            {touched.category && errors.category && (
              <div className="text-red-600 mr-2 -ml-28">{errors.category}</div>
            )}
          </div>

          <div>
            <Field
              className="w-80 h-32 mt-5 px-3 pt-3 bg-Darkgrayishviolet border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
              as="textarea"
              name="reference"
              placeholder="Reference"
            />
            {touched.reference && errors.reference && (
              <div className="text-red-600 mr-2 -ml-28">{errors.reference}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-80 h-10 mt-5 pl-3 bg-orange-200 rounded-lg text-Darkgrayishviolet"
          >
            Add Expense
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddExpenseForm;
