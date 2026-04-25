import React, { useState } from 'react';
import { Mail, Trash2, Archive, Search } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { mockMessages } from '../../mock/data';
import { cn } from '../../utils/cn';

export const Messages: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const filteredMessages = messages.filter((m) =>
    m.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMessage = messages.find((m) => m.id === selectedId);

  const handleDelete = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Messages List */}
      <div className="lg:col-span-1 flex flex-col">
        <div className="space-y-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <Input
            placeholder="Search messages..."
            icon={<Search className="w-4 h-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => setSelectedId(message.id)}
              className={cn(
                'p-4 rounded-lg cursor-pointer transition-all border-2 border-transparent',
                selectedId === message.id
                  ? 'bg-blue-50 border-blue-300'
                  : 'hover:bg-gray-50 bg-white'
              )}
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                  {!message.read && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{message.sender}</p>
                  <p className="text-sm text-gray-600 truncate line-clamp-1">{message.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(message.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2">
        {selectedMessage ? (
          <Card padding="lg" className="h-full flex flex-col">
            <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedMessage.sender}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(selectedMessage.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" icon={<Archive className="w-4 h-4" />} />
                <Button
                  size="sm"
                  variant="danger"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => handleDelete(selectedMessage.id)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900 leading-relaxed">{selectedMessage.content}</p>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <Input placeholder="Type your reply..." className="flex-1" />
              <Button variant="primary" size="md">
                Reply
              </Button>
            </div>
          </Card>
        ) : (
          <Card padding="lg" className="h-full flex items-center justify-center">
            <div className="text-center">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">Select a message to read</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
