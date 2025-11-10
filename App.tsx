
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { Footer } from './components/Footer';
import { generateImage } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const generatedImageUrl = await generateImage(prompt);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 flex flex-col">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-100">Describe Your Image</h2>
            <p className="text-gray-400 mb-6">Enter a detailed prompt to generate a unique image with the power of Gemini.</p>
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerateImage}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:w-2/3">
            <ImageDisplay 
              imageUrl={imageUrl} 
              isLoading={isLoading} 
              error={error} 
              prompt={prompt}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
