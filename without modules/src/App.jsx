import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SneakerCard from './components/SneakerCard';
import Collection from './components/Collection';

const MOCK_DATA = [
  { 
    id: 1, 
    name: 'Jordan 4 Retro Military Blue', 
    brand: 'Jordan', 
    price: 215, 
    image: 'https://placehold.jp/24/3b82f6/ffffff/400x400.png?text=Jordan+4+Military' 
  },
  { 
    id: 2, 
    name: 'Nike Dunk Low Panda', 
    brand: 'Nike', 
    price: 110, 
    image: 'https://placehold.jp/24/1e293b/ffffff/400x400.png?text=Nike+Dunk+Panda' 
  },
  { 
    id: 3, 
    name: 'Adidas Yeezy Boost 350 V2', 
    brand: 'Adidas', 
    price: 230, 
    image: 'https://placehold.jp/24/854d0e/ffffff/400x400.png?text=Yeezy+350+V2' 
  },
  { 
    id: 4, 
    name: 'New Balance 2002R Protection', 
    brand: 'New Balance', 
    price: 180, 
    image: 'https://placehold.jp/24/475569/ffffff/400x400.png?text=NB+2002R' 
  }
];

export default function App() {
  const [view, setView] = useState('browse');
  const [search, setSearch] = useState('');
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('snkr_db');
    if (saved) setCollection(JSON.parse(saved));
  }, []);

  const addToCollection = (item, buyPrice) => {
    const updated = [...collection, { ...item, buyPrice: Number(buyPrice), date: new Date().toLocaleDateString() }];
    setCollection(updated);
    localStorage.setItem('snkr_db', JSON.stringify(updated));
  };

  const remove = (idx) => {
    const updated = collection.filter((_, i) => i !== idx);
    setCollection(updated);
    localStorage.setItem('snkr_db', JSON.stringify(updated));
  };

  const filtered = MOCK_DATA.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar view={view} setView={setView} count={collection.length} />
      <main className="max-w-6xl mx-auto p-6">
        {view === 'browse' ? (
          <>
            <div className="relative mb-8">
              <input 
                type="text" 
                placeholder="Поиск моделей..." 
                className="w-full p-4 rounded-2xl border-none shadow-sm outline-none focus:ring-2 focus:ring-black text-lg bg-white" 
                onChange={(e) => setSearch(e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map(item => (
                <SneakerCard key={item.id} item={item} onAdd={addToCollection} />
              ))}
            </div>
          </>
        ) : (
          <Collection items={collection} onRemove={remove} />
        )}
      </main>
    </div>
  );
}