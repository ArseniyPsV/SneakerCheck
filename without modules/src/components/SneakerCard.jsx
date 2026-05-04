import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function SneakerCard({ item, onAdd }) {
  const [buyPrice, setBuyPrice] = useState('');

  const handleAdd = () => {
    if (!buyPrice) return alert('Введите цену покупки');
    onAdd(item, buyPrice);
    setBuyPrice('');
  };

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="aspect-square mb-4 overflow-hidden rounded-2xl bg-slate-50 flex items-center justify-center">
        <img src={item.image} className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform" />
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase">{item.brand}</p>
      <h3 className="font-bold text-sm h-10 mb-4">{item.name}</h3>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-slate-400">Market</span>
        <span className="font-black text-lg">${item.price}</span>
      </div>
      <div className="flex gap-2">
        <input 
          type="number" 
          placeholder="$ Купил за" 
          className="w-full bg-slate-50 rounded-xl p-2 text-sm outline-none border border-transparent focus:border-black"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-black text-white p-3 rounded-xl hover:bg-slate-800"><Plus size={20}/></button>
      </div>
    </div>
  );
}