// recipeSlice.js
import {
  createSelector,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk(
  "recipe/fetchRecipes",
  async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      return response.data.meals;
    } catch (error) {
      throw error;
    }
  }
);

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
    currentFavoriteCount: parseInt(localStorage.getItem("currentFavoriteCount")) || 0,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      state.currentFavoriteCount += 1;
      localStorage.setItem("currentFavoriteCount", state.currentFavoriteCount);
    },
    removeFavorite: (state, action) => {
      // Get the object from localStorage
      const storedObject =
        JSON.parse(localStorage.getItem("filledHearts")) || {};
      // Check if the property exists in the object
      if (storedObject.hasOwnProperty(action.payload.idMeal)) {
        // Change the value of the property in the object
        storedObject[action.payload.idMeal] = false;
        // Update the object in localStorage
        localStorage.setItem("filledHearts", JSON.stringify(storedObject));
      }
      state.favorites = state.favorites.filter(
        (fav) => fav.idMeal !== action.payload.idMeal
      );
      state.currentFavoriteCount -= 1;
      localStorage.setItem("currentFavoriteCount", state.currentFavoriteCount);
    },
    // Action to initialize currentFavoriteCount
    initializeFavoriteCount: (state) => {
      state.currentFavoriteCount = parseInt(localStorage.getItem("currentFavoriteCount")) || 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
    });
  },
});

export const { addFavorite, removeFavorite, initializeFavoriteCount } = recipeSlice.actions;

export default recipeSlice.reducer;
