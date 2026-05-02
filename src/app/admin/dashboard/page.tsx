'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Users, 
  Clock, 
  ArrowRight, 
  TrendingUp,
  MessageCircle,
  Mail,
  Calendar,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

type DashboardStats = {
  activeSessions: number;
  unreadCount: number;
  totalSessions: number;
};

type RecentSession = {
  id: string;
  guestName: string;
  guestEmail: string | null;
  updatedAt: string;
  _count?: {
    messages: number;
  };
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentSessions, setRecentSessions] = useState<RecentSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        if (!token) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch Stats
        const [activeRes, unreadRes, totalRes] = await Promise.all([
          fetch(`${apiUrl}/admin/sessions/active`, { headers }),
          fetch(`${apiUrl}/admin/unread-count`, { headers }),
          fetch(`${apiUrl}/admin/sessions`, { headers })
        ]);

        const activeData = await activeRes.json();
        const unreadData = await unreadRes.json();
        const totalData = await totalRes.json();

        setStats({
          activeSessions: activeData.length,
          unreadCount: unreadData.count || 0,
          totalSessions: totalData.length
        });

        // Set recent sessions (first 5 from total)
        setRecentSessions(totalData.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const statCards = [
    { 
      label: 'Active Chats', 
      value: stats?.activeSessions || 0, 
      icon: MessageSquare, 
      color: 'bg-blue-500', 
      desc: 'Currently ongoing conversations' 
    },
    { 
      label: 'Unread Messages', 
      value: stats?.unreadCount || 0, 
      icon: Mail, 
      color: 'bg-amber-500', 
      desc: 'Messages waiting for reply' 
    },
    { 
      label: 'Total Sessions', 
      value: stats?.totalSessions || 0, 
      icon: Users, 
      color: 'bg-indigo-500', 
      desc: 'Total historical chat sessions' 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Welcome back, Admin</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Here's what's happening with your portfolio chat.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                <stat.icon size={24} />
              </div>
              <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</span>
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">{stat.label}</p>
              <p className="text-xs text-zinc-500 mt-1">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <h2 className="font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Recent Sessions
            </h2>
            <Link href="/admin/chat" className="text-sm font-medium text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {recentSessions.map((session) => (
              <div key={session.id} className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{session.guestName}</p>
                    <p className="text-xs text-zinc-500">{session.guestEmail || 'No email provided'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500 flex items-center gap-1 justify-end">
                    <Calendar size={12} />
                    {format(new Date(session.updatedAt), 'MMM dd, HH:mm')}
                  </p>
                  {session._count?.messages ? (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold rounded-full">
                      {session._count.messages} new
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
            {recentSessions.length === 0 && (
              <p className="p-8 text-center text-sm text-zinc-500">No sessions recorded yet.</p>
            )}
          </div>
        </div>

        {/* Quick Actions / Integration Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <MessageCircle size={160} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Live Chat Panel</h2>
            <p className="text-blue-100 mb-6 text-sm max-w-xs">
              Open the dedicated chat interface to reply to guests in real-time.
            </p>
            <Link 
              href="/admin/chat" 
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg"
            >
              Go to Chat Panel
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
             <h3 className="font-bold mb-4 flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-green-500" />
               Current Status
             </h3>
             <ul className="space-y-3 text-sm">
               <li className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                 <span className="text-zinc-500">Chat Server</span>
                 <span className="text-green-500 font-medium">Online</span>
               </li>
               <li className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                 <span className="text-zinc-500">Database</span>
                 <span className="text-green-500 font-medium">Connected</span>
               </li>
               <li className="flex justify-between py-2">
                 <span className="text-zinc-500">Environment</span>
                 <span className="font-medium">Development</span>
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
