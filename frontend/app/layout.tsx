import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Navbar from "../components/navbar";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
//import ThemeProvider from "@/components/ThemeProvider"; <ThemeProvider>
//import { ErrorWrapper } from "./error-wrapper";

export const metadata: Metadata = {
  title: {
    default: "E-commerce store",
    template: "%s | E-commerce store"
  },
  description: "Quality products at great prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scheme-light">
      <body className="min-h-screen flex flex-col h-full bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <StoreProvider>
            <Navbar />
            <Sidebar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
