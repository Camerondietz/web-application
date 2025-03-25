"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../../store/features/auth/authSlice";
import type { RootState, AppDispatch } from "../../store/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js router for redirection

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); // Router for navigation
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(registerUser({ username, email, password }))
      .unwrap()
      .then(() => {
        dispatch(loginUser({ username, password })); // Auto-login after successful registration
      })
      .catch((err) => console.error("Registration error:", err)); // Handle potential errors
  };

  // Redirect if authentication is successful
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // Redirect to homepage after successful login
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isAuthenticated ? (
        <p>You are registered and logged in!</p>
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      )}
      <p>Already have an account? <Link href="/login">Login here</Link></p>
    </div>
  );
};

export default Register;
