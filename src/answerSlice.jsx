import { createSlice } from '@reduxjs/toolkit';

const answerSlice = createSlice({
  name: 'answer',
  initialState: {
    correct: 0,
    incorrect: 0,
  },
  reducers: {
    incrementCorrect: (state) => {
      state.correct += 1;
    },
    incrementIncorrect: (state) => {
      state.incorrect += 1;
    },
  },
});

export const { incrementCorrect, incrementIncorrect } = answerSlice.actions;

export default answerSlice.reducer;
