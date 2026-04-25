import React from 'react';
import { PenSquare } from 'lucide-react';
import { Button } from '@components/ui/button';
import { MessageList, MessageDetail, ComposeModal } from '../components';
import { useMessageSelection } from '../hooks';
import { mockMessages } from '@mock/data';

export const Messages: React.FC = () => {
  const { selectedId, setSelectedId, composing, setComposing, selected, unread } =
    useMessageSelection(mockMessages);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
            Messages
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {unread} unread message{unread !== 1 ? 's' : ''}
          </p>
        </div>
        <Button icon={<PenSquare className="w-4 h-4" />} onClick={() => setComposing(true)}>
          Compose
        </Button>
      </div>

      <div className="flex gap-5 h-[calc(100vh-200px)]">
        <MessageList
          messages={mockMessages}
          selectedId={selectedId}
          unread={unread}
          onSelect={setSelectedId}
        />
        <MessageDetail message={selected} />
      </div>

      <ComposeModal isOpen={composing} onClose={() => setComposing(false)} />
    </div>
  );
};