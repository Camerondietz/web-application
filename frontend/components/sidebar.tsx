"use client";
import { useSelector, useDispatch } from "react-redux";
import { closeMenu } from "@/store/features/menu/menuSlice";
import { RootState } from "@/store/store";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white shadow-lg z-50"
    >
      <button
        onClick={() => dispatch(closeMenu())}
        className="absolute top-4 right-4 text-white"
      >
        <X size={24} />
      </button>
      <div className="p-6">
        <h2 className="text-xl font-bold">Menu</h2>
        <ul className="mt-4">
          <li className="py-2"><a href="/">Home</a></li>
          <li className="py-2"><a href="/products">Products</a></li>
          <li className="py-2"><a href="/cart">Cart</a></li>
          <li className="py-2"><a href="/account">Account</a></li>
        </ul>
      </div>
    </motion.div>
  );
}
