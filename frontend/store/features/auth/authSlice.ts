import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from "axios";
import Cookies from "js-cookie";

// Base URL for Django API
const API_URL = "http://localhost:8000/api";

// Define a type for the slice state
/*
interface AuthState {
  isLoggedIn: boolean
  status: 'idle' | 'loading' | 'failed'
  user: string | null
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  status: 'idle',
  user: null
}*/

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async action: Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, { username, password });

      // Store tokens in cookies
      Cookies.set("accessToken", response.data.access, { secure: true });
      Cookies.set("refreshToken", response.data.refresh, { secure: true });

      return { user: username };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Async action: Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      await axios.post(`${API_URL}/logout/`, { refresh: refreshToken });

      // Remove tokens from cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
  } catch (error) {
    console.error("Logout failed", error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    /*Logout: state => {
      state.isLoggedIn = false
      state.user = null;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    LoginSuccess: (state, action: PayloadAction<string>) => {
      state.user = action.payload
      state.isLoggedIn = true
    }*/
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
    }
});

//export const { Logout, LoginSuccess} = authSlice.actions
// Other code such as selectors can use the imported `RootState` type
//export const selectAuth = (state: RootState) => state.auth.isLoggedIn
//export const selectUser = (state: RootState) => state.auth.user
export default authSlice.reducer