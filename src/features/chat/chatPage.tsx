import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { mockChatMessages, mockUser } from '../../mock/data';
import { cn } from '../../utils/cn';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        senderId: mockUser.id,
        senderName: 'You',
        content: newMessage,
        timestamp: new Date().toISOString(),
        avatar: mockUser.avatar,
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Chat Room</h1>
        <p className="text-gray-600">Data Structures & Algorithms Discussion</p>
      </div>

      {/* Chat Container */}
      <Card padding="lg" className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-4">
          {messages.map((message) => {
            const isOwn = message.senderId === mockUser.id;
            return (
              <div key={message.id} className={cn('flex gap-3', isOwn && 'flex-row-reverse')}>
                {!isOwn && (
                  <img
                    src={message.avatar}
                    alt={message.senderName}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                )}
                <div className={cn('flex flex-col gap-1', isOwn && 'items-end')}>
                  <p className="text-xs font-medium text-gray-600">{message.senderName}</p>
                  <div
                    className={cn(
                      'max-w-xs px-4 py-2 rounded-lg',
                      isOwn
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
                alt="Typing"
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex gap-2">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
