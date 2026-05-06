import React from 'react';
import { Mail, Star, Send, Archive, Trash2 } from 'lucide-react';
import { Card } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import type { Message } from '@app-types';

interface MessageDetailProps {
  message: Message | undefined;
}

export const MessageDetail: React.FC<MessageDetailProps> = ({ message: selected }) => {
  if (!selected) {
    return (
      <Card className="hidden md:flex flex-1 flex-col items-center justify-center">
        <div className="text-center">
          <Mail className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-semibold">Select a message to read</p>
          <p className="text-xs text-slate-400 mt-1">Choose from your inbox on the left</p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="none" className="hidden md:flex flex-1 flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-slate-900">{selected.subject}</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <img src={selected.fromAvatar} alt={selected.from} className="w-5 h-5 rounded-full" />
            <span className="text-xs text-slate-500">{selected.from}</span>
            <span className="text-xs text-slate-400">· {selected.time}</span>
            {!selected.read && (
              <Badge variant="primary" size="sm">
                New
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors">
            <Star className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors">
            <Archive className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl text-red-400 hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{selected.body}</p>
      </div>
      <div className="px-5 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <input
            placeholder={`Reply to ${selected.from}…`}
            className="flex-1 bg-transparent text-sm outline-none text-slate-700 placeholder:text-slate-400"
          />
          <Button size="sm" icon={<Send className="w-3.5 h-3.5" />}>
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};
