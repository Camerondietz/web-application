"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logoutUser } from "../store/features/auth/authSlice";
import { loadUser } from "../store/features/auth/authSlice";
import type { AppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import { 
  ShoppingCartIcon, 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import { toggleMenu } from "@/store/features/menu/menuSlice";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const cart = useSelector((state: RootState) => state.cart.items);
  const loggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
  const username = useSelector((state: RootState) => state.auth.user);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
        setSearchOpen(false); // Hide mobile search bar on resize
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    setHasMounted(true);
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };
  if (!hasMounted) return null;
//max-w-screen-md limit stretch
  return (
    <header className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-between relative">
      {/* Mobile Menu Icon */}
      <div>
        {mobileOpen ? (
          <XMarkIcon onClick={() => dispatch(toggleMenu())} className="h-6 w-6 cursor-pointer" />
        ) : (
          <Bars3Icon onClick={() => dispatch(toggleMenu())} className="h-6 w-6 cursor-pointer" />
        )}
      </div>

      {/* Logo / Home Link */}
      <Link href="/">
        <h1 className="text-xl font-bold italic font">AVENTREK</h1>
      </Link>

      {/* Desktop Search Bar */}
      <form onSubmit={handleSearch} className="hidden md:flex items-center w-[50%] border border-gray-300 rounded-lg px-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 outline-none flex-1" // Takes up remaining space
        ></input>
        <button onClick={handleSearch} className="p-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </button>
      </form>

      {/* User Authentication */}
      <div>
        {/* Desktop View */}
        <div className="hidden md:flex items-center space-x-2">
          {loggedIn ? (
            <>
              <Link className="px-2" href="/account">
                {username}
              </Link>
              <button className="px-2" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="px-2" href="/login">
                Login
              </Link>
              <Link className="px-2" href="/register">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile View - User Icon */}
        <div className="md:hidden">
          <Link href={loggedIn ? "/account" : "/login"}>
            <UserIcon className="h-6 w-6 cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Cart Icon with Count */}
      <div className="relative">
        <Link href="/cart">
          <ShoppingCartIcon className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
        </Link>
      </div>

      {/* Mobile Search Icon */}
      <div className="md:hidden">
        <MagnifyingGlassIcon 
          onClick={() => setSearchOpen(!searchOpen)} 
          className="h-6 w-6 cursor-pointer" 
        />
      </div>

      {/* Mobile Search Bar (Appears Below Navbar) */}
      {searchOpen && (
        <div className="absolute z-50 top-full left-0 w-full bg-gray-100 dark:bg-gray-800 p-2 border-t shadow-md md:hidden">
          <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-lg px-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 w-full outline-none"
            ></input>
            <button type="submit" className="p-2">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navbar;
