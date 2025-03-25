"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logoutUser } from "../store/features/auth/authSlice";
import type { AppDispatch } from "../store/store";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toggleMenu } from "@/store/features/menu/menuSlice";

const Navbar = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
  const username = useSelector((state: RootState) => state.auth.user);
  //const cart = useSelector((state: RootState) => state.cart);
          //<span className="ml-4">Cart ({cart.items.length})</span>

    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    //const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setMobileOpen(false);
        }
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

      const dispatch = useDispatch<AppDispatch>();
    
      const handleLogout = () => {
        dispatch(logoutUser());
      };
  
  return (
    <header className="p-4 bg-white text-gray-800 flex justify-between">
      <div>
      {mobileOpen ? (
              <XMarkIcon onClick={() => dispatch(toggleMenu())} className="h-6 w-6" />
            ) : (
              <Bars3Icon onClick={() => dispatch(toggleMenu())} className="h-6 w-6" />
            )}
      </div>
      
      <Link href="/">
        <h1 className="text-xl font-bold">Home</h1>
      </Link>

      <div>
            {loggedIn ? (
              //<AdminPanel />
              <div>
              <a className="px-2">{username}</a>
              <button className="px-2" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              //<LoginForm />
              <div>
                <Link className="px-2" href="/login">Login</Link>
                <Link className="px-2" href="/register">register</Link>
              </div>
            )}
      </div>

      <div>
        <Link href="/cart">
        <ShoppingCartIcon className="h-6 w-6" />
        </Link>
      </div>


    </header>
  );
};

export default Navbar;
/* for the sidebar
      <div>
        <Link href="/cart">
        <ShoppingCartIcon className="h-6 w-6" />
        <div className="navbar-icon group"> 
          <ShoppingCartIcon />
          <span className="navbar-tooltip group-hover:scale-100">
              helpful info
          </span>
        </div>
        </Link>
      </div>
*/