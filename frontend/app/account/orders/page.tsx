'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axiosInstance from '@/services/axiosInstance'; // Make sure to import your axios instance
import { useRouter } from "next/navigation";
import axios from 'axios';

type Order = {
  name: string;
  transaction_date: string;
  grand_total: number;
  status: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
    
      try {
        const res = await axiosInstance.get('/api/account/orders');
        
        // Axios automatically parses JSON, so no need for .json() here
        setOrders(res.data);  // Axios returns response data directly
        console.log(orders);
      } catch (error: any) {
        if (error.response?.status === 401) {
          // If token is expired, redirect to login page
          router.push('/login');
          console.error('Failed to fetch orders', error);
        } else {
          console.error('Failed to fetch orders', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">You have no orders.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.name}
              href={`/account/orders/${order.name}`}
              className="block border border-gray-300 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Order #{order.name}</p>
                  <p className="text-sm text-gray-500">Placed on {new Date(order.transaction_date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">${order.grand_total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{order.status}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
