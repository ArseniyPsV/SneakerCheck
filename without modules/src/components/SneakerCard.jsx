import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';

export default function SneakerCard({ item, onAdd }) {
  const [buyPrice, setBuyPrice] = useState('');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!buyPrice || buyPrice <= 0) return;
    onAdd(item, buyPrice);
    setBuyPrice('');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all group animate-in zoom-in-95 duration-300">
      <div className="aspect-square mb-4 overflow-hidden rounded-2xl bg-slate-50 flex items-center justify-center relative">
        <img 
          src={item.image} 
          className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-500" 
          alt={item.name}
        />
        <div className="absolute top-2 right-2 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-[10px] font-black shadow-sm">
          ${item.price}
        </div>
      </div>
      
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.brand}</p>
      <h3 className="font-bold text-sm h-10 mb-4 line-clamp-2">{item.name}</h3>
      
      <div className="flex gap-2">
        <input 
          type="number" 
          placeholder="Buy price" 
          className="w-full bg-slate-50 rounded-xl px-3 py-2 text-sm outline-none border-2 border-transparent focus:border-black transition-all"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
        />
        <button 
          onClick={handleAdd} 
          className={`p-3 rounded-xl transition-all duration-300 ${added ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-slate-800'}`}
        >
          {added ? <Check size={20} /> : <Plus size={20}/>}
        </button>
      </div>
    </div>
  );
}
