'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check initial token and redirect if already logged in
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      localStorage.setItem('admin_token', data.access_token);
      router.push('/admin/dashboard');
    } catch (err) {
      setLoginError('Username atau password salah.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="max-w-md w-full p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-500 animate-in fade-in zoom-in-95">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform rotate-12 hover:rotate-0 transition-transform duration-300">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">
          Admin Portal
        </h2>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-10 font-medium">
          Sign in to manage your portfolio's live chat
        </p>

        {loginError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-3 border border-red-100 dark:border-red-800/50">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest ml-1">
              Username
            </label>
            <input
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-zinc-400"
              placeholder="Enter your username"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest ml-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-zinc-400"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
                Secure administrator access only
            </p>
        </div>
      </div>
    </div>
  );
}
