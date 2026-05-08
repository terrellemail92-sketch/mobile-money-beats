import { GoogleGenAI } from '@google/genai';

export const generateBeatBreakdown = async (title: string, tags: string[]): Promise<string> => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    return "Breakdown unavailable — check back soon.";
  }
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  try {
    const prompt = `
      You are Skimp, the lead producer for Mobile Money. Write a short, gritty, and engaging "Sample Breakdown" (max 2 paragraphs) for a loop/pack titled "${title}" with the following tags: ${tags.join(', ')}.
      Describe the creative process, the raw instruments used (mentioning FL Studio Mobile vibes, hard-hitting drums, or chopped samples), and the overall energy. 
      Keep it professional but authentic to the underground beatmaker scene. Appeal to artists and producers looking to buy stems and loops for placements.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [{ text: prompt }]
      },
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Breakdown unavailable at this time.";
  } catch (error) {
    console.error("Error generating beat breakdown:", error);
    return "Failed to load sample breakdown. Please try again later.";
  }
};
