import React, { useState } from 'react';
import { Mail, Star, Send, Archive, Trash2, Inbox, PenSquare } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { mockMessages } from '@mock/data';

export const Messages: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);

  const selected = mockMessages.find(m => m.id === selectedId);
  const unread = mockMessages.filter(m => !m.read).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Messages</h1>
          <p className="text-sm text-slate-500 mt-0.5">{unread} unread message{unread !== 1 ? 's' : ''}</p>
        </div>
        <Button icon={<PenSquare className="w-4 h-4" />} onClick={() => setComposing(true)}>Compose</Button>
      </div>

      <div className="flex gap-5 h-[calc(100vh-200px)]">
        {/* List */}
        <Card padding="none" className="w-full md:w-80 flex-shrink-0 flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
            <Inbox className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-bold text-slate-800">Inbox</span>
            {unread > 0 && (
              <span className="ml-auto bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{unread}</span>
            )}
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin divide-y divide-slate-50">
            {mockMessages.map(msg => (
              <button
                key={msg.id}
                onClick={() => setSelectedId(msg.id)}
                className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${selectedId === msg.id ? 'bg-indigo-50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <img src={msg.fromAvatar} alt={msg.from} className="w-9 h-9 rounded-full bg-indigo-100" />
                    {!msg.read && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs truncate ${!msg.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-600'}`}>{msg.from}</span>
                      <span className="text-[10px] text-slate-400 flex-shrink-0">{msg.time}</span>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${!msg.read ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>{msg.subject}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{msg.preview}</p>
                  </div>
                  {msg.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0 mt-0.5" />}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Detail */}
        <div className="hidden md:flex flex-1 flex-col">
          {selected ? (
            <Card padding="none" className="flex-1 flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-slate-900">{selected.subject}</h2>
                  <div className="flex items-center gap-2 mt-1.5">
                    <img src={selected.fromAvatar} alt={selected.from} className="w-5 h-5 rounded-full" />
                    <span className="text-xs text-slate-500">{selected.from}</span>
                    <span className="text-xs text-slate-400">· {selected.time}</span>
                    {!selected.read && <Badge variant="primary" size="sm">New</Badge>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors"><Star className="w-4 h-4" /></button>
                  <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors"><Archive className="w-4 h-4" /></button>
                  <button className="p-2 rounded-xl text-red-400 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <p className="text-sm text-slate-700 leading-relaxed">{selected.body}</p>
              </div>
              <div className="px-5 py-4 border-t border-slate-100">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <input placeholder={`Reply to ${selected.from}…`} className="flex-1 bg-transparent text-sm outline-none text-slate-700 placeholder:text-slate-400" />
                  <Button size="sm" icon={<Send className="w-3.5 h-3.5" />}>Send</Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Mail className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-500 font-semibold">Select a message to read</p>
                <p className="text-xs text-slate-400 mt-1">Choose from your inbox on the left</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Compose modal */}
      {composing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">New Message</h3>
              <button onClick={() => setComposing(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">✕</button>
            </div>
            <div className="p-5 space-y-3">
              <input placeholder="To: recipient" className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent" />
              <input placeholder="Subject" className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent" />
              <textarea rows={5} placeholder="Write your message…" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent resize-none" />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setComposing(false)}>Cancel</Button>
                <Button icon={<Send className="w-4 h-4" />}>Send Message</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};