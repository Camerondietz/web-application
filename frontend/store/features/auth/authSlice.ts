import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from "axios";
import Cookies from "js-cookie";

// Base URL for Django API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      const response = await axios.post(`${API_URL}/api/login/`, { username, password });

      // Store tokens in cookies
      Cookies.set("accessToken", response.data.access, { secure: true });
      Cookies.set("refreshToken", response.data.refresh, { secure: true });

      return { user: username };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Login failed"; // Extract message
      return rejectWithValue(errorMessage); // Ensure only string is returned
    }
  }
);

// Async action: Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    //const csrfToken = Cookies.get("csrftoken");

    if (!refreshToken) {
      throw new Error("No refresh token found.");
    }
    //Ensure the request format matches Django's API
    await axios.post(
      `${API_URL}/api/logout/`,
      { refresh: refreshToken },
      { headers: {"Content-Type": "application/json" } }
    );

    //Remove tokens from cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    console.log("Logged out successfully");
    return true; // Success response
  } catch (error) {
    console.error("Logout failed", error);
  }
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register/`, { username, email, password });

      // Store tokens in cookies
      Cookies.set("accessToken", response.data.access, { secure: true });
      Cookies.set("refreshToken", response.data.refresh, { secure: true });

      return { user: username };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Registration failed");
    }
  }
);

// Async action: Load user from stored token
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        return rejectWithValue("No token found");
      }

      const response = await axios.get(`${API_URL}/api/auth/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return { user: response.data.username };
    } catch (error: any) {
      return rejectWithValue("Failed to load user");
    }
  }
);

//Retrieve active token - need to implement

export const getValidAccessToken = async (): Promise<string | null> => {
  const accessToken = Cookies.get('accessToken') ?? null;
  const refreshToken = Cookies.get('refreshToken') ?? null;

  if (!accessToken && !refreshToken) return null;

  try {
    // Try using current access token for a test request to validate it
    const res = await axios.get(`${API_URL}/api/auth/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Token is valid
    return accessToken;
  } catch (err: any) {
    // Token might be expired
    if (err.response?.status === 401 && refreshToken) {
      try {
        const res = await axios.post(`${API_URL}/api/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        Cookies.set('accessToken', newAccessToken, { secure: true });
        console.log("new token set");
        return newAccessToken;
      } catch (refreshError) {
        console.error("Refresh token invalid or expired", refreshError);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        return null;
      }
    }

    return null;
  }
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loadUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer