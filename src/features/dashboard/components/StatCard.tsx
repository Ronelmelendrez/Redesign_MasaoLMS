import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, sub, color }) => (
  <div className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_2px_8px_rgba(26,92,46,0.06)] p-6 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(26,92,46,0.12)] transition-shadow">
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center flex-shrink-0`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-2xl font-bold text-slate-900 font-display" style={{ fontFamily: 'Fraunces, serif' }}>{value}</p>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-0.5">{label}</p>
      {sub && <p className="text-xs text-[#246b37] font-bold mt-1.5">↑ {sub}</p>}
    </div>
  </div>
);
