import React, { useState } from 'react';
import { QUIZ_DATA } from '../constants';
import { CheckCircleIcon } from './IconComponents';

const Quiz: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const isQuizFinished = currentQuestionIndex >= QUIZ_DATA.length;
    const currentQuestion = QUIZ_DATA[currentQuestionIndex];

    const handleSelectAnswer = (answer: string) => {
        if (showFeedback) return;
        setSelectedAnswer(answer);
    };

    const handleSubmitAnswer = () => {
        if (!selectedAnswer) return;

        const correct = selectedAnswer === currentQuestion.correctAnswer;
        if (correct) {
            setScore(prev => prev + currentQuestion.points);
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setShowFeedback(true);
    };
    
    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex(prev => prev + 1);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
    };

    if (isQuizFinished) {
        return (
            <div className="container mx-auto px-4 py-12 text-center animate-fade-in">
                <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800">Quiz Completed!</h2>
                    <p className="text-xl text-gray-600 mt-4">
                        Your final score is:
                    </p>
                    <p className="text-6xl font-bold text-primary my-4">{score}</p>
                    <button 
                        onClick={restartQuiz} 
                        className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900">Robotics Quiz</h1>
                <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
                    Test your knowledge and earn points!
                </p>
            </div>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
                <div className="mb-6">
                    <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {QUIZ_DATA.length}</p>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-2">{currentQuestion.question}</h2>
                </div>

                <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === option;
                        let buttonClass = 'border-gray-300 hover:bg-gray-100';

                        if (showFeedback) {
                            if (option === currentQuestion.correctAnswer) {
                                buttonClass = 'bg-green-200 border-green-500 text-green-800';
                            } else if (isSelected) {
                                buttonClass = 'bg-red-200 border-red-500 text-red-800';
                            }
                        } else if (isSelected) {
                            buttonClass = 'border-primary bg-primary/20 ring-2 ring-primary';
                        }
                        
                        return (
                            <button
                                key={index}
                                onClick={() => handleSelectAnswer(option)}
                                disabled={showFeedback}
                                className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 ${buttonClass}`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
                
                {showFeedback && (
                    <div className={`mt-6 p-4 rounded-md text-center font-semibold ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isCorrect ? 'Correct! 🎉' : 'Not quite. The correct answer is highlighted in green.'}
                    </div>
                )}

                <div className="mt-8">
                    {showFeedback ? (
                        <button
                            onClick={handleNextQuestion}
                            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-90 transition"
                        >
                           Next Question
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmitAnswer}
                            disabled={!selectedAnswer}
                            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Submit Answer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;