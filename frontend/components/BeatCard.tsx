import React, { useState } from 'react';
import { Play, Pause, Info, ShoppingCart, Package } from 'lucide-react';
import { Beat, LicenseType } from '../types';

interface BeatCardProps {
  beat: Beat;
  onAddToCart: (beat: Beat, licenseType: LicenseType) => void;
  onViewBreakdown: (beat: Beat) => void;
}

export const BeatCard: React.FC<BeatCardProps> = ({ beat, onAddToCart, onViewBreakdown }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>('Personal');

  const currentLicense = beat.licenses.find(l => l.type === selectedLicense) || beat.licenses[0];
  const isPack = beat.category === 'Loop Pack';

  return (
    <div className="bg-rays-gray border-2 border-rays-forest rounded-sm overflow-hidden hover:border-rays-lime transition-all group flex flex-col relative hover:shadow-brutal">
      
      {/* Category Badge */}
      <div className={`absolute top-3 left-3 z-10 px-2 py-1 text-[10px] font-black uppercase tracking-widest border-2 ${isPack ? 'bg-rays-red text-rays-white border-rays-black' : 'bg-rays-lime text-rays-black border-rays-black'}`}>
        {isPack ? 'Loop Pack' : 'Loop'}
      </div>

      {/* Cover Image & Play Button */}
      <div className="relative aspect-square overflow-hidden bg-rays-black border-b-2 border-rays-forest">
        <img 
          src={beat.coverUrl} 
          alt={beat.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
        />
        <div className="absolute inset-0 bg-rays-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-rays-red rounded-full flex items-center justify-center text-rays-white hover:scale-110 transition-transform border-2 border-rays-black shadow-brutal"
          >
            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </button>
        </div>
        <div className="absolute bottom-3 right-3 bg-rays-black px-2 py-1 text-[10px] font-bold text-rays-lime border border-rays-lime">
          {beat.bpm} BPM • {beat.key}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display font-black text-xl text-rays-white uppercase tracking-tight truncate pr-2">{beat.title}</h3>
          <button 
            onClick={() => onViewBreakdown(beat)}
            className="text-rays-white hover:text-rays-lime transition-colors bg-rays-forest p-1.5 rounded-sm border border-rays-forest hover:border-rays-lime"
            title="View Breakdown"
          >
            <Info size={18} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {beat.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-rays-forest text-rays-white px-2 py-1 border border-rays-black">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          {/* License Selector */}
          <div className="relative">
            <select 
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value as LicenseType)}
              className="w-full appearance-none bg-rays-black border-2 border-rays-forest text-rays-white text-sm font-bold uppercase rounded-sm px-3 py-3 pr-8 focus:outline-none focus:border-rays-lime transition-colors cursor-pointer"
            >
              {beat.licenses.map(l => (
                <option key={l.type} value={l.type}>
                  {l.type} - ${l.price}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-rays-lime">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          
          <p className="text-[11px] text-rays-white/70 h-8 line-clamp-2 font-medium">
            {currentLicense.description}
          </p>

          <button 
            onClick={() => onAddToCart(beat, selectedLicense)}
            className="w-full flex items-center justify-center gap-2 bg-rays-lime hover:bg-rays-white text-rays-black font-black uppercase tracking-widest py-3 rounded-sm transition-colors border-2 border-rays-lime hover:border-rays-white"
          >
            {isPack ? <Package size={18} /> : <ShoppingCart size={18} />}
            Add • ${currentLicense.price}
          </button>
        </div>
      </div>
    </div>
  );
};
