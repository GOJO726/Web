import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import { SearchIcon } from './IconComponents';

interface ProjectGalleryProps {
  projects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const [filters, setFilters] = useState({
    category: 'All',
    difficulty: 'All',
    sortBy: 'newest'
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredProjects = useMemo(() => {
    let tempProjects = [...projects];

    // Category filter
    if (filters.category !== 'All') {
      tempProjects = tempProjects.filter(p => p.category === filters.category);
    }
    // Difficulty filter
    if (filters.difficulty !== 'All') {
      tempProjects = tempProjects.filter(p => p.difficulty === filters.difficulty);
    }
    // Sort
    if (filters.sortBy === 'newest') {
        tempProjects.sort((a, b) => b.id - a.id);
    } else if (filters.sortBy === 'oldest') {
        tempProjects.sort((a, b) => a.id - b.id);
    }

    return tempProjects;
  }, [projects, filters]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Explore Projects</h1>
      <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
        Discover a universe of projects, from simple circuits to complex AI-driven robots. Filter by category or difficulty.
      </p>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-20 z-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:outline-none">
                <option value="All">All Categories</option>
                <option value="Arduino">Arduino</option>
                <option value="Raspberry Pi">Raspberry Pi</option>
                <option value="Robotics">Robotics</option>
                <option value="AI Generated">AI Generated</option>
                <option value="User Submitted">User Submitted</option>
            </select>
            <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:outline-none">
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
             <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary focus:outline-none">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
            </select>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-gray-500">
            <p className="text-xl">No projects found matching your criteria.</p>
            <p>Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;