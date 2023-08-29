import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import recipeReducer from './recipeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    recipe: recipeReducer,
  },
});
