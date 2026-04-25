import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, sub, color }) => (
  <div className={`bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center flex-shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      {sub && <p className="text-xs text-emerald-600 font-semibold mt-0.5">{sub}</p>}
    </div>
  </div>
);
