"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { closeMenu, fetchCategories, setParentCategory, openMenu } from "@/store/features/menu/menuSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const categories = useSelector((state: RootState) => state.menu.categories);
  const currentParentId = useSelector((state: RootState) => state.menu.currentParentId);
  const loading = useSelector((state: RootState) => state.menu.loading);

  // Fetch categories when sidebar opens or when parent changes
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCategories(currentParentId));
    }
  }, [isOpen, currentParentId, dispatch]);

  // Handle category selection
  const handleCategoryClick = (categoryId: number) => {
    dispatch(setParentCategory(categoryId)); // Set new parent category
  };

  // Handle final category selection
  const handleFinalCategorySelection = (categoryId: number) => {
    dispatch(closeMenu()); // Close sidebar
    router.push(`/products?category=${categoryId}`); // Navigate to category page
  };

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
          <li className="py-2"><Link href="/">Home</Link></li>
          <li className="py-2"><Link href="/products">Products</Link></li>
          <li className="py-2"><Link href="/cart">Cart</Link></li>
          <li className="py-2"><Link href="/account">Account</Link></li>
          <li className="py-2"><Link href="/about">About Us</Link></li>
          <li className="py-2"><Link href="/contact">Contact</Link></li>
        </ul>

        {/* Category Section */}
        {isOpen && (
          <>
            <h2 className="mt-4 text-lg font-bold">
              {currentParentId ? "Subcategories" : "Categories"}
            </h2>
            {loading ? (
              <p className="text-sm text-gray-400">Loading...</p>
            ) : (
              <ul className="mt-2">
                {categories.map((category: { id: number; name: string; has_subcategories: boolean }) => (
                  <li
                    key={category.id}
                    className="py-2 cursor-pointer hover:bg-gray-700 px-2"
                    onClick={() =>
                      category.has_subcategories
                        ? handleCategoryClick(category.id)
                        : handleFinalCategorySelection(category.id)
                    }
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
