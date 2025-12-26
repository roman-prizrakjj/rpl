
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDailyFanTask = async (userName: string, level: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a unique, fun daily task for a football fan named ${userName} who is level ${level} in the RPL (Russian Premier League) Fan Passport app. 
                 The task should be engaging and help them earn XP. 
                 Provide a JSON response with title, description, and xpReward (between 100 and 500).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            xpReward: { type: Type.NUMBER }
          },
          required: ["title", "description", "xpReward"]
        }
      }
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating fan task:", error);
    return null;
  }
};
