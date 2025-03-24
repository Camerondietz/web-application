import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Navbar from "../components/navbar";

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
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
          <StoreProvider>
            <Navbar />
            {children}
          </StoreProvider>
      </body>
    </html>
  );
}
// count={0} if i needed to initialize data