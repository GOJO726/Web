import React, { useState } from 'react';
import { checkCodeForErrors } from '../services/geminiService';
import { CodeIcon, SparklesIcon } from './IconComponents';

const CodeEditor: React.FC = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('Arduino (C++)');
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleCheckCode = async () => {
        if (!code.trim()) {
            setError('Please enter some code to check.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setFeedback('');
        try {
            const result = await checkCodeForErrors(code, language);
            setFeedback(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="text-center mb-12">
                <CodeIcon className="mx-auto h-16 w-16 text-primary" />
                <h1 className="text-4xl font-bold text-gray-900 mt-4">AI Code Assistant</h1>
                <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
                    Write your code for Arduino or Python, and our AI assistant will check for errors, suggest improvements, and provide helpful hints.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Your Code</h2>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="p-2 bg-gray-100 border border-transparent rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                        >
                            <option>Arduino (C++)</option>
                            <option>Python</option>
                        </select>
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder={`// Paste your ${language} code here...`}
                        className="w-full h-96 p-4 font-mono text-sm bg-gray-100 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                    />
                     <button
                        onClick={handleCheckCode}
                        disabled={isLoading}
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing...
                            </>
                        ) : (
                            <> <SparklesIcon /> Check for Errors </>
                        )}
                    </button>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">AI Feedback</h2>
                    <div className="w-full h-[30rem] p-4 bg-gray-100 rounded-md overflow-y-auto prose prose-sm max-w-none">
                        {feedback ? (
                            <div dangerouslySetInnerHTML={{ __html: feedback.replace(/```(\w+)?\n/g, '<pre><code>').replace(/```/g, '</code></pre>') }} />
                        ) : (
                            <p className="text-gray-500">Your feedback will appear here...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;