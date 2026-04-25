import React, { useState, useRef, useEffect } from 'react';
import { Send, Hash, Users, Smile, Paperclip, MoreHorizontal } from 'lucide-react';
import { mockChatMessages, mockUser } from '../../mock/data';

interface ChatMsg {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  text: string;
  time: string;
  isMe: boolean;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMsg[]>(mockChatMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [activeRoom, setActiveRoom] = useState('cs301-general');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    const t = setTimeout(() => setTyping(true), 3000);
    const t2 = setTimeout(() => setTyping(false), 6000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: ChatMsg = {
      id: String(Date.now()),
      userId: mockUser.id,
      name: mockUser.name,
      avatar: mockUser.avatar,
      text: input.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    inputRef.current?.focus();
  };

  const rooms = [
    { id: 'cs301-general', label: 'CS301 General', course: 'CS301', active: 3 },
    { id: 'cs315-general', label: 'CS315 General', course: 'CS315', active: 1 },
    { id: 'cs320-general', label: 'CS320 General', course: 'CS320', active: 5 },
    { id: 'general', label: 'All Students', course: null, active: 12 },
  ];

  return (
    <div className="h-[calc(100vh-112px)] flex gap-5">
      {/* Rooms sidebar */}
      <div className="hidden md:flex flex-col w-56 flex-shrink-0 bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-4 py-4 border-b border-slate-100">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chat Rooms</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all ${
                activeRoom === room.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Hash className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">{room.label}</p>
              </div>
              <span className={`text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                activeRoom === room.id ? 'bg-indigo-200 text-indigo-700' : 'bg-emerald-100 text-emerald-600'
              }`}>{room.active}</span>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-slate-100">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50">
            <img src={mockUser.avatar} alt={mockUser.name} className="w-6 h-6 rounded-full bg-indigo-100 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700 truncate">{mockUser.name.split(' ')[0]}</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <p className="text-[10px] text-emerald-600">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-white flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Hash className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {rooms.find(r => r.id === activeRoom)?.label}
              </p>
              <p className="text-xs text-slate-500">
                {rooms.find(r => r.id === activeRoom)?.active} members online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
              <Users className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-4">
          {messages.map((msg, idx) => {
            const prevMsg = messages[idx - 1];
            const showAvatar = !prevMsg || prevMsg.userId !== msg.userId;

            return (
              <div key={msg.id} className={`flex items-end gap-2.5 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className="w-7 h-7 flex-shrink-0">
                  {showAvatar && (
                    <img src={msg.avatar} alt={msg.name} className="w-7 h-7 rounded-full bg-indigo-100" />
                  )}
                </div>

                {/* Bubble */}
                <div className={`flex flex-col gap-0.5 max-w-[72%] sm:max-w-[60%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                  {showAvatar && !msg.isMe && (
                    <span className="text-[11px] font-semibold text-slate-500 ml-1">{msg.name}</span>
                  )}
                  <div className={`px-4 py-2.5 text-sm leading-relaxed ${
                    msg.isMe
                      ? 'bubble-right bg-gradient-to-br from-indigo-500 to-indigo-600 text-white'
                      : 'bubble-left bg-slate-100 text-slate-800'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mx-1">{msg.time}</span>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {typing && (
            <div className="flex items-end gap-2.5">
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex-shrink-0 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlo" alt="typing" className="w-full h-full" />
              </div>
              <div className="px-4 py-3 bg-slate-100 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[10px] text-slate-400">Carlo is typing…</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="flex-shrink-0 px-4 py-3 border-t border-slate-100 bg-white">
          <div className="flex items-center gap-2 bg-slate-50 rounded-2xl border border-slate-200 px-3 py-2 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Type a message…"
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none min-w-0"
            />
            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0">
              <Smile className="w-4 h-4" />
            </button>
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 hover:bg-indigo-500 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};