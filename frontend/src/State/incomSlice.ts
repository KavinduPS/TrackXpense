import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Income {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
}

interface IncomeState {
  incomeList: Income[];
}

const initialState: IncomeState = {
  incomeList: [],
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<Income>) => {
      state.incomeList.push(action.payload);
    },
    removeIncome: (state, action: PayloadAction<number>) => {
      state.incomeList = state.incomeList.filter(
        (income) => income.id !== action.payload
      );
    },
    updateIncome: (state, action: PayloadAction<Income>) => {
      const index = state.incomeList.findIndex(
        (income) => income.id === action.payload.id
      );
      if (index !== -1) {
        state.incomeList[index] = action.payload;
      }
    },
  },
});

export const { addIncome, removeIncome, updateIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
