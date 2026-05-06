import React from 'react';
interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
    {stats.map(s => (
      <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
        <div>
          <p className="text-lg font-bold text-slate-900">{s.value}</p>
          <p className="text-xs text-slate-500">{s.label}</p>
        </div>
      </div>
    ))}
  </div>
);
