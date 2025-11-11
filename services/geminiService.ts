
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch('/api/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'An unexpected server error occurred.' }));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    if (data.imageUrl) {
      return data.imageUrl;
    } else {
      throw new Error("Image generation failed: No image URL received from server.");
    }
  } catch (error) {
    console.error("Error calling generation service:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
};
