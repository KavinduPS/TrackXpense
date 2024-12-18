import React, { useState, createContext, ReactNode } from "react";

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [incomes, setIncomes] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const addIncome = (income: any) => {
    setIncomes((prev) => [...prev, income]);
  };

  return (
    <GlobalContext.Provider value={{ addIncome, incomes, expenses, error }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
