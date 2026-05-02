import React from 'react';
import { format } from 'date-fns';
import { Message } from '../../hooks/useChat';

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const time = format(new Date(message.createdAt), 'HH:mm');
  const isUser = message.role === 'user';
  const label = isUser ? 'Kamu' : 'Adi Bot';

  return (
    <div
      className={`flex flex-col mb-4 max-w-[80%] ${
        isUser ? 'self-end items-end' : 'self-start items-start'
      }`}
    >
      <div className="flex items-baseline space-x-2 mb-1">
        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          {label}
        </span>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
          {time}
        </span>
      </div>
      <div
        className={`px-4 py-2 rounded-2xl text-sm ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-sm'
            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-sm'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
}
