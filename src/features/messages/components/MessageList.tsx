import React from 'react';
import { Inbox, Star } from 'lucide-react';
import { Card } from '@components/ui/card';
import type { Message } from '@app-types';

interface MessageListProps {
  messages: Message[];
  selectedId: string | null;
  unread: number;
  onSelect: (id: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, selectedId, unread, onSelect }) => (
  <Card padding="none" className="w-full md:w-80 flex-shrink-0 flex flex-col overflow-hidden">
    <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
      <Inbox className="w-4 h-4 text-indigo-600" />
      <span className="text-sm font-bold text-slate-800">Inbox</span>
      {unread > 0 && (
        <span className="ml-auto bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {unread}
        </span>
      )}
    </div>
    <div className="flex-1 overflow-y-auto scrollbar-thin divide-y divide-slate-50">
      {messages.map(msg => (
        <button
          key={msg.id}
          onClick={() => onSelect(msg.id)}
          className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
            selectedId === msg.id ? 'bg-indigo-50' : ''
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={msg.fromAvatar}
                alt={msg.from}
                className="w-9 h-9 rounded-full bg-indigo-100"
              />
              {!msg.read && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span
                  className={`text-xs truncate ${
                    !msg.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-600'
                  }`}
                >
                  {msg.from}
                </span>
                <span className="text-[10px] text-slate-400 flex-shrink-0">{msg.time}</span>
              </div>
              <p
                className={`text-xs truncate mt-0.5 ${
                  !msg.read ? 'font-semibold text-slate-800' : 'text-slate-600'
                }`}
              >
                {msg.subject}
              </p>
              <p className="text-xs text-slate-400 truncate mt-0.5">{msg.preview}</p>
            </div>
            {msg.starred && (
              <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0 mt-0.5" />
            )}
          </div>
        </button>
      ))}
    </div>
  </Card>
);
