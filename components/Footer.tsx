

import React from 'react';
import { NAV_LINKS } from '../constants';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-light mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">RoboLearn</h3>
            <p className="text-gray-300 text-sm">Your AI-powered guide to the world of robotics. Learn, build, and share.</p>
          </div>
          <div>
            <h4 className="font-semibold tracking-wider text-gray-200 uppercase mb-4">Quick Links</h4>
            <ul>
              {NAV_LINKS.map(link => (
                <li key={link.name} className="mb-2">
                  <Link to={link.path} className="hover:text-primary transition-colors duration-200">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold tracking-wider text-gray-200 uppercase mb-4">Community</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-primary transition-colors duration-200">Forums</a></li>
              <li className="mb-2"><a href="#" className="hover:text-primary transition-colors duration-200">Leaderboard</a></li>
              <li className="mb-2"><a href="#" className="hover:text-primary transition-colors duration-200">Submit a Project</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold tracking-wider text-gray-200 uppercase mb-4">Subscribe</h4>
            <p className="text-gray-300 text-sm mb-4">Get the latest robotics projects and tutorials delivered to your inbox.</p>
            <form>
              <div className="flex">
                <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded-l-md bg-dark border-secondary text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                <button type="submit" className="bg-primary px-4 py-2 rounded-r-md font-semibold hover:bg-opacity-80 transition-colors">Go</button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} RoboLearn. All Rights Reserved. An Educational Project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
