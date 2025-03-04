'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/documents', label: 'Documents', icon: '📚' },
    { href: '/upload', label: 'Upload PDF', icon: '📤' },
    { href: '/chat', label: 'Chat History', icon: '💬' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-4 z-50 p-2 rounded-lg hover:bg-gray-100
          transition-all duration-300
          ${isOpen ? 'left-64 -ml-3' : 'left-4'}
        `}
        aria-label="Toggle Sidebar"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <div className={`
        fixed top-0 left-0 h-screen bg-white border-r
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-0'}
      `}>
        <div className="p-4 overflow-hidden">
          <h2 className="text-xl font-bold text-primary mb-8 whitespace-nowrap">My Million SaaS</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center p-3 rounded-lg transition-colors whitespace-nowrap
                  ${pathname === item.href ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}