
import React from 'react';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
}

const PlaceholderIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ErrorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error, prompt }) => {
  const containerClasses = "w-full aspect-square bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-xl flex flex-col justify-center items-center p-6 text-center transition-all duration-300";

  if (isLoading) {
    return (
      <div className={`${containerClasses} animate-pulse`}>
        <div className="w-full h-full bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${containerClasses} border-red-500/50`}>
        <ErrorIcon />
        <h3 className="mt-4 text-lg font-semibold text-red-400">Image Generation Failed</h3>
        <p className="mt-2 text-sm text-gray-400">{error}</p>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="w-full aspect-square bg-black rounded-xl overflow-hidden shadow-2xl shadow-blue-500/10">
        <img 
            src={imageUrl} 
            alt={prompt || "Generated image"}
            className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <PlaceholderIcon />
      <h3 className="mt-4 text-lg font-semibold text-gray-400">Your generated image will appear here</h3>
      <p className="mt-2 text-sm text-gray-500">Provide a description and click "Generate Image" to start.</p>
    </div>
  );
};
