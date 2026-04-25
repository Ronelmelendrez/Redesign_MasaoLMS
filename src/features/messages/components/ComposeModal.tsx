import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@components/ui/button';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">New Message</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>
        <div className="p-5 space-y-3">
          <input
            placeholder="To: recipient"
            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
          <input
            placeholder="Subject"
            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
          <textarea
            rows={5}
            placeholder="Write your message…"
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent resize-none"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button icon={<Send className="w-4 h-4" />}>Send Message</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
