"use client"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
//import { LoginSuccess } from "../../store/features/auth/authSlice";
import { loginUser } from "../../store/features/auth/authSlice";
import type { RootState, AppDispatch } from "../../store/store";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(loginUser({ username, password }));
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Login to Your Account
          </h2>
  
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
  
          {isAuthenticated ? (
            <p className="text-green-600 text-center font-semibold">
              You are logged in!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  };
  
  export default Login;


/*
export default function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");

    function attemptLogin() {
        dispatch(LoginSuccess(username)); // Pass the username value
    }

    return (
        <>
            <h2>
            <Link href="/">home</Link>
            </h2>
            <h1>Login here</h1>
            <br />
            <input 
                id="username" 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter name"
            />
            <br />
            <button onClick={attemptLogin}>Login</button>
            <br></br>
            <p>state is </p><input value={username}></input>
            <br></br>
            
        </>
    );
}*/