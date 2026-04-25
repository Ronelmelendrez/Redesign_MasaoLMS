import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockAssignments } from '../../mock/data';
import { cn } from '../../utils/cn';

type FilterStatus = 'all' | 'pending' | 'submitted' | 'graded';

export const Assignments: React.FC = () => {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [dragActive, setDragActive] = useState(false);

  const filters: { label: string; value: FilterStatus; icon: React.ReactNode }[] = [
    { label: 'All', value: 'all', icon: <FileText className="w-4 h-4" /> },
    { label: 'Pending', value: 'pending', icon: <Clock className="w-4 h-4" /> },
    { label: 'Submitted', value: 'submitted', icon: <CheckCircle className="w-4 h-4" /> },
    { label: 'Graded', value: 'graded', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  const filteredAssignments =
    filter === 'all' ? mockAssignments : mockAssignments.filter((a) => a.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'submitted':
        return <Badge variant="info">Submitted</Badge>;
      case 'graded':
        return <Badge variant="success">Graded</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'submitted':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'graded':
        return <AlertCircle className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        <p className="text-gray-600">{filteredAssignments.length} assignments to manage</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              filter === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            {f.icon}
            {f.label}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} padding="lg" hover>
            <div className="flex items-start gap-4">
              <div className="pt-1">{getStatusIcon(assignment.status)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{assignment.course}</p>
                  </div>
                  {getStatusBadge(assignment.status)}
                </div>

                {/* Assignment Details */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Due Date: {assignment.dueDate}</span>
                    {assignment.submittedAt && (
                      <span className="text-green-600">Submitted: {assignment.submittedAt}</span>
                    )}
                  </div>

                  {assignment.grade && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Grade</span>
                        <span className="text-2xl font-bold text-green-600">{assignment.grade}%</span>
                      </div>
                    </div>
                  )}

                  {assignment.feedback && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Feedback</p>
                      <p className="text-sm text-gray-600 mt-1">{assignment.feedback}</p>
                    </div>
                  )}

                  {assignment.status === 'pending' && (
                    <div
                      onDragEnter={() => setDragActive(true)}
                      onDragLeave={() => setDragActive(false)}
                      onDragOver={(e) => e.preventDefault()}
                      className={cn(
                        'border-2 border-dashed rounded-lg p-6 text-center transition-all',
                        dragActive
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                      )}
                    >
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Drag and drop your file here, or{' '}
                        <button className="text-blue-600 hover:underline">browse</button>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <Card padding="lg" className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No {filter !== 'all' ? filter : ''} assignments found</p>
        </Card>
      )}
    </div>
  );
};
