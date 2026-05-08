import React, { useState } from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { BeatCard } from '../components/BeatCard';
import { MOCK_BEATS } from '../constants';
import { Beat, LicenseType } from '../types';
import { generateBeatBreakdown } from '../services/geminiService';

interface MarketplaceProps {
  onAddToCart: (beat: Beat, licenseType: LicenseType) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Loop' | 'Loop Pack'>('All');
  const [breakdownModal, setBreakdownModal] = useState<{ isOpen: boolean; beat: Beat | null; content: string; loading: boolean }>({
    isOpen: false,
    beat: null,
    content: '',
    loading: false
  });

  const filteredBeats = MOCK_BEATS.filter(beat => {
    const matchesSearch = beat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          beat.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = activeTab === 'All' || beat.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleViewBreakdown = async (beat: Beat) => {
    setBreakdownModal({ isOpen: true, beat, content: '', loading: true });
    const content = await generateBeatBreakdown(beat.title, beat.tags);
    setBreakdownModal(prev => ({ ...prev, content, loading: false }));
  };

  const closeBreakdown = () => {
    setBreakdownModal({ isOpen: false, beat: null, content: '', loading: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center space-y-6">
        <div className="inline-block bg-rays-red text-rays-white px-4 py-1 text-xs font-black uppercase tracking-widest border-2 border-rays-black shadow-brutal-red mb-4 transform -rotate-2">
          Est. 2017
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-black text-rays-white uppercase tracking-tighter leading-none">
          Raw Loops & <br/><span className="text-rays-lime">Loop Packs</span>
        </h1>
        <p className="text-rays-white/70 max-w-2xl mx-auto text-lg font-medium">
          Straight out of FL Studio Mobile. High-quality stems, loops, and packs ready for placements. No generic sounds.
        </p>
        
        {/* Search */}
        <div className="max-w-xl mx-auto mt-10 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-rays-lime" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 border-2 border-rays-forest rounded-sm leading-5 bg-rays-black text-rays-white placeholder-rays-white/30 focus:outline-none focus:border-rays-lime focus:ring-0 sm:text-lg font-bold uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(11,43,22,1)] focus:shadow-brutal"
            placeholder="Search loops, packs, vibes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button 
          onClick={() => setActiveTab('All')}
          className={`px-8 py-3 font-black uppercase tracking-widest border-2 transition-all ${
            activeTab === 'All' 
              ? 'bg-rays-lime text-rays-black border-rays-black shadow-brutal' 
              : 'bg-rays-black text-rays-white border-rays-forest hover:border-rays-lime'
          }`}
        >
          All Sounds
        </button>
        <button 
          onClick={() => setActiveTab('Loop')}
          className={`px-8 py-3 font-black uppercase tracking-widest border-2 transition-all ${
            activeTab === 'Loop' 
              ? 'bg-rays-lime text-rays-black border-rays-black shadow-brutal' 
              : 'bg-rays-black text-rays-white border-rays-forest hover:border-rays-lime'
          }`}
        >
          Loops
        </button>
        <button 
          onClick={() => setActiveTab('Loop Pack')}
          className={`px-8 py-3 font-black uppercase tracking-widest border-2 transition-all ${
            activeTab === 'Loop Pack' 
              ? 'bg-rays-lime text-rays-black border-rays-black shadow-brutal' 
              : 'bg-rays-black text-rays-white border-rays-forest hover:border-rays-lime'
          }`}
        >
          Loop Packs
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBeats.map(beat => (
          <BeatCard 
            key={beat.id} 
            beat={beat} 
            onAddToCart={onAddToCart} 
            onViewBreakdown={handleViewBreakdown}
          />
        ))}
      </div>

      {filteredBeats.length === 0 && (
        <div className="text-center py-32 text-rays-white/50 font-bold uppercase tracking-widest">
          No {activeTab === 'Loop' ? 'loops' : activeTab === 'Loop Pack' ? 'loop packs' : 'sounds'} found matching "{searchTerm}".
        </div>
      )}

      {/* Breakdown Modal */}
      {breakdownModal.isOpen && breakdownModal.beat && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-rays-black/90 backdrop-blur-sm" onClick={closeBreakdown} />
          <div className="relative bg-rays-gray border-4 border-rays-lime rounded-sm max-w-2xl w-full shadow-brutal overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b-4 border-rays-forest flex justify-between items-center bg-rays-black">
              <div className="flex items-center gap-3">
                <Sparkles className="text-rays-lime" size={28} />
                <h2 className="text-2xl font-display font-black text-rays-white uppercase tracking-tight">
                  Skimp's Breakdown
                </h2>
              </div>
              <button onClick={closeBreakdown} className="text-rays-white hover:text-rays-red transition-colors">
                <X size={28} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto bg-rays-gray">
              {breakdownModal.loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-6">
                  <div className="w-12 h-12 border-4 border-rays-forest border-t-rays-lime rounded-full animate-spin"></div>
                  <p className="text-rays-lime font-bold uppercase tracking-widest animate-pulse">Analyzing Stems...</p>
                </div>
              ) : (
                <div className="prose prose-invert prose-p:text-rays-white/90 prose-p:font-medium prose-p:leading-relaxed max-w-none">
                  <h3 className="text-xl font-black text-rays-lime uppercase mb-4">{breakdownModal.beat.title}</h3>
                  {breakdownModal.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="p-6 border-t-4 border-rays-forest bg-rays-black flex justify-end">
              <button 
                onClick={closeBreakdown}
                className="px-8 py-3 bg-rays-forest hover:bg-rays-lime text-rays-white hover:text-rays-black font-black uppercase tracking-widest rounded-sm transition-colors border-2 border-transparent hover:border-rays-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
