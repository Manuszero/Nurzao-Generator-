import { GoogleGenerativeAI } from "@google/generative-ai";

// استخدام المفتاح من إعدادات Netlify
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_FORGE_API_KEY || "");

export async function generateProfessionalContent(topic: string, type: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompts: Record<string, string> = {
    article: `اكتب مقالاً رسمياً واحترافياً حول: ${topic}. استخدم لغة رصينة، عناوين فرعية، ومقدمة وخاتمة قوية.`,
    social: `اكتب محتوى إبداعي لمنصات التواصل الاجتماعي حول: ${topic}. اجعله جذاباً، قصيراً، ويتضمن هاشتاقات قوية وCall to Action.`,
    product: `اكتب وصفاً تسويقياً مقنعاً للمنتج: ${topic}. ركز على الفوائد، القيمة المضافة، ولغة تبيع العاطفة قبل المنتج.`
  };

  const selectedPrompt = prompts[type] || prompts.article;
  const result = await model.generateContent(selectedPrompt);
  const response = await result.response;
  return response.text();
}
