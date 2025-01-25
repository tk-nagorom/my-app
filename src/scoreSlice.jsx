// scoreSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    value: 0,               // Total score
    correctAnswers: 0,      // Number of correct answers
    incorrectAnswers: 0,    // Number of incorrect answers
  },
  reducers: {
    incrementScore: (state) => {
      state.value += 1;  // Increment score by 1
    },
    incrementCorrect: (state) => {
      state.correctAnswers += 1;  // Increment correct answer count by 1
    },
    incrementIncorrect: (state) => {
      state.incorrectAnswers += 1;  // Increment incorrect answer count by 1
    },
    resetScore: (state) => {
      state.value = 0;
      state.correctAnswers = 0;
      state.incorrectAnswers = 0;
    },
  },
});

// Export the actions to use in the component
export const { incrementScore, incrementCorrect, incrementIncorrect, resetScore } = scoreSlice.actions;

// Export the reducer to configure the store
export default scoreSlice.reducer;
