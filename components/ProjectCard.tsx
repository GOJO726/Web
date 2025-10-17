import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const difficultyColor = {
    Beginner: 'bg-green-500',
    Intermediate: 'bg-yellow-500',
    Advanced: 'bg-red-500',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <img className="w-full h-48 object-cover" src={project.image} alt={project.name} />
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-xl text-gray-900">{project.name}</h3>
            <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${difficultyColor[project.difficulty]}`}>
                {project.difficulty}
            </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{project.description}</p>
        <div className="mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="inline-block bg-primary/20 text-primary text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
            View Tutorial
          </a>
          <button className="text-gray-500 hover:text-primary transition-colors">
            Simulate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;