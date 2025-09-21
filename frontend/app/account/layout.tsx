'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const accountLinks = [
  { name: 'Account Details', href: '/account' },
  { name: 'Orders', href: '/account/orders' },
  { name: 'Addresses', href: '/account/addresses' },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      <aside className="w-full md:w-64 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Account Menu</h2>
        <nav className="flex flex-col space-y-2">
          {accountLinks.map((link) => {
            const isActive = pathname === link.href;
            const baseClasses = 'py-2 px-4 rounded-lg font-medium transition';
            const activeClasses = 'bg-blue-500 text-white';
            const inactiveClasses = 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800';

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
