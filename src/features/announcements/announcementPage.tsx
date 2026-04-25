import React from 'react';
import { AlertCircle, Bell } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { mockAnnouncements } from '../../mock/data';
import { cn } from '../../utils/cn';

export const Announcements: React.FC = () => {
  const sortedAnnouncements = [...mockAnnouncements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
        <p className="text-gray-600">{sortedAnnouncements.length} announcements</p>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {sortedAnnouncements.map((announcement) => (
          <Card
            key={announcement.id}
            padding="lg"
            hover
            className={cn(announcement.priority === 'high' && 'border-l-4 border-l-red-600')}
          >
            <CardHeader
              title={announcement.title}
              subtitle={`By ${announcement.author} • ${announcement.date}`}
              icon={announcement.priority === 'high' ? <AlertCircle className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
              action={<Badge variant={announcement.priority === 'high' ? 'danger' : 'default'}>{announcement.priority}</Badge>}
            />
            <p className="text-gray-700 mt-4 leading-relaxed">{announcement.content}</p>
            {announcement.courseId && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Badge variant="info">Related to your course</Badge>
              </div>
            )}
          </Card>
        ))}
      </div>

      {sortedAnnouncements.length === 0 && (
        <Card padding="lg" className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No announcements yet</p>
        </Card>
      )}
    </div>
  );
};
