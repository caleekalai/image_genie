
import React from 'react';
import { Spinner } from './Spinner';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onGenerate, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onGenerate();
    }
  };
  
  return (
    <div className="flex flex-col space-y-4 h-full">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., A majestic lion wearing a crown, cinematic, dramatic light..."
        className="w-full flex-grow p-4 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 resize-none min-h-[150px] sm:min-h-[200px] text-gray-200 placeholder-gray-500"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !prompt}
        className="w-full flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
      >
        {isLoading ? (
          <>
            <Spinner />
            Generating...
          </>
        ) : (
          'Generate Image'
        )}
      </button>
       <p className="text-xs text-center text-gray-500">Pro-tip: Use Ctrl+Enter to generate.</p>
    </div>
  );
};
