'use client';

import { useState, useEffect } from 'react';

interface PriceLoaderProps {
  productId: number;
}

const PriceLoader: React.FC<PriceLoaderProps> = ({ productId }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/PricesView/?product_ids=${productId}`,
          {
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch price');
        }

        const data = await response.json();
        if (data.status === 'error') {
          throw new Error(data.message);
        }

        setPrice(data.data[productId]);
      } catch (err) {
        setError('Failed to load price');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-start">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <span className="text-red-500 text-sm">Error</span>;
  }

  return (
    <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
      {price !== null ? `$${price.toFixed(2)}` : 'Unavailable'}
    </span>
  );
};

export default PriceLoader;