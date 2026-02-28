import React from 'react';
import Home from './Home';
import Generator from './Generator';

function App() {
  // نظام بسيط للتنقل بين الصفحات بدون مكتبات خارجية
  const [currentPage, setCurrentPage] = React.useState('home');

  return (
    <div className="dark bg-[#050505] min-h-screen text-white">
      {currentPage === 'home' ? (
        <div onClick={() => setCurrentPage('generator')} className="cursor-pointer">
          <Home />
        </div>
      ) : (
        <div className="pt-10">
          <Generator />
          <button 
            onClick={() => setCurrentPage('home')}
            className="block mx-auto mt-8 text-slate-500 hover:text-cyan-400 transition-all font-mono text-sm"
          >
            [ BACK_TO_NEXUS ]
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
