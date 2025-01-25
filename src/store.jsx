import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './scoreSlice';
import answerReducer from './answerSlice';

const store = configureStore({
  reducer: {
    score: scoreReducer,
    answer: answerReducer,
  },
});

export default store;
