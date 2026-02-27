import { GoogleGenerativeAI } from "@google/generative-ai";

// جلب المفتاح من Netlify
const genAI = new GoogleGenerativeAI(process.env.FORGE_API_KEY || "");

export async function generateStrategicContent(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // إضافة "روح نورزاو" للبرومبت تلقائياً
    const enhancedPrompt = `
      As the Nurzao Intelligence Engine, generate high-end strategic content for: ${prompt}.
      Tone: Authoritative, Technical, Elite, Sovereign.
    `;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Fallback: System connectivity issues. Use templates for now.";
  }
}
