import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Chat | Adik Soleh Portfolio',
  description: 'Live chat admin panel',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans antialiased text-zinc-900 dark:text-zinc-100">
      {children}
    </div>
  );
}
