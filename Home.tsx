import React from 'react';
import { Sparkles, Zap, ArrowRight } from "lucide-react";

export default function Home() {
  const login = () => {
    // سيتم ربطها لاحقاً ببروتوكول الدخول
    console.log("Initializing Access...");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200">
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">NURZAO <span className="text-cyan-500 italic">NEXUS</span></span>
          </div>
          <button onClick={login} className="bg-white text-black hover:bg-cyan-400 font-bold px-8 py-2 transition-all rounded-sm">
            ACCESS SYSTEM
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-8">
          <Zap className="w-3 h-3" /> SYSTEM STATUS: OPERATIONAL
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-6 leading-none">
          ARCHITECTING <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">DIGITAL SOVEREIGNTY</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12 font-light">
          High-performance AI engine for elite asset management and strategic domain engineering (Cybxo & Oasfy).
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={login} className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-4 font-bold flex items-center gap-2 transition-all">
            INITIALIZE <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
 
