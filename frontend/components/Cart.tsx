import React from 'react';
import { X, Trash2, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  isCheckingOut?: boolean;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem, onCheckout, isCheckingOut = false }) => {
  const total = items.reduce((sum, item) => sum + item.license.price, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-rays-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full bg-rays-gray border-l-4 border-rays-lime shadow-2xl flex flex-col transform transition-transform">
          
          {/* Header */}
          <div className="px-6 py-5 border-b-2 border-rays-forest flex items-center justify-between bg-rays-black">
            <h2 className="text-2xl font-display font-black text-rays-white uppercase tracking-tight">Your Stash</h2>
            <button onClick={onClose} className="text-rays-white hover:text-rays-red transition-colors">
              <X size={28} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-rays-gray">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-rays-white/30 space-y-4">
                <div className="w-20 h-20 border-4 border-dashed border-rays-forest rounded-full flex items-center justify-center">
                  <span className="font-display font-black text-2xl">$</span>
                </div>
                <p className="font-bold uppercase tracking-widest">Cart is empty.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-rays-black p-3 rounded-sm border-2 border-rays-forest hover:border-rays-lime transition-colors">
                  <img src={item.beat.coverUrl} alt={item.beat.title} className="w-20 h-20 rounded-sm object-cover border border-rays-forest" />
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-black text-rays-white text-sm uppercase tracking-tight">{item.beat.title}</h4>
                    <p className="text-[10px] font-bold text-rays-lime uppercase tracking-wider mt-1">{item.license.type} License</p>
                    <p className="text-rays-white font-black mt-2">${item.license.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="text-rays-white hover:text-rays-red p-2 self-center transition-colors bg-rays-forest hover:bg-rays-black rounded-sm border border-transparent hover:border-rays-red"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-rays-black border-t-2 border-rays-forest space-y-5">
              <div className="flex justify-between text-rays-white font-black text-xl uppercase">
                <span>Total</span>
                <span className="text-rays-lime">${total.toFixed(2)}</span>
              </div>
              <div className="bg-rays-forest/30 border border-rays-forest p-3 rounded-sm">
                <p className="text-[10px] text-rays-lime text-center font-bold uppercase tracking-widest leading-relaxed">
                  Taxes calculated at checkout.<br/>
                  Files delivered instantly via email from:<br/>
                  <span className="text-rays-white">kudowaydeep@gmail.com</span>
                </p>
              </div>
              <button
                onClick={onCheckout}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-3 bg-rays-lime hover:bg-rays-white text-rays-black font-black uppercase tracking-widest py-4 rounded-sm transition-colors border-2 border-rays-lime hover:border-rays-white shadow-brutal disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-rays-black border-t-transparent rounded-full animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    Checkout via Stripe
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
