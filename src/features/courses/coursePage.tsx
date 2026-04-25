import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { mockCourses } from '../../mock/data';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const categories = ['All', 'Computer Science', 'Web Development', 'AI/ML', 'Cloud'];

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeFilter || activeFilter === 'All' || course.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600">{filteredCourses.length} courses available</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <Input
          placeholder="Search courses..."
          icon={<Search className="w-4 h-4" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Filter className="w-4 h-4 text-gray-600 mt-2 mr-2" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(activeFilter === category ? null : category)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeFilter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              padding="lg"
              hover
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              <div className="space-y-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 py-2 border-y border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">Progress</p>
                    <p className="text-lg font-bold text-gray-900">{course.progress}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Modules</p>
                    <p className="text-lg font-bold text-gray-900">{course.modules}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="info">{course.category}</Badge>
                    <Badge variant="gray">{course.students} students</Badge>
                  </div>
                </div>

                <Button fullWidth variant="primary" size="md">
                  Continue Learning
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600">No courses found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};
