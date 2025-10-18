import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RoboLearnLogo } from './IconComponents';
import { NAV_LINKS } from '../constants';
import { AuthContext } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-light/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <RoboLearnLogo className="h-9 w-auto" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  {/* Fix: Updated NavLink for react-router-dom v5 compatibility */}
                  exact={link.path === '/'}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 text-gray-700 hover:bg-primary/20"
                  activeClassName="bg-primary text-white"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="relative ml-4">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-primary transition">
                  <img className="h-8 w-8 rounded-full" src={user.avatar} alt="User avatar" />
                </button>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700">Signed in as <span className="font-medium">{user.name}</span></div>
                    <a href="#" onClick={(e) => { e.preventDefault(); logout(); setIsProfileOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:block ml-4 px-4 py-2 rounded-md text-sm font-medium text-primary border border-primary hover:bg-primary/10 transition-colors">
                Login
              </Link>
            )}
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                {/* Fix: Updated NavLink for react-router-dom v5 compatibility */}
                exact={link.path === '/'}
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 text-gray-700 hover:bg-primary/20"
                activeClassName="bg-primary text-white"
              >
                {link.name}
              </NavLink>
            ))}
             {!user && (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/20">
                    Login
                </Link>
             )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;