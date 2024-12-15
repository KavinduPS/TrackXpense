import React from "react";
import AddExpenseForm from "../../components/ExpenseForm";
import ExpenseList from "../../components/ExpensesList";
import Sidebar from "../../components/Sidebar";
import logo from "../../assets/trackxpense_logo.png";
import { useAddExpenseMutation } from "../../modules/expenses/expensesApiSlice";
import { Expense as ExpenseType } from "../../types";
import { toast } from "react-toastify";

const Expense: React.FC = () => {
  const [addExpense] = useAddExpenseMutation();

  const handleAddExpense = async (expense: ExpenseType): Promise<void> => {
    try {
      await addExpense(expense).unwrap();
      toast.success("Expense added successfully");
    } catch (error: any) {
      console.log(error);
      toast(error?.data?.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-Darkgrayishviolet  ">
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <i className="absolute top-0 right-0 p-6">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "380px", height: "60px" }}
            />
          </i>

          <div className="flex w-full justify-between">
            <div className=" ml-14 mt-32 flex  justify-center">
              <AddExpenseForm onAddExpense={handleAddExpense} />
            </div>
            <div className="mt-32 w-full ml-28 mr-12 flex justify-center">
              <div className="w-11/12 ">
                <ExpenseList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
