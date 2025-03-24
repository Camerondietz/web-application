'use client'
//import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../store/features/counter/counterSlice";
import { RootState } from "../store/store";
//import { Button } from "@/components/ui/button";
//import Link from "next/link";
//import { Carousel } from "@/components/carousel";

export default function Home() {

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>

        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <section className="rounded bg-neutral-100 py-8 sm:py-12">
            <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
              <div className="max-w-md space-y-4">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Welcome to My Ecommerce
                </h2>
                <p className="text-neutral-600">
                  Discover the latest products at the best prices.
                </p>
                <br></br>
                <button className="text-neutral-600"
                  onClick={() => dispatch(increment())}
                >Increment</button>
                <br></br>
                <span className="text-neutral-600">{count}</span>
                <br></br>
                <button className="text-neutral-600"
                  onClick={() => dispatch(decrement())}
                >Decrement</button>
                <br></br>
                <button className="text-neutral-600"
                  onClick={() => dispatch(incrementByAmount(2))}
                >Increment by 2</button>
                </div>

            </div>
          </section>
          <section className="py-8">

          </section>
        </div>
      </main>
    </div>
  );
}
