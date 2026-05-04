import React from 'react';
import { Trash2 } from 'lucide-react';

export default function Collection({ items, onRemove }) {
  const marketVal = items.reduce((a, b) => a + b.price, 0);
  const paidVal = items.reduce((a, b) => a + b.buyPrice, 0);
  const profit = marketVal - paidVal;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"><p className="text-[10px] font-black uppercase text-slate-400 mb-2">Общая ценность</p><p className="text-3xl font-black">${marketVal}</p></div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"><p className="text-[10px] font-black uppercase text-slate-400 mb-2">Инвестировано</p><p className="text-3xl font-black">${paidVal}</p></div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Чистая прибыль</p>
          <p className={`text-3xl font-black ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {profit >= 0 ? '+' : ''}${profit}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
            <tr>
              <th className="p-4">Кроссовки</th>
              <th className="p-4">Купил</th>
              <th className="p-4">Рынок</th>
              <th className="p-4">Профит</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, i) => {
              const diff = item.price - item.buyPrice;
              return (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={item.image} className="w-12 h-12 object-contain" />
                    <div><p className="font-bold text-sm">{item.name}</p><p className="text-[10px] text-slate-400">{item.date}</p></div>
                  </td>
                  <td className="p-4 text-sm font-bold">${item.buyPrice}</td>
                  <td className="p-4 text-sm font-bold">${item.price}</td>
                  <td className={`p-4 text-sm font-black ${diff >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {diff >= 0 ? '+' : ''}${diff}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => onRemove(i)} className="text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {items.length === 0 && <div className="p-20 text-center text-slate-400">Коллекция пуста</div>}
      </div>
    </div>
  );
}