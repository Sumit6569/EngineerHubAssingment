
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface NavbarProps {
  title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title = 'ShopStore' }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur-lg">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-shop-primary" />
          <span className="text-xl font-bold">{title}</span>
        </Link>
        
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="transition hover:text-shop-primary">
            Home
          </Link>
          <Link to="/" className="transition hover:text-shop-primary">
            Products
          </Link>
          <Link to="/" className="transition hover:text-shop-primary">
            About
          </Link>
          <Link to="/" className="transition hover:text-shop-primary">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-gray-100">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
