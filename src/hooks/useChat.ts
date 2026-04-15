import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export type Message = {
  id: string;
  content: string;
  senderRole: 'guest' | 'admin';
  senderName: string;
  createdAt: string;
};

export function useChat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Determine the socket URL. For local dev, use the backend port.
    // In production, you would point to the deployed Render backend URL.
    const url = process.env.NEXT_PUBLIC_CHAT_SERVER_URL || 'http://localhost:3001/chat';
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
    if (!socket) return;

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('guest:joined', (data) => {
      setSessionId(data.sessionId);
      if (data.messages) {
        setMessages(data.messages);
      }
    });

    socket.on('new:message', (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    socket.on('admin:typing', (data) => {
      setIsTyping(data.isTyping);
    });

    socket.on('session:closed', () => {
      setSessionId(null);
      setMessages([]);
      localStorage.removeItem('chat_session_id');
      socket.disconnect();
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('guest:joined');
      socket.off('new:message');
      socket.off('admin:typing');
      socket.off('session:closed');
    };
  }, [socket]);

  const connect = useCallback((guestName: string, guestEmail?: string) => {
    if (!socket) return;

    socket.connect();
    
    // Check if there's an existing session in local storage
    const existingSessionId = localStorage.getItem('chat_session_id');

    socket.emit('guest:join', {
      guestName,
      guestEmail,
      sessionId: existingSessionId,
    }, (response: any) => {
      if (response && response.sessionId) {
        setSessionId(response.sessionId);
        localStorage.setItem('chat_session_id', response.sessionId);
      }
    });
  }, [socket]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }
  }, [socket]);

  const sendMessage = useCallback((content: string) => {
    if (!socket || !sessionId) return;

    socket.emit('guest:message', {
      sessionId,
      content,
    });
  }, [socket, sessionId]);

  const setTypingStatus = useCallback((typing: boolean) => {
    if (!socket || !sessionId) return;

    socket.emit('guest:typing', {
      sessionId,
      isTyping: typing,
    });
  }, [socket, sessionId]);

  return {
    isConnected,
    sessionId,
    messages,
    isTyping,
    connect,
    disconnect,
    sendMessage,
    setTypingStatus,
  };
}
