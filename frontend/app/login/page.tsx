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
      <div>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isAuthenticated ? (
          <p>You are logged in!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}
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