import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap, Copy, Download, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from "react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"article" | "social" | "product">("article");

  const examples = {
    article: {
      title: "Strategic Asset Analysis: CYBXO",
      content: "CYBXO represents the pinnacle of cyber-logic integration. In an era of shifting digital boundaries, CYBXO serves as a definitive interface for automated security protocols and high-frequency data sovereignty...",
    },
    social: {
      title: "Executive Narrative: OASFY",
      content: "Tranquility meets efficiency. OASFY is re-engineering the logistics of calm. Where others see complexity, we see a seamless oasis of streamlined operations. #LogisticsSovereignty #Oasfy #NurzaoNexus",
    },
    product: {
      title: "The Nurzao Protocol",
      content: "An elite-grade intelligence engine designed for those who command digital assets. Precise. Authoritative. Sovereign. Transforming raw potential into market dominance.",
    },
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-cyan-500/30 font-sans">
        {/* Navigation */}
        <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">NURZAO <span className="text-cyan-500">NEXUS</span></span>
            </div>
            <Button 
              onClick={() => window.location.href = getLoginUrl()} 
              className="bg-white text-black hover:bg-cyan-400 transition-all duration-300 font-bold px-8 rounded-none tracking-widest"
            >
              ACCESS SYSTEM
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent -z-10" />
          
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono tracking-[0.2em] mb-12 uppercase animate-pulse">
              <Zap className="w-3 h-3" /> System Status: Operational // Sovereignty Confirmed
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tightest mb-8 leading-[0.9]">
              ARCHITECTING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">DIGITAL SOVEREIGNTY</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-12 tracking-wide">
              The elite-tier intelligence engine for strategic narrative engineering and high-end asset valuation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                size="lg" 
                onClick={() => window.location.href = getLoginUrl()} 
                className="h-14 px-10 bg-cyan-600 hover:bg-cyan-500 text-white rounded-none font-bold text-lg group transition-all"
              >
                INITIALIZE GENERATION <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
              <div className="flex items-center gap-4 text-slate-500 font-mono text-sm tracking-tighter">
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-cyan-500" /> ENCRYPTED</span>
                <span className="flex items-center gap-1"><Globe className="w-4 h-4 text-cyan-500" /> GLOBAL REACH</span>
              </div>
            </div>
          </div>
        </main>

        {/* Intelligence Preview Section */}
        <section className="py-24 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Intelligence Output <br/><span className="text-cyan-500">Architecture</span></h2>
                <div className="space-y-4">
                  {(['article', 'social', 'product'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left p-6 transition-all border ${activeTab === tab ? 'bg-cyan-500/10 border-cyan-500/50 text-white' : 'bg-transparent border-white/5 text-slate-500 hover:border-white/20'}`}
                    >
                      <span className="text-xs font-mono uppercase tracking-widest block mb-1">0{tab === 'article' ? 1 : tab === 'social' ? 2 : 3}</span>
                      <span className="text-xl font-bold capitalize">{tab.replace('_', ' ')} Logic</span>
                    </button>
                  ))}
                </div>
              </div>

              <Card className="bg-[#0a0a0a] border-white/10 p-8 rounded-none shadow-2xl relative">
                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-cyan-500/50">NODE: 2026_NURZAO</div>
                <h3 className="text-cyan-500 font-mono text-sm mb-6 uppercase tracking-widest">{examples[activeTab].title}</h3>
                <div className="space-y-4 text-slate-300 leading-relaxed font-light italic">
                  {examples[activeTab].content.split('\\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="text-cyan-500 w-6 h-6" />
                  <span className="text-xl font-black text-white tracking-tighter italic">NURZAO</span>
                </div>
                <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
                  The ultimate intelligence nexus for digital asset command and narrative authority.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.3em]">Support Node</h3>
                <a href="mailto:Nurzao.Ops@gmail.com" className="text-cyan-500 hover:text-cyan-400 font-mono text-sm underline decoration-cyan-500/30">
                  Nurzao.Ops@gmail.com
                </a>
              </div>
              <div className="text-right">
                <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.3em]">Legal</h3>
                <ul className="text-slate-500 text-sm space-y-3 font-mono">
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">PRIVACY_PROTOCOL</a></li>
                  <li><a href="#" className="hover:text-cyan-400 transition-colors">TERMS_OF_SOVEREIGNTY</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-slate-600 text-[10px] font-mono tracking-widest">
                &copy; 2026 NURZAO INTELLIGENCE NEXUS. ALL RIGHTS RESERVED. // ACCESS_ID: {user?.openId || 'GUEST_NODE'}
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Authenticated view - redirect to generator
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
       <div className="text-center animate-pulse">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/50">
            <Sparkles className="text-cyan-500 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-widest mb-2 italic uppercase">Welcome, {user?.name}</h1>
          <p className="text-cyan-500 font-mono text-xs tracking-[0.5em] mb-8">NEXUS CONNECTION ESTABLISHED</p>
          <Button 
            onClick={() => window.location.href = '/generator'} 
            className="bg-white text-black hover:bg-cyan-400 font-bold px-12 h-14 rounded-none tracking-widest"
          >
            ENTER GENERATOR
          </Button>
       </div>
    </div>
  );
}
 
