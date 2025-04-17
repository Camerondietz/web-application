"use client";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(systemPrefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow text-xl"
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
      {children}
    </>
  );
}
