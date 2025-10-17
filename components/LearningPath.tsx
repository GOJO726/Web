import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEARNING_STAGES } from '../constants';
import { CheckCircleIcon } from './IconComponents';

const levelColors = {
  BEGINNER: {
    bg: 'bg-gradient-to-br from-violet-50 to-white',
    circle: 'bg-violet-500 text-violet-50',
    text: 'text-violet-600',
    progress: 'bg-violet-500',
  },
  INTERMEDIATE: {
    bg: 'bg-gradient-to-br from-sky-50 to-white',
    circle: 'bg-sky-500 text-sky-50',
    text: 'text-sky-600',
    progress: 'bg-sky-500',
  },
  ADVANCED: {
    bg: 'bg-gradient-to-br from-gray-100 to-white',
    circle: 'bg-gray-500 text-gray-50',
    text: 'text-gray-600',
    progress: 'bg-gray-500',
  },
};

const LearningPath: React.FC = () => {
  const [expandedStage, setExpandedStage] = useState<number | null>(1);
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Your Learning Roadmap</h1>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
        Follow our curated learning paths from beginner to advanced. Complete all topics in a stage to unlock the quiz!
      </p>

      <div className="space-y-4 max-w-4xl mx-auto">
        {LEARNING_STAGES.map((stage, index) => {
          const colors = levelColors[stage.level];
          const isExpanded = expandedStage === stage.id;
          const completedCount = stage.subtopics.filter(t => completedTopics[t.id]).length;
          const totalCount = stage.subtopics.length;
          const isStageComplete = completedCount === totalCount;

          return (
            <div 
              key={stage.id} 
              className={`rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-2xl -translate-y-1' : 'hover:shadow-2xl hover:-translate-y-1'} ${colors.bg}`}
            >
              <div 
                className="p-8 cursor-pointer" 
                onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                role="button"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-3xl ${colors.circle}`}>
                    {stage.id}
                  </div>
                  <div className="flex-grow">
                    <p className={`font-bold tracking-widest uppercase ${colors.text}`}>{stage.level}</p>
                    <h2 className="text-3xl font-bold text-gray-800 mt-1">{stage.title}</h2>
                    <p className="text-gray-600 mt-2">{stage.description}</p>
                  </div>
                </div>
              </div>
              {isExpanded && (
                <div className="px-8 pb-8 animate-fade-in">
                  <div className="bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className={`${colors.progress} h-2.5 rounded-full`} style={{ width: `${(completedCount / totalCount) * 100}%` }}></div>
                  </div>
                  <ul className="space-y-3">
                    {stage.subtopics.map(topic => (
                      <li key={topic.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                        <div className="flex items-center gap-3">
                           <a href={`https://www.youtube.com/watch?v=${topic.videoId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                            <svg className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582,6.186C21.325,5.263,20.738,4.675,19.816,4.418C18.283,4,12,4,12,4S5.717,4,4.184,4.418 C3.262,4.675,2.675,5.263,2.418,6.186C2,7.717,2,12,2,12s0,4.283,0.418,5.814c0.257,0.923,0.844,1.511,1.766,1.768 C5.717,20,12,20,12,20s6.283,0,7.816-0.418c0.922-0.257,1.509-0.845,1.766-1.768C22,16.283,22,12,22,12S22,7.717,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path></svg>
                            <span className="text-gray-700 group-hover:text-primary">{topic.name}</span>
                          </a>
                        </div>
                        <button onClick={() => toggleTopicCompletion(topic.id)} className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full transition ${completedTopics[topic.id] ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                          {completedTopics[topic.id] ? <CheckCircleIcon className="w-4 h-4" /> : <div className="w-3 h-3 border-2 border-gray-500 rounded-full"></div>}
                          {completedTopics[topic.id] ? 'Completed' : 'Mark as Complete'}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {isStageComplete && (
                    <div className="mt-6 text-center bg-green-100 p-4 rounded-lg">
                       <p className="font-semibold text-green-800 mb-3">🎉 Stage Complete! Well done!</p>
                       <Link to="/quiz" className="inline-block bg-primary text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition">
                           Take the Quiz
                       </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default LearningPath;
