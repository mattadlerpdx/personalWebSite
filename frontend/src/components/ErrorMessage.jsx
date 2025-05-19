import React from 'react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
      <p className="text-red-600 mb-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-red-600 hover:text-red-700 underline focus:outline-none"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage; 