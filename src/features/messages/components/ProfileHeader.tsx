import React from 'react';
import { Camera, Edit3 } from 'lucide-react';
import { Card } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import type { User } from '@app-types';

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => (
  <Card>
    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
      <div className="relative w-20 h-20 flex-shrink-0">
        <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl bg-indigo-100" />
        <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-indigo-500 transition-colors">
          <Camera className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
        <p className="text-sm text-slate-500 mt-0.5">{user.email}</p>
        <div className="flex flex-wrap gap-2 mt-2.5">
          <Badge variant="primary" size="sm">
            {user.role}
          </Badge>
          <Badge variant="neutral" size="sm">
            {user.program}
          </Badge>
          <Badge variant="info" size="sm">
            {user.year}
          </Badge>
        </div>
      </div>
      <Button variant="outline" icon={<Edit3 className="w-4 h-4" />}>
        Edit Profile
      </Button>
    </div>
  </Card>
);
