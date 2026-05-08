import React from 'react';
import { Shirt, Lock, Bell } from 'lucide-react';

export const Merch: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative rounded-sm overflow-hidden bg-rays-gray border-4 border-rays-forest p-8 md:p-20 text-center shadow-[8px_8px_0px_0px_rgba(11,43,22,1)]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-10">
          <div className="w-24 h-24 bg-rays-black rounded-sm flex items-center justify-center mx-auto border-4 border-rays-lime shadow-brutal transform rotate-3">
            <Shirt size={48} className="text-rays-lime" />
          </div>
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-rays-red text-rays-white text-xs font-black uppercase tracking-widest border-2 border-rays-black shadow-brutal-red">
              <Lock size={16} /> Phase 2 Development
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-black text-rays-white uppercase tracking-tighter leading-none">
              Mobile Money <br/><span className="text-rays-lime">Merch</span>
            </h1>
            <p className="text-lg text-rays-white/80 font-medium">
              Premium producer gear, sample pack physicals, and exclusive apparel dropping soon. Sourced globally, shipped directly.
            </p>
          </div>

          <div className="bg-rays-black p-8 rounded-sm border-2 border-rays-forest max-w-md mx-auto">
            <h3 className="text-rays-white font-black text-xl uppercase tracking-tight mb-2 flex items-center justify-center gap-3">
              <Bell size={24} className="text-rays-lime" /> Get Notified
            </h3>
            <p className="text-xs text-rays-white/60 font-bold uppercase tracking-widest mb-6">Join the waitlist for the first drop.</p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="ENTER EMAIL" 
                className="flex-1 bg-rays-gray border-2 border-rays-forest rounded-sm px-4 py-3 text-rays-white font-bold uppercase tracking-wider focus:outline-none focus:border-rays-lime transition-colors"
              />
              <button 
                type="submit"
                className="bg-rays-lime hover:bg-rays-white text-rays-black font-black uppercase tracking-widest px-8 py-3 rounded-sm transition-colors border-2 border-rays-black shadow-brutal"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Blurred Mockups */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 opacity-30 pointer-events-none select-none filter blur-[3px] grayscale">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-rays-black rounded-sm aspect-[3/4] border-4 border-rays-forest flex items-center justify-center overflow-hidden relative">
             <img src={`https://picsum.photos/seed/merch${i}/400/600`} alt="Merch Mockup" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-rays-black/50"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
