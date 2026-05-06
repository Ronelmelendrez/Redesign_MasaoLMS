import React from 'react';
import { User } from 'lucide-react';
import { Card, CardHeader } from '@components/ui/card';
import type { User as UserType } from '@app-types';

interface AccountInfoProps {
  user: UserType;
}

export const AccountInfo: React.FC<AccountInfoProps> = ({ user }) => (
  <Card>
    <CardHeader title="Account Information" icon={<User className="w-4 h-4" />} />
    <div className="space-y-3">
      {[
        { label: 'Full Name', value: user.name },
        { label: 'Email', value: user.email },
        { label: 'Program', value: user.program },
        { label: 'Year Level', value: user.year },
        { label: 'Role', value: user.role },
      ].map(f => (
        <div key={f.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
          <span className="text-xs font-medium text-slate-500">{f.label}</span>
          <span className="text-sm font-semibold text-slate-800">{f.value}</span>
        </div>
      ))}
    </div>
  </Card>
);
