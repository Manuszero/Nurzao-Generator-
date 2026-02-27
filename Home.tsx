import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from "react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"article" | "social" | "product">("article");

  const examples = {
    article: {
      title: "Strategic Asset: CYBXO",
      content: "CYBXO represents the pinnacle of cyber-logic integration. As a premium digital asset, it provides the definitive interface for automated security and high-frequency data sovereignty...",
    },
    social: {
      title: "OASFY Narrative",
      content: "Tranquility meets efficiency. OASFY is re-engineering the logistics of calm. The ultimate domain for streamlined operations. #Oasfy #NurzaoNexus",
    },
    product: {
      title: "The Nurzao Protocol",
      content: "An elite-grade intelligence engine designed for commanding digital assets. Precise. Authoritative. Sovereign.",
    },
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-cyan-500/30">
        <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">NURZAO <span className="text-cyan-500 italic">NEXUS</span></span>
            </div>
            <Button onClick={() => window.location.href = getLoginUrl()} className="bg-white text-black hover:bg-cyan-400 font-bold px-8 transition-all">
              ACCESS SYSTEM
            </Button>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-8 animate-pulse">
            <Zap className="w-3 h-3" /> SYSTEM STATUS: OPERATIONAL
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tightest mb-6 leading-none">
            ARCHITECTING <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">DIGITAL SOVEREIGNTY</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12 font-light">
            High-performance AI engine for elite asset management and strategic narrative engineering.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => window.location.href = getLoginUrl()} className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 h-14 font-bold rounded-none">
              INITIALIZE <ArrowRight className="ml-2" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
       <div className="text-center">
          <h1 className="text-3xl font-black text-white italic mb-6 uppercase">Welcome Node, {user?.name}</h1>
          <Button onClick={() => window.location.href = '/generator'} className="bg-white text-black hover:bg-cyan-400 font-bold px-12 h-14 rounded-none">
            ENTER GENERATOR
          </Button>
       </div>
    </div>
  );
}
