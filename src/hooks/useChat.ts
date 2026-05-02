import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

type HistoryItem = { role: 'user' | 'assistant'; content: string };

const STORAGE_KEY = 'chat_history';

export function useChat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const guestNameRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_CHAT_SERVER_URL;
    if (!base) return;
    const url = base.endsWith('/chat') ? base : `${base}/chat`;
    const newSocket = io(url, {
      autoConnect: false,
      withCredentials: true,
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onTyping = (data: { typing: boolean }) => setIsTyping(data.typing);
    const onReply = (data: { content: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.content,
          createdAt: new Date().toISOString(),
        },
      ]);
    };
    const onError = (data: { message: string }) => {
      console.error('Chat error:', data.message);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat:typing', onTyping);
    socket.on('chat:reply', onReply);
    socket.on('chat:error', onError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat:typing', onTyping);
      socket.off('chat:reply', onReply);
      socket.off('chat:error', onError);
    };
  }, [socket]);

  const connect = useCallback(
    (guestName?: string) => {
      guestNameRef.current = guestName;
      if (!socket) return;
      if (!socket.connected) socket.connect();
    },
    [socket],
  );

  const disconnect = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!socket || !content.trim()) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        createdAt: new Date().toISOString(),
      };

      const history: HistoryItem[] = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      setMessages((prev) => [...prev, userMsg]);

      if (!socket.connected) socket.connect();

      socket.emit('chat:message', {
        content,
        history: history.slice(0, -1),
        guestName: guestNameRef.current,
      });
    },
    [socket, messages],
  );

  const clearHistory = useCallback(() => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return {
    isConnected,
    messages,
    isTyping,
    connect,
    disconnect,
    sendMessage,
    clearHistory,
  };
}
