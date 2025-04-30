import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch categories from Django backend
export const fetchCategories = createAsyncThunk(
  "menu/fetchCategories",
  async (parentId: number | null) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories?parent=${parentId}`
    );
    return await response.json();
  }
);
// Fetch manufacturers from Django backend
export const fetchManufacturers = createAsyncThunk(
  "menu/fetchManufacturers",
  async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/manufacturers`
    );
    return await response.json();
  }
);

type MenuState = {
  isOpen: boolean;
  categories: any[]; // or specific type
  manufacturers: any[];
  currentParentId: number | null;
  loading: boolean;
  error: string | undefined;
};

const initialState: MenuState = {
  isOpen: false,
  categories: [],
  manufacturers: [],
  currentParentId: null,
  loading: false,
  error: undefined,
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
    // Categories
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
    })

    // Manufacturers
    .addCase(fetchManufacturers.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchManufacturers.fulfilled, (state, action) => {
      state.loading = false;
      state.manufacturers = action.payload;
    })
    .addCase(fetchManufacturers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { openMenu, closeMenu, toggleMenu, setParentCategory } = menuSlice.actions;
export default menuSlice.reducer;
