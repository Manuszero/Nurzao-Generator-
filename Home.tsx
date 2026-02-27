import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap, Copy, Download, ArrowRight } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from "react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"article" | "social" | "product">("article");

  const examples = {
    article: {
      title: "Professional Blog Article",
      content: "The Future of Artificial Intelligence in Content Creation\n\nArtificial intelligence is revolutionizing how we create content. From generating compelling headlines to crafting entire articles, AI tools are becoming indispensable for content creators worldwide...",
    },
    social: {
      title: "Engaging Social Media Post",
      content: "🚀 Just launched our new AI-powered content generator! Create professional content in seconds, not hours. Perfect for marketers, writers, and creators. Try it free today! #AI #ContentCreation #Innovation",
    },
    product: {
      title: "Compelling Product Description",
      content: "Experience the power of AI-driven content generation. Our platform uses advanced machine learning to create high-quality, engaging content tailored to your needs. Save time, boost productivity, and elevate your brand.",
    },
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Navigation */}
        <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/nurzao-logo.jpg" alt="Nurzao" className="w-10 h-10 rounded" />
              <span className="text-xl font-bold text-white">Nurzao</span>
            </div>
            <a href={getLoginUrl()}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Create Stunning Content
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                in Seconds
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Harness the power of AI to generate professional, engaging content for any purpose. From blog articles to social media posts, we've got you covered.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href={getLoginUrl()}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2">
                Start Creating Free <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <Button variant="outline" className="border-slate-600 text-slate-200 px-8 py-6 text-lg rounded-lg hover:bg-slate-800">
              Watch Demo
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Generate content in seconds" },
              { icon: Sparkles, title: "AI-Powered", desc: "Advanced machine learning technology" },
              { icon: Copy, title: "Easy to Use", desc: "Simple, intuitive interface" },
            ].map((feature, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 p-6 text-left hover:bg-slate-800/80 transition">
                <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Examples Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">See It In Action</h2>
          
          <div className="flex gap-4 justify-center mb-8">
            {["article", "social", "product"].map((type) => (
              <Button
                key={type}
                variant={activeTab === type ? "default" : "outline"}
                onClick={() => setActiveTab(type as any)}
                className={activeTab === type ? "bg-blue-600" : "border-slate-600"}
              >
                {type === "article" && "Blog Article"}
                {type === "social" && "Social Post"}
                {type === "product" && "Product Description"}
              </Button>
            ))}
          </div>

          <Card className="bg-slate-800/50 border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">{examples[activeTab].title}</h3>
            <p className="text-slate-300 whitespace-pre-wrap mb-6 leading-relaxed">
              {examples[activeTab].content}
            </p>
            <div className="flex gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <Copy className="w-4 h-4" /> Copy
              </Button>
              <Button variant="outline" className="border-slate-600 flex items-center gap-2">
                <Download className="w-4 h-4" /> Download
              </Button>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Card className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/50 p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Content?</h2>
            <p className="text-slate-300 mb-8">Join thousands of creators using Nurzao to generate amazing content.</p>
            <a href={getLoginUrl()}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Get Started Now
              </Button>
            </a>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold mb-4">About Nurzao</h3>
                <p className="text-slate-400 text-sm">AI-powered content generation platform for creators and businesses.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-4">Support</h3>
                <a href="mailto:Nurzao.Ops@gmail.com" className="text-blue-400 hover:text-blue-300 text-sm">
                  Nurzao.Ops@gmail.com
                </a>
              </div>
              <div>
                <h3 className="text-white font-bold mb-4">Quick Links</h3>
                <ul className="text-slate-400 text-sm space-y-2">
                  <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-700/50 pt-8 text-center text-slate-400">
              <p>&copy; 2026 Nurzao. All rights reserved. | Support: Nurzao.Ops@gmail.com</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Authenticated view - redirect to generator
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome, {user?.name}!</h1>
        <p className="text-xl text-slate-600 mb-8">Ready to create amazing content?</p>
        <a href="/generator">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
            Go to Content Generator
          </Button>
        </a>
      </div>
    </div>
  );
}
