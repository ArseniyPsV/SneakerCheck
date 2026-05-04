import React from 'react';

export default function Navbar({ view, setView, count }) {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('browse')}>
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-black text-xl">S</div>
          <span className="font-black text-xl tracking-tighter uppercase">SneakerCheck</span>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl font-bold text-sm">
          <button onClick={() => setView('browse')} className={`px-6 py-2 rounded-lg ${view === 'browse' ? 'bg-white shadow-sm text-black' : 'text-slate-500'}`}>Маркет</button>
          <button onClick={() => setView('collection')} className={`px-6 py-2 rounded-lg ${view === 'collection' ? 'bg-white shadow-sm text-black' : 'text-slate-500'}`}>Коллекция ({count})</button>
        </div>
      </div>
    </nav>
  );
}