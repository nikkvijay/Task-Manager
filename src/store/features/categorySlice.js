import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    // Create a new category
    addCategory: (state, action) => {
      const newCategory = {
        id: action.payload.id || Date.now().toString(),
        name: action.payload.name.trim(),
        color: action.payload.color || "#1976d2",
      };

      // Check for duplicate category names
      const isDuplicate = state.categories.some(
        (cat) => cat.name.toLowerCase() === newCategory.name.toLowerCase()
      );

      if (!isDuplicate) {
        state.categories.push(newCategory);
      }
    },

    // Update an existing category
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(
        (cat) => cat.id === action.payload.id
      );

      if (index !== -1) {
        // Prevent duplicate names
        const isDuplicate = state.categories.some(
          (cat, idx) =>
            idx !== index &&
            cat.name.toLowerCase() === action.payload.name.toLowerCase()
        );

        if (!isDuplicate) {
          state.categories[index] = {
            ...state.categories[index],
            ...action.payload,
          };
        }
      }
    },

    // Delete a category
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
