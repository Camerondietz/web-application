"use client"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
//import { LoginSuccess } from "../../store/features/auth/authSlice";
import { loginUser } from "../../store/features/auth/authSlice";
import type { RootState, AppDispatch } from "../../store/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(loginUser({ username, password }));
    };
   
    // Redirect after login
    useEffect(() => {
      if (isAuthenticated) {
        const timeout = setTimeout(() => {
          // If the login is successful, go back to the previous page
          if (typeof window !== 'undefined') {
            window.history.back(); // Go to the previous page in history
          }
          router.push("/");
        }, 3000); // 3 seconds

        return () => clearTimeout(timeout); // Clean up timeout on component unmount
      }
    }, [isAuthenticated, router]);

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
            <>
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
            <div className="mt-4 text-center flex flex-col space-y-2">
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot your username or password?
              </Link>
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Register
              </Link>
            </div>
            </>
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