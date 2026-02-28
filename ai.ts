export async function generateProfessionalContent(topic: string, type: string, options: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    أنت كاتب محتوى خبير. المطلوب كتابة ${type === 'article' ? 'مقال رسمي' : type === 'social_post' ? 'منشور تواصل اجتماعي' : 'وصف منتج'}.
    الموضوع: ${topic}.
    الطول المطلوب: ${options.length}.
    النبرة: ${options.tone}.
    اللغة: ${options.lang === 'ar' ? 'العربية' : 'الإنجليزية'}.
    اجعل المحتوى احترافياً، منظماً، وجذاباً.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
