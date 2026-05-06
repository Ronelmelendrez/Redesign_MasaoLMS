import React, { useState, useRef } from 'react';
import {
  Upload, CheckCircle, Clock, Star, FileText, Trash2, X, ChevronDown
} from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { EmptyState } from '@components/common/emptyState';
import { mockAssignments } from '@mock/data';

type FilterStatus = 'all' | 'pending' | 'submitted' | 'graded';

const statusConfig = {
  pending: { label: 'Pending', variant: 'warning' as const, icon: <Clock className="w-3.5 h-3.5" /> },
  submitted: { label: 'Submitted', variant: 'info' as const, icon: <CheckCircle className="w-3.5 h-3.5" /> },
  graded: { label: 'Graded', variant: 'success' as const, icon: <Star className="w-3.5 h-3.5" /> },
};

const UploadZone: React.FC<{ assignmentId: string }> = ({ assignmentId: _aid }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...dropped]);
  };

  const removeFile = (i: number) => setFiles(prev => prev.filter((_, idx) => idx !== i));

  return (
    <div className="mt-3 space-y-2">
      <div
        className={`drop-zone p-5 flex flex-col items-center justify-center gap-2 cursor-pointer ${dragging ? 'active' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
          <Upload className="w-5 h-5" />
        </div>
        <p className="text-sm font-semibold text-slate-700">Drag & drop files here</p>
        <p className="text-xs text-slate-400">or click to browse · PDF, DOC, ZIP up to 50MB</p>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={e => {
          if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }} />
      </div>
      {files.map((f, i) => (
        <div key={i} className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 truncate">{f.name}</p>
            <p className="text-[11px] text-slate-400">{(f.size / 1024).toFixed(0)} KB</p>
          </div>
          <button onClick={e => { e.stopPropagation(); removeFile(i); }} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      {files.length > 0 && (
        <Button fullWidth icon={<Upload className="w-4 h-4" />}>
          Submit Assignment
        </Button>
      )}
    </div>
  );
};

export const Assignments: React.FC = () => {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = mockAssignments.filter(a => filter === 'all' || a.status === filter);

  const counts = {
    all: mockAssignments.length,
    pending: mockAssignments.filter(a => a.status === 'pending').length,
    submitted: mockAssignments.filter(a => a.status === 'submitted').length,
    graded: mockAssignments.filter(a => a.status === 'graded').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>Assignments</h1>
        <p className="text-sm text-slate-500 mt-0.5">Track and submit your coursework</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {([
          { key: 'pending', label: 'Pending', color: 'bg-amber-50 border-amber-100', textColor: 'text-amber-700', numColor: 'text-amber-600' },
          { key: 'submitted', label: 'Submitted', color: 'bg-cyan-50 border-cyan-100', textColor: 'text-cyan-700', numColor: 'text-cyan-600' },
          { key: 'graded', label: 'Graded', color: 'bg-emerald-50 border-emerald-100', textColor: 'text-emerald-700', numColor: 'text-emerald-600' },
        ] as const).map(s => (
          <button
            key={s.key}
            onClick={() => setFilter(filter === s.key ? 'all' : s.key)}
            className={`rounded-2xl border p-4 text-left transition-all ${s.color} ${filter === s.key ? 'ring-2 ring-offset-1 ring-indigo-400' : ''}`}
          >
            <p className={`text-2xl font-bold ${s.numColor}`}>{counts[s.key]}</p>
            <p className={`text-xs font-semibold mt-0.5 ${s.textColor}`}>{s.label}</p>
          </button>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'submitted', 'graded'] as FilterStatus[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${filter === f ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            {f === 'all' ? `All (${counts.all})` : f}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState title="No assignments here" description="Nothing to show for this filter." />
      ) : (
        <div className="space-y-3">
          {filtered.map(a => {
            const status = statusConfig[a.status as keyof typeof statusConfig];
            const isOverdue = a.status === 'pending' && new Date(a.dueDate) < new Date();
            const isExpanded = expanded === a.id;

            return (
              <Card key={a.id} padding="none" className="overflow-hidden">
                <div
                  className="p-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : a.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{a.courseCode}</span>
                        <Badge variant={status.variant} size="sm" dot>{status.label}</Badge>
                        {isOverdue && <Badge variant="danger" size="sm">Overdue</Badge>}
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm mt-1.5">{a.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{a.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />
                          Due: {new Date(a.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span>{a.points} pts</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {a.grade != null && (
                        <div className="text-right">
                          <p className="text-lg font-bold text-emerald-600">{a.grade}</p>
                          <p className="text-[10px] text-slate-400">/{a.points}</p>
                        </div>
                      )}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{a.description}</p>

                    {a.feedback && (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 mb-3">
                        <p className="text-xs font-bold text-emerald-700 mb-1">Instructor Feedback</p>
                        <p className="text-sm text-emerald-800">{a.feedback}</p>
                      </div>
                    )}

                    {a.submittedAt && (
                      <p className="text-xs text-slate-400 mb-3">
                        Submitted: {new Date(a.submittedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}

                    {a.status === 'pending' && <UploadZone assignmentId={a.id} />}

                    {a.status === 'submitted' && (
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-cyan-600 font-semibold flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5" /> Awaiting grade
                        </p>
                        <Button size="sm" variant="outline" icon={<Trash2 className="w-3.5 h-3.5 text-red-500" />}>
                          Retract
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};