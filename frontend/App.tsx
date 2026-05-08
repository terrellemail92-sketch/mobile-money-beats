import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { Marketplace } from './pages/Marketplace';
import { Dashboard } from './pages/Dashboard';
import { Merch } from './pages/Merch';
import { Beat, LicenseType, CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleAddToCart = (beat: Beat, licenseType: LicenseType) => {
    const license = beat.licenses.find(l => l.type === licenseType);
    if (!license) return;

    const newItem: CartItem = {
      id: `${beat.id}-${Date.now()}`,
      beat,
      license
    };

    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            beatId: item.beat.id,
            beatTitle: item.beat.title,
            licenseType: item.license.type,
            licenseDescription: item.license.description,
            price: item.license.price,
          })),
        }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Layout for public buyer-facing pages
  const PublicLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen flex flex-col bg-rays-black">
      <Navbar 
        cartItemCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <main className="flex-grow">
        {children}
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        isCheckingOut={isCheckingOut}
      />

      {/* Footer */}
      <footer className="bg-rays-black border-t-4 border-rays-forest py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-rays-white/50 text-xs font-bold uppercase tracking-widest">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-8 h-8 bg-rays-lime rounded-sm flex items-center justify-center transform rotate-12 border border-rays-black">
              <span className="text-rays-black font-display font-black text-lg">$</span>
            </div>
          </div>
          <p>&copy; {new Date().getFullYear()} Mobile Money Beats by Skimp. All rights reserved.</p>
          <p className="mt-3 text-rays-lime/50">Powered by Stripe & Google GenAI</p>
          
          {/* Subtle Admin Link */}
          <div className="mt-12">
            <Link to="/admin" className="text-rays-forest hover:text-rays-lime transition-colors">
              Producer Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PublicLayout>
            <Marketplace onAddToCart={handleAddToCart} />
          </PublicLayout>
        } />
        <Route path="/merch" element={
          <PublicLayout>
            <Merch />
          </PublicLayout>
        } />
        
        {/* Admin Route (Standalone Layout) */}
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
