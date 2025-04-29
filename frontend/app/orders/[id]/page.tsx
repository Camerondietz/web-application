"use client";
import { notFound } from 'next/navigation';
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';

//import { Order, OrderItem } from '@/types'; // If you have types, otherwise define inline

type OrderDetail = {
  id: number;
  order_number: string;
  created_at: string;
  status: string;
  total: number;
  items: {
    id: number;
    product: {
      id: number;
      name: string;
      image: string | null;
    };
    quantity: number;
    price: number;
  }[];
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      }
    }

    if (id) fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Order #{order.order_number}</h1>
      <div className="mb-6 text-sm text-gray-600 dark:text-gray-300">
        <p>Placed on: {new Date(order.created_at).toLocaleDateString()}</p>
        <p>Status: <span className="capitalize">{order.status}</span></p>
      </div>

      <div className="border-t border-b border-gray-300 dark:border-gray-700 divide-y">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center py-4 gap-4">
            <img
              src={item.product.image ? `${process.env.NEXT_PUBLIC_API_URL}${item.product.image}` : '/placeholder.jpg'}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.product.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)} each</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6 text-xl font-bold">
        Total: ${order.total.toFixed(2)}
      </div>
    </div>
  );
}
