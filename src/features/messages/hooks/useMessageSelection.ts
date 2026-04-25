import { useState } from 'react';
import type { Message } from '@types/index';

export const useMessageSelection = (messages: Message[]) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);

  const selected = messages.find(m => m.id === selectedId);
  const unread = messages.filter(m => !m.read).length;

  return { selectedId, setSelectedId, composing, setComposing, selected, unread };
};
