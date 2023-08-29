// recipeSlice.js
import { createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk("recipe/fetchRecipes", async () => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    return response.data.meals;
  } catch (error) {
    throw error;
  }
});

// Add a selector to get the count of favorite recipes
export const selectFavoriteCount = createSelector(
  (state) => state.recipe.favorites,
  (favorites) => favorites.length
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipes: [],
    favorites: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.idMeal !== action.payload.idMeal
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
    });
  },
});

export const { addFavorite, removeFavorite } = recipeSlice.actions;

export default recipeSlice.reducer;
