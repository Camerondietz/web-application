import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload});
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      } else {
        state.items = state.items.filter(item => item.id !== action.payload.id); // Remove if quantity is 0
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateCartFromAPI(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload.map(item => ({
        ...item,
        price: parseFloat(item.price as any), // Convert string price to number
        image: state.items.find(i => i.id === item.id)?.image || '', // Preserve image if available
      }));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, updateCartFromAPI } = cartSlice.actions;
export default cartSlice.reducer;
