import React, { useState, useEffect } from 'react';
// Fix: Replaced Routes with Switch for react-router-dom v5 compatibility.
import { HashRouter, Switch, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import LearningPath from './components/LearningPath';
import ProjectGallery from './components/ProjectGallery';
import CircuitDesigner from './components/CircuitDesigner';
import CodeEditor from './components/CodeEditor';
import PublishProject from './components/PublishProject';
import AdBanner from './components/AdBanner';
import { MOCK_PROJECTS } from './constants';
import { Project } from './types';
import Quiz from './components/Quiz';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// New HomePage component to aggregate all sections
const HomePage: React.FC<{ projects: Project[] }> = ({ projects }) => (
    <>
        <Hero />
        <div className="space-y-16 md:space-y-24">
            <section id="learn-preview">
                <LearningPath />
            </section>
            <section id="projects-preview" className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Featured Projects</h1>
                 <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                    Get inspired by what others have built. Here are some of our favorite projects.
                 </p>
                 <ProjectGallery projects={projects.slice(0, 3)} />
                 <div className="text-center mt-8">
                    <Link to="/projects" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition">
                        View All Projects
                    </Link>
                 </div>
            </section>
            <section id="design-preview">
                <CircuitDesigner />
            </section>
            <section id="code-preview">
                <CodeEditor />
            </section>
        </div>
    </>
);


const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const handlePublishProject = (newProject: Project) => {
    setProjects(prevProjects => [newProject, ...prevProjects]);
  };

  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-light text-secondary font-sans transition-colors duration-300">
          <Header />
          <main className="flex-grow">
            <AdBanner type="header" />
            <ErrorBoundary>
              {/* Fix: Replaced Routes with Switch and updated Route syntax for v5 */}
              <Switch>
                <Route exact path="/">
                  <HomePage projects={projects} />
                </Route>
                <Route exact path="/learn">
                  <LearningPath />
                </Route>
                <Route exact path="/projects">
                  <ProjectGallery projects={projects} />
                </Route>
                <Route exact path="/quiz">
                  <Quiz />
                </Route>
                <Route exact path="/design">
                  <CircuitDesigner />
                </Route>
                <Route exact path="/code">
                  <CodeEditor />
                </Route>
                <Route exact path="/publish">
                  <ProtectedRoute>
                    <PublishProject onPublish={handlePublishProject} />
                  </ProtectedRoute>
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
              </Switch>
            </ErrorBoundary>
          </main>
          <AdBanner type="footer" />
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;