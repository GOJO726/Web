import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="bg-light py-20 sm:py-24 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-sm mb-4 animate-slide-in-up">
          ⚡️ Your Complete Robotics Learning Hub
        </div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl animate-slide-in-up" style={{ animationDelay: '100ms' }}>
          Learn, Design & Build
        </h1>
        <div className="mt-6 h-2 w-40 bg-primary mx-auto rounded-full animate-slide-in-up" style={{ animationDelay: '200ms' }}></div>
        <p className="mt-8 max-w-3xl mx-auto text-lg text-gray-600 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
          Master robotics with hands-on projects, interactive design tools, and a complete learning roadmap. From Arduino to Raspberry Pi - build, simulate, and share your creations with the community.
        </p>
        <div className="mt-10 flex justify-center gap-4 animate-slide-in-up" style={{ animationDelay: '400ms' }}>
          <Link
            to="/learn"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-opacity-90 transition transform hover:scale-105 shadow-lg"
          >
            Start Learning Free →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;