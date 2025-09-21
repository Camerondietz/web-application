"use client";
import { notFound } from 'next/navigation';
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import axiosInstance from '@/services/axiosInstance'; // Make sure to import your axios instance
import { useRouter } from "next/navigation";

//import { Order, OrderItem } from '@/types'; // If you have types, otherwise define inline

type OrderDetail = {
  order_details: {
    order_name: string;
    creation: string;
    transaction_date: string;
    delivery_date: string;
    currency: string;
    grand_total: number;
    taxes_and_charges: string;
    status: string;
    delivery_status: string;
    customer: string;
    total_net_weight: number;
    base_total: number;
    total_taxes_and_charges: number;
  };
  items: {
    item_name: string;
    item_code: string;
    qty: number;
    rate: number;
    amount: number;
  }[];
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
    
      try {
        const res = await axiosInstance.get(`/api/account/order/${id}/`);

        setOrder(res.data);  // Axios returns response data directly
        console.log(order);
      } catch (error: any) {
        if (error.response?.status === 401) {
          // If token is expired, redirect to login page
          router.push('/login');
          console.error('Failed to fetch orders', error);
        } else {
          console.error('Failed to fetch orders', error);
        }
      }
    };

    fetchOrders();
  }, [router,id]);

  if (!order) return <p>Loading...</p>;

  const {
    order_name,
    creation,
    transaction_date,
    delivery_date,
    currency,
    grand_total,
    taxes_and_charges,
    status,
    delivery_status,
    customer,
    total_net_weight,
    base_total,
    total_taxes_and_charges,
  } = order.order_details;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Order: {order_name}</h1>
      
      <div className="mb-6 text-sm text-gray-600 dark:text-gray-300 space-y-1">
        <p><strong>Customer:</strong> {customer}</p>
        <p><strong>Created:</strong> {new Date(creation).toLocaleDateString()}</p>
        <p><strong>Transaction Date:</strong> {new Date(transaction_date).toLocaleDateString()}</p>
        <p><strong>Delivery Date:</strong> {new Date(delivery_date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Delivery Status:</strong> {delivery_status}</p>
        <p><strong>Currency:</strong> {currency}</p>
        <p><strong>Total Net Weight:</strong> {total_net_weight}</p>
        <p><strong>Taxes & Charges:</strong> {taxes_and_charges}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Items</h2>
      <div className="border-t border-b border-gray-300 dark:border-gray-700 divide-y">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-4">
            <div>
              <p className="font-semibold">{item.item_name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Code: {item.item_code} | Qty: {item.qty} | Rate: {currency} {item.rate.toFixed(2)}
              </p>
            </div>
            <div className="text-right font-medium">
              {currency} {item.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6 text-xl font-bold">
        Total: {currency} {grand_total.toFixed(2)}
      </div>
    </div>
  );
}
