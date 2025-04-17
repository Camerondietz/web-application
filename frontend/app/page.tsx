'use client'
//import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
//import { decrement, increment, incrementByAmount } from "../store/features/counter/counterSlice";
import { RootState } from "../store/store";
//import { Button } from "@/components/ui/button";
//import Link from "next/link";
//import { Carousel } from "@/components/carousel";

export default function Home() {

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <header className="bg-gray-100 dark:bg-gray-800 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-700 dark:text-gray-300">Dashboard</h1>

        </div>
      </header>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <section className="max-w-4xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Find the Right Fix, Fast
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Struggling with a product issue or need expert advice? Use our AI-powered tool to describe your problem and get personalized solutions — along with curated product recommendations.
        </p>
        <Link href="/resources/get-help"  className="text-lg border-2 border-b-blue-300 px-6 py-3 mt-4 shadow-md hover:shadow-lg transition duration-200">
            Get Help Now
        </Link>
      </section>

      <section className="mt-16 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <section className="rounded bg-gray-100 dark:bg-gray-800 py-8 sm:py-12">
            <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
              <div className="max-w-md space-y-4 items-center" >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Welcome to My Ecommerce
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                Explore our extensive range of high-quality products designed to power your business forward. From cutting-edge networking components and industrial automation systems to essential industrial tools and safety equipment, we provide the solutions you need to keep your operations running smoothly. Whether you're looking to optimize efficiency, enhance safety, or scale your infrastructure, our products and expertise are here to help you achieve your goals with confidence. Shop now for reliable, high-performance solutions that drive success.
                <br></br>
                Your industrial success starts here.
                </p>
                <br></br>
                <Link href="/products" className="text-gray-700 dark:text-gray-300"
                >Search our Products</Link>
                <br></br>
                </div>

            </div>
          </section>
          <section className="py-8">

          </section>
        </div>
      </div>
    </div>
  );
}
                /*
                <span className="text-gray-700 dark:text-gray-300">{count}</span>
                <br></br>
                <button className="text-gray-700 dark:text-gray-300"
                  onClick={() => dispatch(decrement())}
                >Decrement</button>
                <br></br>
                <button className="text-gray-700 dark:text-gray-300"
                  onClick={() => dispatch(incrementByAmount(2))}
                >Increment by 2</button>*/