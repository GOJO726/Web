import React, { useState } from 'react';
import { Project } from '../types';
import { CheckCircleIcon } from './IconComponents';

interface PublishProjectProps {
  onPublish: (project: Project) => void;
}

const PublishProject: React.FC<PublishProjectProps> = ({ onPublish }) => {
  const [name, setName] = useState('');
  const [description, setDescription] =useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;

    const newProject: Project = {
      id: Date.now(),
      name,
      description,
      image: imageUrl || `https://picsum.photos/seed/${Date.now()}/400/300`,
      category: 'User Submitted',
      difficulty: 'Intermediate', // Default difficulty
      tags: ['Community', 'DIY'],
      url: projectUrl,
    };

    onPublish(newProject);
    
    // Reset form and show success message
    setName('');
    setDescription('');
    setImageUrl('');
    setProjectUrl('');
    setIsPublished(true);
    setTimeout(() => setIsPublished(false), 5000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Publish Your Project</h1>
            <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
                Share your creation with the RoboVerse community! Fill out the form below to add your project to our gallery.
            </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
            {isPublished ? (
                <div className="text-center p-8 animate-fade-in">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">Project Published Successfully!</h2>
                    <p className="text-gray-600 mt-2">Your project is now live in the gallery. Thank you for contributing!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
                        <input
                            type="text"
                            id="projectName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                        <input
                            type="url"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700">Project/Tutorial URL (Optional)</label>
                        <input
                            type="url"
                            id="projectUrl"
                            value={projectUrl}
                            onChange={(e) => setProjectUrl(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Publish Project
                        </button>
                    </div>
                </form>
            )}
        </div>
    </div>
  );
};

export default PublishProject;