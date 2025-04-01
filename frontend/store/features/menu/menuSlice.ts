import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch categories from Django backend
export const fetchCategories = createAsyncThunk(
  "menu/fetchCategories",
  async (parentId = null) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories?parent=${parentId || ""}`
    );
    return await response.json();
  }
);

const initialState = {
  isOpen: false,
  categories: [],
  currentParentId: null, // Keeps track of selected parent category
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isOpen = true;
      state.currentParentId = null; // Reset to top-level categories
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    setParentCategory: (state, action) => {
      state.currentParentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { openMenu, closeMenu, toggleMenu, setParentCategory } = menuSlice.actions;
export default menuSlice.reducer;
