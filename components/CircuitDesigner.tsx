import React, { useState } from 'react';
import { generateCircuitAndCode } from '../services/geminiService';
import { AIGeneratedDesign } from '../types';
import { CircuitIcon, CodeIcon, SparklesIcon } from './IconComponents';

const CircuitDesigner: React.FC = () => {
    const [description, setDescription] = useState('');
    const [generatedDesign, setGeneratedDesign] = useState<AIGeneratedDesign | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!description.trim()) {
            setError('Please enter a description for your project.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedDesign(null);
        try {
            const result = await generateCircuitAndCode(description);
            setGeneratedDesign(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const examplePrompts = [
        "a blinking LED using an Arduino",
        "a distance sensor with a buzzer alarm",
        "a simple light-following robot",
        "a temperature and humidity monitor on a Raspberry Pi"
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="text-center mb-12">
                <CircuitIcon className="mx-auto h-16 w-16 text-primary" />
                <h1 className="text-4xl font-bold text-gray-900 mt-4">AI Design Lab</h1>
                <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
                    Describe your robotics project idea, and our AI will generate a complete circuit diagram, component list, and the necessary code to bring it to life.
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
                <div className="mb-6">
                    <label htmlFor="description" className="block text-lg font-medium text-gray-800 mb-2">
                        What do you want to build?
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        className="w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition"
                        placeholder="e.g., 'An Arduino-based system that waters a plant when the soil is dry.'"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isLoading}
                    />
                     <div className="text-sm text-gray-500 mt-2">
                        Try an example: {examplePrompts.map((prompt, i) => (
                             <button key={i} onClick={() => setDescription(prompt)} className="text-primary hover:underline ml-2">{prompt}</button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Designing...
                        </>
                    ) : (
                        <> <SparklesIcon /> Generate Design </>
                    )}
                </button>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>

            {generatedDesign && (
                <div className="mt-12 animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Circuit Section */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800"><CircuitIcon />Circuit Design</h2>
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg text-primary mb-2">Components</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {generatedDesign.circuit.components.map((c, i) => <li key={i}>{c.quantity}x {c.name}</li>)}
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg text-primary mb-2">Connections</h3>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                {generatedDesign.circuit.connections.map((c, i) => <li key={i}>Connect <b>{c.from}</b> to <b>{c.to}</b> {c.detail}.</li>)}
                            </ol>
                        </div>
                         <div className="mb-6">
                            <h3 className="font-semibold text-lg text-primary mb-2">Explanation</h3>
                            <p className="text-gray-700 whitespace-pre-wrap">{generatedDesign.circuit.explanation}</p>
                        </div>
                    </div>
                    {/* Code Section */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800"><CodeIcon />{generatedDesign.code.language} Code</h2>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                            <code className="text-sm font-mono text-gray-800">{generatedDesign.code.code}</code>
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CircuitDesigner;