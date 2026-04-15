'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Mail, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useChat } from '../../hooks/useChat';
import { ChatBubble } from '../molecules/ChatBubble';

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    isConnected,
    sessionId,
    messages,
    isTyping,
    connect,
    sendMessage,
    setTypingStatus,
  } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // If the widget is opened and there is a session ID in localStorage, try reconnecting
    if (isOpen && !sessionId && !isConnected) {
       const existingSession = localStorage.getItem('chat_session_id');
       if (existingSession && guestName) {
           connect(guestName, guestEmail);
       }
    }
  }, [isOpen, sessionId, isConnected, connect, guestName, guestEmail]);


  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      connect(guestName.trim(), guestEmail.trim());
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
      setTypingStatus(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    setTypingStatus(e.target.value.length > 0);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-colors z-50 flex items-center justify-center group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Live Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Optional notification badge if unread messages are tracked locally later */}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Live Chat
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Tanya langsung ke Adik Soleh
                </p>
              </div>
            </div>

            {/* Content area */}
            {!sessionId ? (
              // Pre-chat form
              <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                <div className="mb-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Halo! Ada yang bisa dibantu?
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Silakan isi nama kamu untuk memulai obrolan.
                  </p>
                </div>

                <form onSubmit={handleStartChat} className="space-y-4 mt-auto">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 ml-1">
                      Nama <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-zinc-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                        placeholder="Nama kamu"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 ml-1">
                      Email (Opsional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-zinc-400" />
                      </div>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!guestName.trim()}
                    className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                  >
                    Mulai Chat
                  </button>
                </form>
              </div>
            ) : (
              // Active chat layout
              <>
                <div className="flex-1 p-4 overflow-y-auto bg-zinc-50 dark:bg-[#09090b]">
                   {messages.length === 0 && (
                      <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 my-8">
                         Tanya seputar project, skill, atau hal lainnya!
                      </div>
                   )}
                  <div className="flex flex-col min-h-full justify-end">
                    {messages.map((msg) => (
                      <ChatBubble
                        key={msg.id}
                        message={msg}
                        isOwnMessage={msg.senderRole === 'guest'}
                      />
                    ))}
                    {isTyping && (
                      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full px-3 py-1.5 self-start w-fit">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Admin is typing...
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={handleInputChange}
                      onBlur={() => setTypingStatus(false)}
                      placeholder="Ketik pesan..."
                      className="flex-1 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-100"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim()}
                      className="p-2 rounded-full bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 transition-colors flex flex-shrink-0 items-center justify-center"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
