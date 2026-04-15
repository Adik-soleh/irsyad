'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  LogOut, 
  User, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (!savedToken) {
      router.push('/admin-chat'); // Use current login page for now
    } else {
      setToken(savedToken);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin-chat');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Live Chat', href: '/admin/chat', icon: MessageSquare }, // We will move admin-chat here
  ];

  if (!token) return null; // Prevent flicker before redirect

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      {/* Sidebar - Desktop */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } hidden md:flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out z-30`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          {isSidebarOpen && (
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Panel
            </span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <item.icon size={22} className={`${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
                {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-zinc-900/50 z-40 transition-opacity md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)} />
      
      {/* Sidebar - Mobile */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-zinc-900 z-50 transform transition-transform md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800">
          <span className="font-bold text-lg text-blue-600">Admin Panel</span>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl ${
                  isActive ? 'bg-blue-600 text-white' : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header - Mobile Only */}
        <header className="h-16 md:hidden flex items-center justify-between px-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0 z-20">
          <span className="font-bold text-blue-600">Admin</span>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </header>

        {/* Content Router */}
        <main className="flex-1 overflow-y-auto relative z-10 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
