import React from 'react';
import { Trash2, TrendingUp, TrendingDown, LayoutGrid } from 'lucide-react';

export default function Collection({ items, onRemove }) {
  const marketVal = items.reduce((a, b) => a + b.price, 0);
  const paidVal = items.reduce((a, b) => a + b.buyPrice, 0);
  const totalProfit = marketVal - paidVal;
  const totalRoi = paidVal > 0 ? ((totalProfit / paidVal) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Market Value" val={`$${marketVal}`} />
        <StatCard label="Profit" val={`$${totalProfit}`} color={totalProfit >= 0 ? 'text-green-500' : 'text-red-500'} />
        <StatCard label="ROI %" val={`${totalRoi}%`} sub={totalRoi >= 0 ? <TrendingUp size={16}/> : <TrendingDown size={16}/>} />
        <StatCard label="Total Pairs" val={items.length} bg="bg-black text-white" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
              <tr>
                <th className="p-4">Item</th>
                <th className="p-4">Buy Price</th>
                <th className="p-4">Market</th>
                <th className="p-4 text-center">ROI</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, i) => {
                const diff = item.price - item.buyPrice;
                const roi = ((diff / item.buyPrice) * 100).toFixed(1);
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={item.image} className="w-10 h-10 object-contain rounded-lg bg-slate-50" />
                      <div>
                        <p className="font-bold leading-none mb-1">{item.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-black">{item.brand}</p>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-500">${item.buyPrice}</td>
                    <td className="p-4 font-bold">${item.price}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${diff >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {diff >= 0 ? '+' : ''}{roi}%
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => onRemove(i)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {items.length === 0 && (
          <div className="py-20 text-center">
            <LayoutGrid size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium">No sneakers in collection</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, val, color = "text-slate-900", bg = "bg-white", sub = null }) {
  return (
    <div className={`${bg} p-5 rounded-3xl border border-slate-100 shadow-sm`}>
      <p className="text-[10px] font-black uppercase opacity-50 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <p className={`text-2xl font-black ${color}`}>{val}</p>
        <span className={color}>{sub}</span>
      </div>
    </div>
  );
}
