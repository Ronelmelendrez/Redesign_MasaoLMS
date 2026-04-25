import { useMemo } from 'react';
import type { Quiz } from '@types/index';

export const useQuizFilters = (quizzes: Quiz[]) => {
  const available = useMemo(() => quizzes.filter(q => q.status === 'available'), [quizzes]);
  const upcoming = useMemo(() => quizzes.filter(q => q.status === 'upcoming'), [quizzes]);
  const completed = useMemo(() => quizzes.filter(q => q.status === 'completed'), [quizzes]);

  return { available, upcoming, completed };
};
