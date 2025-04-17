"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { closeMenu, fetchCategories, setParentCategory, fetchManufacturers } from "@/store/features/menu/menuSlice";
import { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  // Redux hooks for categories
  const categories = useSelector((state: RootState) => state.menu.categories);
  const currentParentId = useSelector((state: RootState) => state.menu.currentParentId);
  // Redux hooks for manufacturers
  const manufacturers = useSelector((state: RootState) => state.menu.manufacturers);
  //const currentManufacturerParentId = useSelector((state: RootState) => state.menu.currentManufacturerParentId);
  const loading = useSelector((state: RootState) => state.menu.loading);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [showCategories, setShowCategories] = useState(false);
  const [showManufacturers, setShowManufacturers] = useState(false);

  // Fetch categories when sidebar opens or when parent changes
  useEffect(() => {
    if (showCategories && isOpen) {
      dispatch(fetchCategories(currentParentId));
    }
  }, [showCategories, isOpen, currentParentId, dispatch]);

  // Fetch manufacturers when toggled
useEffect(() => {
  if (showManufacturers && isOpen) {
    dispatch(fetchManufacturers());
  }
}, [showManufacturers, dispatch, isOpen]);


  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        dispatch(closeMenu());
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, dispatch]);

  // Close sidebar when navigating
  const handleRouteClick = (path: string) => {
    dispatch(closeMenu());
    router.push(path);
  };

  const toggleCategories = () => {
    setShowCategories((prev) => {
      if (!prev) setShowManufacturers(false); // Close manufacturers if opening categories
      return !prev;
    });
  };
  
  const toggleManufacturers = () => {
    setShowManufacturers((prev) => {
      if (!prev) setShowCategories(false); // Close categories if opening manufacturers
      return !prev;
    });
  };
  

  return (
    <>
      {/* Overlay - Click to Close */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-40" onClick={() => dispatch(closeMenu())} />
      )}

      {/* Sidebar */}
      <motion.div
        ref={sidebarRef}
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-screen w-64 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg z-50"
      >
        <button
          onClick={() => dispatch(closeMenu())}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
        >
          <X size={24}></X>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold">Menu</h2>
          <ul className="mt-4">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "Cart", path: "/cart" },
              { name: "Account", path: "/account" },
              { name: "AI Tool", path: "/resources/get-help" },
              { name: "About Us", path: "/about" },
              { name: "Contact", path: "/contact" }
            ].map((item) => (
              <li 
              key={item.path} 
              className="py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-2"
              onClick={() => handleRouteClick(item.path)}
              >{item.name}</li>
            ))}
          </ul>

          {/*  Section */}
          {isOpen && (
            <>
              {/* Category Section */}
              <div className="mt-6">
                <button 
                  onClick={() => toggleCategories()}
                  className="text-left w-full font-semibold text-lg"
                >
                  {showCategories ? "Hide Categories" : "Show Categories"}
                </button>

                {showCategories && (
                  loading ? (
                    <p className="text-sm text-gray-400">Loading...</p>
                  ):(
                    <ul className="mt-2">
                      {currentParentId && (
                        <div className="justify-between">
                          <button onClick={() => dispatch(setParentCategory(null))}
                            className="py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-2">
                            ← Back to Categories
                          </button>
                          <button onClick={() => handleRouteClick(`/products?category=${currentParentId}`)}
                          className="py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-2">
                            See all
                          </button>
                        </div>
                      )}
                      
                      {categories.map((category: { id: number; name: string; has_subcategories: boolean }) => (
                        <li
                          key={category.id}
                          className="py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-2"
                          onClick={() =>
                            category.has_subcategories
                              ? dispatch(setParentCategory(category.id))
                              : handleRouteClick(`/products?category=${category.id}`)
                          }
                        >{category.name}</li>
                      ))}
                    </ul>
                  )
                )}
              </div>

              {/* Manufacturer Section */}
              <div className="mt-6">
                <button 
                  onClick={() => toggleManufacturers()}
                  className="text-left w-full font-semibold text-lg"
                >
                  Manufacturers
                </button>

                {showManufacturers && (
                  <>
                    <h2 className="mt-2 text-lg font-bold">
                    </h2>
                    <ul className="mt-2">
                      {manufacturers.map((manufacturer: {id:number; name: string}) => (
                        <li
                          key={manufacturer.id}
                          className="py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-2"
                          onClick={() =>
                            handleRouteClick(`/products?manufacturer=${manufacturer.id}`)
                          }
                        >
                          {manufacturer.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
