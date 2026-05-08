import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, FileText, TrendingUp, Download, LogOut, Upload, Plus, Music } from 'lucide-react';
import { MOCK_TRANSACTIONS, MOCK_CHART_DATA } from '../constants';

export const Dashboard: React.FC = () => {
  const totalRevenue = MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);
  const totalTax = MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.taxWithheld, 0);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    bpm: '',
    key: '',
    category: 'Loop',
    tags: ''
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Sample "${uploadForm.title}" added to vault! (This would upload to Google Drive in production)`);
    setUploadForm({ title: '', bpm: '', key: '', category: 'Loop', tags: '' });
  };

  return (
    <div className="min-h-screen bg-rays-black flex flex-col">
      {/* Admin Header */}
      <header className="bg-rays-gray border-b-4 border-rays-forest px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-rays-red rounded-sm flex items-center justify-center transform -rotate-3 border-2 border-rays-black shadow-brutal-red">
            <span className="text-rays-white font-display font-black text-2xl">A</span>
          </div>
          <div>
            <h1 className="font-display font-black text-xl text-rays-white uppercase leading-none">Skimp Admin</h1>
            <span className="text-[10px] text-rays-lime font-bold uppercase tracking-widest">Command Center</span>
          </div>
        </div>
        <Link to="/" className="text-xs font-black uppercase tracking-widest text-rays-black bg-rays-lime hover:bg-rays-white px-4 py-2 rounded-sm flex items-center gap-2 transition-colors border-2 border-rays-black shadow-brutal">
          <LogOut size={16} />
          Storefront
        </Link>
      </header>

      {/* Dashboard Content */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-10">
        <div>
          <h2 className="text-4xl font-display font-black text-rays-white uppercase tracking-tighter">Business Dashboard</h2>
          <p className="text-rays-lime font-bold uppercase tracking-widest mt-2">Track revenue, taxes, and manage your vault.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rays-gray border-2 border-rays-forest rounded-sm p-6 flex items-center gap-5 hover:border-rays-lime transition-colors shadow-[4px_4px_0px_0px_rgba(11,43,22,1)]">
            <div className="w-14 h-14 bg-rays-lime rounded-sm flex items-center justify-center text-rays-black border-2 border-rays-black">
              <DollarSign size={28} strokeWidth={3} />
            </div>
            <div>
              <p className="text-xs text-rays-white/70 font-bold uppercase tracking-widest">Gross Revenue (30d)</p>
              <p className="text-3xl font-black text-rays-white mt-1">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="bg-rays-gray border-2 border-rays-forest rounded-sm p-6 flex items-center gap-5 hover:border-rays-red transition-colors shadow-[4px_4px_0px_0px_rgba(11,43,22,1)]">
            <div className="w-14 h-14 bg-rays-red rounded-sm flex items-center justify-center text-rays-white border-2 border-rays-black">
              <TrendingUp size={28} strokeWidth={3} />
            </div>
            <div>
              <p className="text-xs text-rays-white/70 font-bold uppercase tracking-widest">Tax Set Aside (30%)</p>
              <p className="text-3xl font-black text-rays-white mt-1">${totalTax.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-rays-gray border-2 border-rays-forest rounded-sm p-6 flex items-center gap-5 hover:border-rays-white transition-colors shadow-[4px_4px_0px_0px_rgba(11,43,22,1)]">
            <div className="w-14 h-14 bg-rays-white rounded-sm flex items-center justify-center text-rays-black border-2 border-rays-black">
              <FileText size={28} strokeWidth={3} />
            </div>
            <div>
              <p className="text-xs text-rays-white/70 font-bold uppercase tracking-widest">Total Invoices</p>
              <p className="text-3xl font-black text-rays-white mt-1">{MOCK_TRANSACTIONS.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Chart & Transactions */}
          <div className="lg:col-span-2 space-y-10">
            {/* Chart Section */}
            <div className="bg-rays-gray border-2 border-rays-forest rounded-sm p-6 shadow-[4px_4px_0px_0px_rgba(11,43,22,1)]">
              <h2 className="text-xl font-black text-rays-white uppercase tracking-tight mb-8">Revenue vs Tax Withheld</h2>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#39FF14" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#39FF14" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTax" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E60000" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#E60000" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#0B2B16" vertical={false} />
                    <XAxis dataKey="month" stroke="#F3F4F6" tick={{fill: '#F3F4F6', fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#F3F4F6" tick={{fill: '#F3F4F6', fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#050505', border: '2px solid #39FF14', borderRadius: '2px', color: '#fff', fontWeight: 'bold' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#39FF14" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Gross Revenue" />
                    <Area type="monotone" dataKey="tax" stroke="#E60000" strokeWidth={3} fillOpacity={1} fill="url(#colorTax)" name="Tax Withheld" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-rays-gray border-2 border-rays-forest rounded-sm overflow-hidden shadow-[4px_4px_0px_0px_rgba(11,43,22,1)]">
              <div className="px-6 py-5 border-b-2 border-rays-forest flex justify-between items-center bg-rays-black">
                <h2 className="text-xl font-black text-rays-white uppercase tracking-tight">Recent Transactions</h2>
                <button className="text-xs font-bold uppercase tracking-widest text-rays-black bg-rays-lime hover:bg-rays-white px-4 py-2 rounded-sm flex items-center gap-2 transition-colors border-2 border-rays-black">
                  <Download size={16} /> Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-rays-white">
                  <thead className="bg-rays-forest text-xs uppercase tracking-widest font-black">
                    <tr>
                      <th className="px-6 py-4">Invoice ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Items</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Tax (30%)</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-rays-forest bg-rays-gray">
                    {MOCK_TRANSACTIONS.map((tx) => (
                      <tr key={tx.id} className="hover:bg-rays-black transition-colors">
                        <td className="px-6 py-5 font-black text-rays-lime">{tx.id}</td>
                        <td className="px-6 py-5 font-medium">{tx.date}</td>
                        <td className="px-6 py-5 font-medium">{tx.items}</td>
                        <td className="px-6 py-5 font-black">${tx.amount.toFixed(2)}</td>
                        <td className="px-6 py-5 font-black text-rays-red">${tx.taxWithheld.toFixed(2)}</td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 bg-rays-lime text-rays-black border border-rays-black rounded-sm text-[10px] font-black uppercase tracking-widest">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Upload Form */}
          <div className="lg:col-span-1">
            <div className="bg-rays-gray border-2 border-rays-forest rounded-sm p-6 shadow-[4px_4px_0px_0px_rgba(11,43,22,1)] sticky top-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-rays-lime rounded-sm flex items-center justify-center text-rays-black border border-rays-black">
                  <Upload size={18} strokeWidth={3} />
                </div>
                <h2 className="text-xl font-black text-rays-white uppercase tracking-tight">Sample Vault</h2>
              </div>
              
              <form onSubmit={handleUploadSubmit} className="space-y-5">
                {/* File Drop Zone */}
                <div className="border-2 border-dashed border-rays-forest hover:border-rays-lime bg-rays-black rounded-sm p-8 text-center transition-colors cursor-pointer group">
                  <Music size={32} className="mx-auto text-rays-forest group-hover:text-rays-lime mb-3 transition-colors" />
                  <p className="text-xs font-bold text-rays-white uppercase tracking-widest">Drag & Drop Audio Files</p>
                  <p className="text-[10px] text-rays-white/50 mt-1 uppercase">WAV, MP3, ZIP (Max 500MB)</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-rays-lime uppercase tracking-widest mb-1">Title</label>
                    <input 
                      type="text" 
                      required
                      value={uploadForm.title}
                      onChange={e => setUploadForm({...uploadForm, title: e.target.value})}
                      className="w-full bg-rays-black border-2 border-rays-forest rounded-sm px-3 py-2 text-rays-white font-bold focus:outline-none focus:border-rays-lime transition-colors"
                      placeholder="e.g. Devil Ray Bounce"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-rays-lime uppercase tracking-widest mb-1">BPM</label>
                      <input 
                        type="number" 
                        required
                        value={uploadForm.bpm}
                        onChange={e => setUploadForm({...uploadForm, bpm: e.target.value})}
                        className="w-full bg-rays-black border-2 border-rays-forest rounded-sm px-3 py-2 text-rays-white font-bold focus:outline-none focus:border-rays-lime transition-colors"
                        placeholder="140"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-rays-lime uppercase tracking-widest mb-1">Key</label>
                      <input 
                        type="text" 
                        required
                        value={uploadForm.key}
                        onChange={e => setUploadForm({...uploadForm, key: e.target.value})}
                        className="w-full bg-rays-black border-2 border-rays-forest rounded-sm px-3 py-2 text-rays-white font-bold focus:outline-none focus:border-rays-lime transition-colors"
                        placeholder="C# Min"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-rays-lime uppercase tracking-widest mb-1">Category</label>
                    <select 
                      value={uploadForm.category}
                      onChange={e => setUploadForm({...uploadForm, category: e.target.value})}
                      className="w-full bg-rays-black border-2 border-rays-forest rounded-sm px-3 py-2 text-rays-white font-bold uppercase focus:outline-none focus:border-rays-lime transition-colors appearance-none"
                    >
                      <option value="Loop">Single Loop</option>
                      <option value="Loop Pack">Loop Pack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-rays-lime uppercase tracking-widest mb-1">Tags (Comma Separated)</label>
                    <input 
                      type="text" 
                      value={uploadForm.tags}
                      onChange={e => setUploadForm({...uploadForm, tags: e.target.value})}
                      className="w-full bg-rays-black border-2 border-rays-forest rounded-sm px-3 py-2 text-rays-white font-bold focus:outline-none focus:border-rays-lime transition-colors"
                      placeholder="Trap, Dark, Stem"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-rays-lime hover:bg-rays-white text-rays-black font-black uppercase tracking-widest py-3 rounded-sm transition-colors border-2 border-rays-black shadow-brutal mt-6"
                >
                  <Plus size={18} strokeWidth={3} />
                  Add to Store
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
