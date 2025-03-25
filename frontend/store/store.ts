import { configureStore } from '@reduxjs/toolkit'
//import cartReducer from "./slices/cartSlice";
import authReducer from "./features/auth/authSlice";
import counterReducer from "./features/counter/counterSlice";
import menuReducer from "./features/menu/menuSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      //cart: cartReducer,
      auth: authReducer,
      counter: counterReducer,
      menu: menuReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']