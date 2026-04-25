import React, { useState } from 'react';
import { BarChart3, Clock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockQuizzes } from '../../mock/data';
import { cn } from '../../utils/cn';

type FilterStatus = 'all' | 'pending' | 'submitted';

export const Quizzes: React.FC = () => {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filters: { label: string; value: FilterStatus; icon: React.ReactNode }[] = [
    { label: 'All Quizzes', value: 'all', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Pending', value: 'pending', icon: <Clock className="w-4 h-4" /> },
    { label: 'Completed', value: 'submitted', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const filteredQuizzes =
    filter === 'all' ? mockQuizzes : mockQuizzes.filter((q) => (q.submitted ? 'submitted' : 'pending') === filter);

  const getStatusBadge = (submitted: boolean) => {
    return submitted ? (
      <Badge variant="success">Completed</Badge>
    ) : (
      <Badge variant="warning">Pending</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Quizzes</h1>
        <p className="text-gray-600">{filteredQuizzes.length} quizzes available</p>
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

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuizzes.map((quiz) => (
          <Card key={quiz.id} padding="lg" hover>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{quiz.course}</p>
                </div>
                {getStatusBadge(quiz.submitted)}
              </div>

              {/* Quiz Info */}
              <div className="space-y-2 py-3 border-y border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Questions</span>
                  <span className="font-medium text-gray-900">{quiz.questions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time Limit</span>
                  <span className="font-medium text-gray-900">{quiz.timeLimit} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Due Date</span>
                  <span className="font-medium text-gray-900">{quiz.dueDate}</span>
                </div>
              </div>

              {/* Score */}
              {quiz.submitted && quiz.score && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Your Score</span>
                    <span className="text-2xl font-bold text-blue-600">{quiz.score}%</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button fullWidth variant="primary" size="md">
                  {quiz.submitted ? 'Review' : 'Start Quiz'}
                </Button>
                {quiz.submitted && (
                  <button
                    onClick={() => setExpandedId(expandedId === quiz.id ? null : quiz.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    {expandedId === quiz.id ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Show Details
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Details */}
              {expandedId === quiz.id && quiz.submitted && (
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  <p className="text-gray-600">
                    <strong>Completed on:</strong> {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <strong>Status:</strong> Submitted
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <Card padding="lg" className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600">No {filter !== 'all' ? filter : ''} quizzes found</p>
        </Card>
      )}
    </div>
  );
};
