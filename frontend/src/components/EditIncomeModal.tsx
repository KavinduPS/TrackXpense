import { Income } from "../types";
import * as Yup from "yup";
import { Field, Formik, Form } from "formik";

type EditIncomeModalProps = {
  isVisible: boolean;
  editingIncome: Income;
  onCloseModal: () => void;
  onSaveIncome: (income: Income) => void;
};

export const EditIncomeModal = ({
  isVisible,
  onCloseModal,
  editingIncome,
  onSaveIncome,
}: EditIncomeModalProps) => {
  const { _id, name, amount, date, source, reference } = editingIncome;
  const initialValues: Income = {
    _id: _id,
    name: name,
    amount: amount,
    date: date.toString().split("T")[0],
    source: source,
    reference: reference,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Add Income name"),
    amount: Yup.number()
      .required("Add Income amount")
      .positive("Amount must be positive")
      .typeError("Input only numbers"),
    source: Yup.string().required("Add Income source"),
  });

  const handleSubmit = (
    values: Income,
    { resetForm }: { resetForm: () => void }
  ): void => {
    onSaveIncome(values);
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
            className={`fixed inset-0 flex justify-center items-center transition-colors flex-col border-2 border-black w-200 bg-zinc-900 bg-opacity-90 ${
              isVisible ? "visible bg-black/50" : "invisible"
            }`}
          >
            <div className=" p-10 w-1/3 bg-zinc-700 rounded-lg">
              <div>
                <h2 className="text-gray-200 text-xl font-semibold mb-4">
                  Update Income
                </h2>
                <Field
                  className="w-80 h-10 pl-3 bg-zinc-700 border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
                  type="text"
                  name="name"
                  placeholder="Income Name"
                />
                <div className="flex justify-center items-center text-left rounded-lg">
                  {touched.name && errors.name && (
                    <div className="text-red-600 w-80 pl-3">{errors.name}</div>
                  )}
                </div>
              </div>

              <div>
                <Field
                  className="w-80 h-10 mt-5 pl-3 bg-zinc-700 border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
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
                  className="w-80 h-10 mt-5 pl-3 pr-3 bg-zinc-700 border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
                />
                <div className="flex justify-center items-center text-left rounded-lg">
                  {touched.date && errors.date && (
                    <div className="text-red-600 w-80 pl-3"></div>
                  )}
                </div>
              </div>

              <Field
                className="w-80 h-10 pl-3 mt-5 bg-zinc-700 border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
                type="text"
                name="source"
                placeholder="Income source"
              />
              <div className="flex justify-center items-center text-left rounded-lg">
                {touched.source && errors.source && (
                  <div className="text-red-600 w-80 pl-3">{errors.source}</div>
                )}
              </div>

              <div>
                <Field
                  className="w-80 h-32 mt-5 px-3 pt-3 bg-zinc-700 border border-gray-200 rounded-lg text-gray-200 focus:outline-none"
                  as="textarea"
                  name="reference"
                  placeholder="Reference"
                />
              </div>

              <button
                type="submit"
                className="w-80 h-10 mt-5 pl-3 bg-green-300 rounded-lg text-zinc-900"
              >
                Update Income
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
        </Form>
      )}
    </Formik>
  );
};
