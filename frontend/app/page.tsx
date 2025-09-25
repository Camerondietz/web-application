'use client'
//import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
//import { decrement, increment, incrementByAmount } from "../store/features/counter/counterSlice";
import { RootState } from "../store/store";
//import { Button } from "@/components/ui/button";
//import Link from "next/link";
import Carousel from "@/components/carousel";
import { useState, useEffect } from 'react';

export default function Home() {

  // Define interfaces for the API response
  interface Category {
    id: number;
    name: string;
    image: string | null;
  }

  interface Product {
    id: number;
    name: string;
    image: string | null;
  }

  interface Manufacturer {
    id: number;
    name: string;
    website: string | null;
    image: string | null;
  }

  interface FeaturedData {
    categories: Category[];
    products: Product[];
    manufacturers: Manufacturer[];
  }

  const count = useSelector((state: RootState) => state.counter.value);
  const [featured, setFeatured] = useState<FeaturedData>({
      categories: [],
      products: [],
      manufacturers: [],
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homepage-featured`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch');
          }
          return res.json();
        })
        .then((data: FeaturedData) => {
          setFeatured(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false); // On error, set loading to false and keep empty sections
        });
    }, []);

  return (
    <div>

    <section className="relative w-full h-[90vh] flex items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4">
      <div className="max-w-4xl text-center space-y-6">
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight">
          Empower Your Operations with AI & Smart Products
        </h1>
        <p className="text-lg font-semibold md:text-xl text-gray-600 dark:text-gray-300">
          Fast, AI-powered diagnostics. Precision product suggestions. Seamless industrial solutions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link href="/resources/get-help" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-semibold rounded shadow-md transition">
            Launch AI Assistant
          </Link>
          <Link href="/products" className="bg-gray-100 dark:bg-white text-blue-700 hover:bg-gray-200 px-8 py-4 font-semibold rounded shadow-md transition">
            Browse Products
          </Link>
        </div>
      </div>
    </section>

    <Carousel />

    <div className="flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {loading ? (
          <div className="mt-16 text-center">Loading featured content...</div>
        ) : (
          <>
            <section className="mt-16 w-full max-w-6xl">
              <h2 className="text-3xl font-bold mb-6 text-center">Top Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featured.categories.length > 0 ? (
                  featured.categories.map((cat) => (
                    <Link key={cat.id} href={`/products?category=${cat.id}`} className="block">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition text-center">
                        {cat.image && <img src={cat.image ? `${process.env.NEXT_PUBLIC_API_URL}${cat.image}` : "@/public/placeholder.png"} alt={cat.name} className="w-full h-40 object-cover rounded-md mb-4" />}
                        <h3 className="text-lg font-semibold">{cat.name}</h3>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500 dark:text-gray-400">No featured categories available.</div>
                )}
              </div>
              <Link href={`/categories`}><h4 className="text-m mb-2 text-right">All Categories</h4></Link>
            </section>

            <section className="mt-16 w-full max-w-6xl">
              <h2 className="text-3xl font-bold mb-6 text-center">Popular Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featured.products.length > 0 ? (
                  featured.products.map((prod) => (
                    <Link key={prod.id} href={`/products/${prod.id}`} className="block">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition text-center">
                        {prod.image && <img src={prod.image ? `${process.env.NEXT_PUBLIC_API_URL}${prod.image}` : "@/public/placeholder.png"} alt={prod.name} className="w-full h-40 object-cover rounded-md mb-4" />}
                        <h3 className="text-lg font-semibold">{prod.name}</h3>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500 dark:text-gray-400">No featured products available.</div>
                )}
              </div>
            </section>

            <section className="mt-16 w-full max-w-6xl">
              <h2 className="text-3xl font-bold mb-6 text-center">Manufacturers</h2>
              <div className="flex flex-wrap justify-center gap-8 bg-gray-50 dark:bg-gray-800 py-4 px-6 rounded-xl shadow-sm">
                {featured.manufacturers.length > 0 ? (
                  featured.manufacturers.map((man) => (
                    <a
                      key={man.id}
                      href={man.website || `/products?manufacturer=${man.id}`}
                      target={man.website ? "_blank" : "_self"}
                      rel={man.website ? "noopener noreferrer" : ""}
                      className="flex flex-col items-center hover:opacity-80 transition"
                    >
                      {man.image ? (
                        <img src={man.image ? `${process.env.NEXT_PUBLIC_API_URL}${man.image}` : "@/public/placeholder.png"} alt={man.name} className="w-20 h-20 object-contain mb-2" />
                      ) : (
                        <span className="text-lg font-semibold">{man.name}</span>
                      )}
                      {man.image && <span className="text-sm">{man.name}</span>}
                    </a>
                  ))
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">No featured manufacturers available.</div>
                )}
              </div>
            </section>
          </>
        )}

        <section className="mt-16 mb-16 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Smart Support</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get tailored advice using advanced AI that understands your needs and problems.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Product Picks</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse relevant products recommended based on your specific issue or question.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Type in your problem, and let our system handle the rest. No searching, no scrolling.
            </p>
          </div>
        </section>

        <section className="mt-22 mb-22 max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Find the Right Fix, Fast
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Struggling with a product issue or need expert advice? Use our AI-powered tool to describe your problem and get personalized solutions — along with curated product recommendations.
          </p>
          <Link href="/resources/get-help" className="text-lg border-2 border-b-blue-300 px-6 py-3 mt-6 shadow-md hover:shadow-lg transition duration-200">
            Get Help Now
          </Link>
        </section>
      </div>
    </div>
  );
}