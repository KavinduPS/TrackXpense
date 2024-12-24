import { Expense } from "../types";
import * as Yup from "yup";
import { Field, Formik, Form } from "formik";

type EditExpenseModalProps = {
  isVisible: boolean;
  editingExpense: Expense;
  onCloseModal: () => void;
  onSaveExpense: (expense: Expense) => void;
};

export const EditExpenseModal = ({
  isVisible,
  onCloseModal,
  editingExpense,
  onSaveExpense,
}: EditExpenseModalProps) => {
  const { _id, name, amount, date, category, reference } = editingExpense;
  const initialValues: Expense = {
    _id: _id,
    name: name,
    amount: amount,
    date: date.toString().split("T")[0],
    category: category,
    reference: reference,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Add expense name"),
    amount: Yup.number()
      .required("Add expense amount")
      .positive("Amount must be positive")
      .typeError("Input only numbers"),
    category: Yup.string().required("Select category"),
  });

  const handleSubmit = (
    values: Expense,
    { resetForm }: { resetForm: () => void }
  ): void => {
    onSaveExpense(values);
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
          <div
            className={`fixed inset-0 flex justify-center items-center transition-colors flex-col  w-full bg-black bg-opacity-90 ${
              isVisible ? "visible bg-black/50" : "invisible"
            }`}
          >
            <div className="py-8 px-12 w-auto bg-Dark rounded-lg">
              <div>
                <h2 className="text-gray-200 text-xl font-semibold mb-4">
                  Update Expense
                </h2>
                <Field
                  className="w-80 h-10 pl-3  border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
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
                  className="w-80 h-10 mt-5 pl-3  border border-gray-200 rounded-lg  focus:outline-none"
                  type="text"
                  name="amount"
                  placeholder="Amount"
                  pattern="[0-9]*"
                />
                <div className="flex justify-center items-center text-left rounded-lg">
                  {touched.amount && errors.amount && (
                    <div className="text-red-600 w-80 pl-3">
                      {errors.amount}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Field
                  type="date"
                  name="date"
                  className="w-80 h-10 mt-5 pl-3 pr-3 border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
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
                  className="w-80 h-10 mt-5 px-3 border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
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
                  <option value="Other">Other</option>
                </Field>
                {touched.category && errors.category && (
                  <div className="text-red-600 text-left pl-24">
                    {errors.category}
                  </div>
                )}
              </div>

              <div>
                <Field
                  className="w-80 h-32 mt-5 px-3 pt-3 border border-gray-200 rounded-lg text-zinc-900 focus:outline-none"
                  as="textarea"
                  name="reference"
                  placeholder="Reference"
                />
              </div>
              <div className="flex flex-col">
                <button
                  type="submit"
                  className="w-80 h-10 mt-5 pl-3 bg-green-300 rounded-lg text-zinc-900"
                >
                  Update Expense
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
