'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, Briefcase, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-brand-navy text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-wider text-white">BIMB <span className="text-brand-gold">CAREBRIDGE</span></span>
              <span className="text-xs text-gray-300 tracking-widest uppercase">Connecting Care, Creating Opportunities</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <Link href="/jobs" className="hover:text-brand-gold transition-colors flex items-center gap-1">
              <Briefcase size={16} /> Browse Jobs
            </Link>
            <Link href="/employers" className="hover:text-brand-gold transition-colors">Employers</Link>
            <Link href="/contact" className="hover:text-brand-gold transition-colors flex items-center gap-1">
              <PhoneCall size={16} /> Contact Us
            </Link>
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-brand-gold font-semibold">Hi, {user.name}</span>
                {user.role === 'admin' || user.role === 'superadmin' ? (
                  <Link href="/admin/dashboard" className="bg-brand-gold text-brand-navy px-4 py-2 rounded font-semibold hover:bg-opacity-90 transition">
                    Admin Panel
                  </Link>
                ) : (
                  <Link href="/dashboard" className="bg-brand-lightNavy px-4 py-2 rounded text-sm hover:bg-opacity-80 transition">
                    My Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="text-sm text-gray-300 hover:text-white underline">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-brand-gold transition">
                  Login
                </Link>
                <Link href="/register" className="bg-brand-gold text-brand-navy px-4 py-2 rounded text-sm font-semibold hover:bg-opacity-90 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-brand-lightNavy px-4 pt-2 pb-4 space-y-3">
          <Link href="/" className="block py-2 hover:text-brand-gold">Home</Link>
          <Link href="/jobs" className="block py-2 hover:text-brand-gold">Browse Jobs</Link>
          <Link href="/employers" className="block py-2 hover:text-brand-gold">Employers</Link>
          <Link href="/contact" className="block py-2 hover:text-brand-gold">Contact Us</Link>
          <hr className="border-gray-600" />
          {user ? (
            <>
              <Link href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="block py-2 text-brand-gold font-semibold">Dashboard</Link>
              <button onClick={handleLogout} className="block py-2 text-left text-red-400">Logout</button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 pt-2">
              <Link href="/login" className="text-center py-2 border border-gray-400 rounded">Login</Link>
              <Link href="/register" className="text-center py-2 bg-brand-gold text-brand-navy rounded font-semibold">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}