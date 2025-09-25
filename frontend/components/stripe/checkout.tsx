'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import {
  PaymentElement,
  useCheckout,
  AddressElement,
} from '@stripe/react-stripe-js';
import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CheckoutForm: React.FC = () => {
  const checkout = useCheckout();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = Cookies.get("accessToken");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const confirmResult = await checkout.confirm();
  
    if (confirmResult.type === 'error') {
      setMessage(confirmResult.error.message);
    }

    setIsLoading(false);
  };

  const [addresses, setAddresses] = useState<any[]>([]);
  useEffect(() => {
    // Fetch the addresses when the component mounts
    const fetchAddresses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/account/addresses/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      const data = await res.json();

      // Transform the data to match the desired format
      const transformedAddresses = data.map((address: any) => ({
        name: address.name,
        address: {
          line1: address.street,
          city: address.city,
          state: address.state,
          postal_code: address.zip_code,
          country: address.country,
        },
      }));

        setAddresses(transformedAddresses);
        console.log(addresses)
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, []);

  useEffect(() => {
  if (checkout) {
    console.log("Checkout updated:", checkout);
    console.dir(checkout, { depth: null });
  }
}, [checkout]);


  return (
    <form onSubmit={handleSubmit} className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 p-6 rounded shadow">
      
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2 mt-4">Shipping Address Information</h4>
      <div className="p-4 bg-white border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 rounded-lg shadow-sm">
        <AddressElement options={{ mode: 'shipping', contacts: addresses, }}/>
      </div>

      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2 mt-4">Payment Details</h4>
      <div className="mb-6">
        <PaymentElement id="payment-element"/>
      </div>

      {/* Show Tax */}
      {checkout?.total?.taxExclusive.amount ? (
        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-4">
          <span>Tax</span>
          <span>
            {checkout.total.taxExclusive.amount}
          </span>
        </div>
      ) : (
        <div className="text-sm text-gray-500 mb-4">Tax will be calculated shortly</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? (
          <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          `Pay ${checkout?.total?.total?.amount ?? ''}`
        )}
      </button>

      {message && (
        <div className="mt-4 text-sm text-red-600" id="payment-message">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;