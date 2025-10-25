import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for development
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    // Store error details
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Log to error tracking service (Sentry, LogRocket, etc.)
    // if (process.env.NODE_ENV === 'production') {
    //   logErrorToService(error, errorInfo);
    // }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <svg
                className="mx-auto h-24 w-24 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
              Something went wrong
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We're sorry for the inconvenience. The application encountered an unexpected error.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-8 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-2">
                  Error Details (Development Only)
                </summary>
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-64">
                  <p className="text-xs font-mono text-red-600 dark:text-red-400 mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>

              <button
                onClick={() => (window.location.href = '/')}
                className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white font-medium rounded-lg transition-colors duration-200"
              >
                Go to Homepage
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-medium transition-colors duration-200"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
