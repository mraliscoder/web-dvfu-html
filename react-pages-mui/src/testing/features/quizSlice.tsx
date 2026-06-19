import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
  lists: string[][];
  choices: string[][];
}

const initialState: QuizState = {
  lists: [],
  choices: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },
    setDraggedItems: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },
    setChoice: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.choices[index] = items;
    },
  },
});

export const { addList, setDraggedItems, setChoice } = quizSlice.actions;
export default quizSlice.reducer;
