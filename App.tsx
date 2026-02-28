import React, { useState } from 'react';
import Home from './Home';
import Generator from './Generator';

export default function App() {
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {view === 'home' ? (
        <div onClick={() => setView('generator')} className="cursor-pointer">
          <Home />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-10">
          <button 
            onClick={() => setView('home')}
            className="mb-8 text-cyan-500 hover:text-white transition-colors font-mono"
          >
            ← BACK_TO_SYSTEM
          </button>
          <Generator />
        </div>
      )}
    </div>
  );
}
