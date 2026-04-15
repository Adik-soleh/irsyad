'use client';

import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Search, Send, User, MessageCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

type Session = {
  id: string;
  guestName: string;
  guestEmail: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  messages: any[];
  _count?: {
    messages: number;
  };
};

export default function AdminChatPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [guestTyping, setGuestTyping] = useState<{ [key: string]: boolean }>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get token from storage
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Initialize socket when token is available
  useEffect(() => {
    if (!token) return;

    const url = process.env.NEXT_PUBLIC_CHAT_SERVER_URL || 'http://localhost:3001/chat';
    const newSocket = io(url, {
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('admin:join', { token });
    });

    newSocket.on('admin:joined', (data) => {
      setSessions(data.sessions);
    });

    newSocket.on('session:new', (data) => {
      setSessions((prev) => [data.session, ...prev]);
    });

    newSocket.on('session:update', (data) => {
      setSessions((prev) => {
        const updated = [...prev];
        const index = updated.findIndex((s) => s.id === data.sessionId);
        
        if (index !== -1) {
          updated[index].messages = [data.lastMessage];
          updated[index].updatedAt = data.lastMessage.createdAt;
          if (data.lastMessage.senderRole === 'guest' && activeSessionId !== data.sessionId) {
              updated[index]._count = { messages: (updated[index]._count?.messages || 0) + 1 };
          }
          const session = updated.splice(index, 1)[0];
          updated.unshift(session);
        }
        return updated;
      });

      if (data.sessionId === activeSessionId) {
        setChatMessages((prev) => [...prev, data.lastMessage]);
      }
    });

    newSocket.on('session:messages', (data) => {
      if (data.sessionId === activeSessionId) {
        setChatMessages(data.messages);
        setSessions(prev => prev.map(s => 
          s.id === data.sessionId ? { ...s, _count: { messages: 0 } } : s
        ));
      }
    });

    newSocket.on('session:closed', (data) => {
        setSessions(prev => prev.map(s => s.id === data.sessionId ? { ...s, isActive: false } : s));
    });

    newSocket.on('guest:typing', (data) => {
      setGuestTyping((prev) => ({
        ...prev,
        [data.sessionId]: data.isTyping,
      }));
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token, activeSessionId]);

  // Handle active session changes
  useEffect(() => {
     if (socket && activeSessionId && token) {
         socket.emit('admin:join-session', { sessionId: activeSessionId, token });
     }
  }, [activeSessionId, socket, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, guestTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeSessionId || !socket || !token) return;

    socket.emit('admin:message', {
      sessionId: activeSessionId,
      content: inputText.trim(),
      token,
    });
    
    setInputText('');
    socket.emit('admin:typing', { sessionId: activeSessionId, isTyping: false });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (socket && activeSessionId) {
        socket.emit('admin:typing', { sessionId: activeSessionId, isTyping: e.target.value.length > 0 });
    }
  }

  const closeSession = () => {
      if (!activeSessionId || !socket || !token) return;
      if (confirm('Yakin ingin menutup sesi ini?')) {
          socket.emit('admin:close-session', { sessionId: activeSessionId, token });
      }
  }

  const activeSessionDetails = sessions.find((s) => s.id === activeSessionId);

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden bg-white dark:bg-zinc-950 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all duration-300">
      {/* Sidebar - Sessions List */}
      <div className="w-80 flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 flex items-center justify-between">
          <h2 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 italic">
            Active Chats
          </h2>
        </div>

        <div className="p-3">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveSessionId(session.id)}
              className={`w-full p-4 rounded-2xl flex flex-col gap-2 text-left transition-all duration-200 border ${
                activeSessionId === session.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 translate-x-1'
                  : 'bg-white dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
              } ${!session.isActive ? 'grayscale opacity-60' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold text-sm truncate ${activeSessionId === session.id ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                  {session.guestName}
                </span>
                <span className={`text-[10px] ${activeSessionId === session.id ? 'text-blue-100' : 'text-zinc-500'}`}>
                   {session.messages?.[0] ? format(new Date(session.messages[0].createdAt), 'HH:mm') : ''}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs truncate max-w-[200px] ${activeSessionId === session.id ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                  {session.messages?.[0]?.content || 'No messages yet'}
                </span>
                {session._count?.messages ? (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-sm">
                    {session._count.messages}
                  </span>
                ) : null}
              </div>
            </button>
          ))}
          {sessions.length === 0 && (
            <div className="text-center p-8 text-sm text-zinc-500">
              No chat sessions.
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-zinc-950 relative">
        {activeSessionId && activeSessionDetails ? (
           <>
               <div className="h-16 border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center justify-between bg-white dark:bg-zinc-950 shrink-0 z-10 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-sm">
                     <User size={20} />
                   </div>
                   <div>
                     <h2 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-sm">
                       {activeSessionDetails.guestName}
                     </h2>
                     <div className="flex items-center gap-2">
                        {activeSessionDetails.isActive ? (
                            <><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-[10px] text-zinc-500 font-medium">ONLINE</span></>
                        ) : (
                            <><span className="w-2 h-2 rounded-full bg-zinc-400" /><span className="text-[10px] text-zinc-500 font-medium">CLOSED</span></>
                        )}
                        {activeSessionDetails.guestEmail && (
                            <span className="text-[10px] text-zinc-400">· {activeSessionDetails.guestEmail}</span>
                        )}
                     </div>
                   </div>
                 </div>
                 <div className="flex gap-2">
                    {activeSessionDetails.isActive && (
                        <button onClick={closeSession} className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl border border-red-200 dark:border-red-800/50 transition-all hover:scale-105">
                            Close Session
                        </button>
                    )}
                 </div>
               </div>

               <div className="flex-1 p-6 overflow-y-auto bg-zinc-50 dark:bg-[#09090b] custom-scrollbar">
                   <div className="max-w-3xl mx-auto flex flex-col justify-end min-h-full py-4">
                       {chatMessages.map(msg => {
                           const isOwn = msg.senderRole === 'admin';
                           return (
                               <div key={msg.id} className={`flex flex-col mb-6 max-w-[85%] animate-in slide-in-from-bottom-2 duration-300 ${isOwn ? 'self-end items-end' : 'self-start items-start'}`}>
                                   <div className={`flex items-baseline gap-2 mb-1.5 px-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                                       <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{msg.senderName}</span>
                                       <span className="text-[10px] text-zinc-500">{format(new Date(msg.createdAt), 'HH:mm')}</span>
                                   </div>
                                   <div className={`px-5 py-3 rounded-2xl text-sm shadow-sm transition-transform hover:scale-[1.01] ${isOwn ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-tl-none'}`}>
                                       {msg.content}
                                   </div>
                               </div>
                           )
                       })}
                       {guestTyping[activeSessionId] && (
                           <div className="flex items-center gap-2 text-[10px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-full px-4 py-2 self-start w-fit mt-2 animate-bounce">
                               <Loader2 className="w-3 h-3 animate-spin" /> {activeSessionDetails.guestName} is typing...
                           </div>
                       )}
                       <div ref={messagesEndRef} />
                   </div>
               </div>

               <div className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 z-10">
                 <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-3">
                   <div className="relative flex-1">
                     <input
                       type="text"
                       disabled={!activeSessionDetails.isActive}
                       value={inputText}
                       onChange={handleInputChange}
                       onBlur={() => socket?.emit('admin:typing', { sessionId: activeSessionId, isTyping: false })}
                       placeholder={activeSessionDetails.isActive ? "Type your response..." : "Session is closed"}
                       className="w-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all text-sm"
                     />
                   </div>
                   <button
                     type="submit"
                     disabled={!inputText.trim() || !activeSessionDetails.isActive}
                     className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-95"
                   >
                     <Send className="w-5 h-5" />
                   </button>
                 </form>
               </div>
           </>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-[#09090b] transition-colors">
                <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <MessageCircle className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
                </div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">No selected conversation</h3>
                <p className="text-sm">Select a guest from the sidebar to start responding</p>
            </div>
        )}
      </div>
    </div>
  );
}
