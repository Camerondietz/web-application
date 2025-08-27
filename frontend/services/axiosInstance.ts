import axios from "axios";
import Cookies from "js-cookie";

// API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create a new axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add token to request if it's valid
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = Cookies.get("accessToken");

    // If we have an access token, we check if it's valid
    if (accessToken) {
      const validToken = await getValidAccessToken();
      if (validToken) {
        config.headers.Authorization = `Bearer ${validToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle token expiration globally
axiosInstance.interceptors.response.use(
  (response) => response, // Return the response if no error
  async (error) => {
    const originalRequest = error.config;

    // If the error is a 401 and token refresh has not been attempted yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get('refreshToken'); // Retrieve refresh token from cookies

      if (!refreshToken) {
        // Redirect to login if no refresh token
        return Promise.reject(error);
      }

      try {
        // Request a new access token using the refresh token
        const response = await axios.post(`${API_URL}/api/token/refresh/`, {
          refresh: refreshToken,
        });

        // Store the new access token
        Cookies.set('accessToken', response.data.access, { secure: true });

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
        return axios(originalRequest);

      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        // Redirect to login if token refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // If it's not a 401 or cannot be refreshed, reject the error
  }
);

// Function to refresh access token (you might already have this in your code)
const getValidAccessToken = async (): Promise<string | null> => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  if (!accessToken && !refreshToken) return null;

  try {
    const res = await axios.post(`${API_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });
    const newAccessToken = res.data.access;
    Cookies.set("accessToken", newAccessToken, { secure: true });
    return newAccessToken;
  } catch (err) {
    console.error("Error refreshing token", err);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    return null;
  }
};

export default axiosInstance;
