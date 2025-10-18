import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RoboLearnLogo } from './IconComponents';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }
  
  handleTryAgain = () => {
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <RoboLearnLogo className="h-16 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h1>
            <p className="text-lg text-gray-600 mb-6">We encountered an unexpected error. Please try again.</p>
            <button
                onClick={this.handleTryAgain}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-opacity-90 transition"
            >
                Try Again
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
