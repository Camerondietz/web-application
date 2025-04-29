"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AccountPage() {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = Cookies.get("accessToken");
        const response = await axios.get(`${API_URL}/api/account/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch account details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = Cookies.get("accessToken");
      await axios.put(`${API_URL}/api/account/update/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Account details updated successfully.");
    } catch (err) {
      setError("Failed to update account details.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (passwordData.new_password !== passwordData.confirm_password) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      const token = Cookies.get("accessToken");
      await axios.put(`${API_URL}/api/account/change-password/`, passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPasswordSuccess("Password updated successfully.");
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      setPasswordError("Failed to update password. Please check your current password.");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading account details...</p>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-lg">

      <h2 className="text-2xl font-bold text-center mt-8 dark:text-white">Orders</h2>
      <Link href="/orders" className="bg-blue-500 m-3 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg items-center w-full"
      > See orders</Link>

      <h2 className="text-3xl font-bold text-center dark:text-white">Account Details</h2>

      {/* Account Info Update */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {success && <p className="text-green-500 text-center mt-2">{success}</p>}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 mt-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Update Account
        </button>
      </form>

      {/* Password Change Section */}
      <h2 className="text-2xl font-bold text-center mt-8 dark:text-white">Change Password</h2>

      {passwordError && <p className="text-red-500 text-center mt-2">{passwordError}</p>}
      {passwordSuccess && <p className="text-green-500 text-center mt-2">{passwordSuccess}</p>}

      <form onSubmit={handlePasswordSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 mt-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Current Password</label>
          <input
            type="password"
            name="current_password"
            value={passwordData.current_password}
            onChange={handlePasswordChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">New Password</label>
          <input
            type="password"
            name="new_password"
            value={passwordData.new_password}
            onChange={handlePasswordChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Confirm New Password</label>
          <input
            type="password"
            name="confirm_password"
            value={passwordData.confirm_password}
            onChange={handlePasswordChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
