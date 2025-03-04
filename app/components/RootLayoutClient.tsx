'use client';

import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== '/';

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <main className={`flex-1 transition-all duration-300 ${showSidebar ? 'ml-64' : ''}`}>
        {children}
      </main>
    </div>
  );
}