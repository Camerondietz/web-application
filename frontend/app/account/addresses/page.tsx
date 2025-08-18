'use client';

import { useEffect, useState } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import Cookies from "js-cookie";

type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Address>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = Cookies.get("accessToken");

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/account/addresses/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      const data = await res.json();
      setAddresses(data);
    } catch (err) {
      setError('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `${API_URL}/api/account/addresses/${editingId}/`
      : `${API_URL}/api/account/addresses/add/`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save address');
      setSuccess('Address saved');
      setForm({});
      setEditingId(null);
      fetchAddresses();
    } catch (err) {
      setError('Failed to save address');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this address?')) return;
    try {
      const res = await fetch(`${API_URL}/api/account/addresses/delete/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error();
      fetchAddresses();
    } catch {
      setError('Delete failed');
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/api/account/addresses/${id}/set-default/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error();
      fetchAddresses();
    } catch {
      setError('Could not set default address');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Your Addresses</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {loading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading...</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {addresses.map((address) => (
            <li
              key={address.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <p className="text-gray-800 dark:text-white">
                {address.street}, {address.city}, {address.state},{' '}
                {address.zip_code}, {address.country}
              </p>
              {address.is_default && (
                <p className="text-sm text-green-500 mt-1">Default</p>
              )}
              <div className="mt-2 space-x-2">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => {
                    setForm(address);
                    setEditingId(address.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-600 hover:underline"
                  onClick={() => handleDelete(address.id)}
                >
                  Delete
                </button>
                {!address.is_default && (
                  <button
                    className="text-sm text-yellow-600 hover:underline"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add/Edit Form */}
      <h3 className="text-2xl font-semibold mb-4 dark:text-white">
        {editingId ? 'Edit Address' : 'Add Address'}
      </h3>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
      >
        {['street', 'city', 'state', 'zip_code', 'country'].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 dark:text-gray-300 capitalize">
              {field.replace('_', ' ')}
            </label>
            <input
              type="text"
              name={field}
              value={(form as any)[field] || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          {editingId ? 'Update Address' : 'Add Address'}
        </button>
      </form>
    </div>
  );
}
