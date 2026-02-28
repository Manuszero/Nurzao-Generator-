import React, { useState } from "react";
import { Copy, Download, Loader2, Sparkles, Trash2, FileText, Share2, ShoppingBag } from "lucide-react";
import { generateProfessionalContent } from "./ai"; // تأكد أن ملف ai.ts محدث

export default function Generator() {
  const [contentType, setContentType] = useState<"article" | "social_post" | "product_description">("article");
  const [topic, setTopic] = useState("");
  const [contentLength, setContentLength] = useState<"short" | "medium" | "long">("medium");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("ar");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("الرجاء إدخال الموضوع أولاً");
      return;
    }

    setIsLoading(true);
    try {
      // نرسل كل الخيارات للدالة في ملف ai.ts
      const result = await generateProfessionalContent(topic, contentType, {
        length: contentLength,
        tone: tone,
        lang: language
      });
      setGeneratedContent(result);
    } catch (error) {
      alert("فشل في توليد المحتوى. تأكد من إعدادات المفتاح.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    alert("تم النسخ إلى الحافظة!");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `nurzao-content-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 font-sans antialiased text-right" dir="rtl">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black text-white flex items-center gap-3 justify-end">
          NURZAO CONTENT GENERATOR <Sparkles className="text-cyan-500" />
        </h1>
        <p className="text-slate-400">نظام ذكاء اصطناعي لإنتاج المقالات والمحتوى التسويقي</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-6 bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-3">نوع المحتوى</label>
            <div className="grid grid-cols-1 gap-2">
              <button onClick={() => setContentType("article")} className={`p-3 rounded-lg flex items-center gap-3 transition-all ${contentType === 'article' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
                <FileText size={18} /> مقال رسمي
              </button>
              <button onClick={() => setContentType("social_post")} className={`p-3 rounded-lg flex items-center gap-3 transition-all ${contentType === 'social_post' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
                <Share2 size={18} /> منشور اجتماعي
              </button>
              <button onClick={() => setContentType("product_description")} className={`p-3 rounded-lg flex items-center gap-3 transition-all ${contentType === 'product_description' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
                <ShoppingBag size={18} /> وصف منتج
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">طول المحتوى</label>
            <select value={contentLength} onChange={(e: any) => setContentLength(e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-lg text-white outline-none focus:border-cyan-500">
              <option value="short">قصير</option>
              <option value="medium">متوسط</option>
              <option value="long">طويل</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">اللغة</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-lg text-white outline-none">
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* Input & Output Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
            <label className="block text-sm font-bold text-slate-300 mb-3">عن ماذا تريد أن نكتب؟</label>
            <textarea
              className="w-full bg-black border border-white/10 p-4 rounded-xl text-white min-h-[150px] outline-none focus:border-cyan-500 transition-all text-right"
              placeholder="مثال: أهمية الأمن السيبراني في عام 2026..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full mt-4 bg-white text-black font-black py-4 rounded-xl hover:bg-cyan-500 hover:text-white transition-all flex justify-center items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "توليد المحتوى الآن"}
            </button>
          </div>

          {generatedContent && (
            <div className="bg-[#0d0d0d] p-6 rounded-2xl border border-white/10 relative group">
              <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                <div className="flex gap-2">
                  <button onClick={handleCopy} title="Copy" className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"><Copy size={18} /></button>
                  <button onClick={handleDownload} title="Download" className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"><Download size={18} /></button>
                </div>
                <span className="text-xs font-mono text-cyan-500">NURZAO_OUTPUT_V1.0</span>
              </div>
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap font-sans text-lg">
                {generatedContent}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 
