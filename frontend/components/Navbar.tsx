import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Disc3, Shirt, MessageSquare, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onOpenCart }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Loops & Loop Packs', icon: <Disc3 size={18} /> },
    { path: '/merch', label: 'Merch', icon: <Shirt size={18} /> },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-rays-black/95 backdrop-blur-md border-b-2 border-rays-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-rays-white hover:text-rays-lime transition-colors p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 justify-center md:justify-start flex-1 md:flex-none">
            <div className="w-10 h-10 bg-rays-lime rounded-sm flex items-center justify-center transform -rotate-3 border-2 border-rays-forest shadow-brutal">
              <span className="text-rays-black font-display font-black text-2xl">$</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tighter text-rays-white leading-none uppercase">
                MOBILE MONEY
              </span>
              <span className="text-rays-lime text-[10px] font-bold tracking-widest uppercase">By Skimp</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all ${
                    isActive 
                      ? 'text-rays-lime border-b-2 border-rays-lime pb-1' 
                      : 'text-rays-white hover:text-rays-lime pb-1 border-b-2 border-transparent'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <a 
              href="https://discord.com" 
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 text-sm font-bold text-rays-white hover:text-rays-black transition-colors bg-rays-forest hover:bg-rays-lime px-4 py-2 rounded-sm border border-rays-lime"
            >
              <MessageSquare size={16} />
              COMMUNITY
            </a>
            
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-rays-white hover:text-rays-lime transition-colors"
            >
              <ShoppingCart size={28} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-black leading-none text-rays-black transform translate-x-1/4 -translate-y-1/4 bg-rays-red rounded-full border-2 border-rays-black">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-rays-forest border-b-2 border-rays-lime absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-4 text-base font-bold uppercase tracking-wider transition-colors border-b border-rays-black/50 ${
                    isActive ? 'text-rays-lime' : 'text-rays-white hover:text-rays-lime'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
            <a 
              href="https://discord.com" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-3 py-4 text-base font-bold uppercase tracking-wider text-rays-white hover:text-rays-lime transition-colors"
            >
              <MessageSquare size={18} />
              Discord Community
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
