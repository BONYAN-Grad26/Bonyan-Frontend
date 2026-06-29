'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/public/bonyan2.jpeg';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-sky-500/10 bg-background/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* زدنا الارتفاع قليلاً ليعطي اللوجو مساحة تنفس مريحة */}
          
          {/* Logo Container */}
          <Link href="/" className="group relative w-[180px] h-[50px] flex items-center transition-all duration-300 hover:opacity-90">
            <Image 
              src={logo} 
              alt="Bonyan Logo" 
              fill 
              priority 
              className="object-contain object-left" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-foreground/80 hover:text-sky-400 transition-colors text-sm font-medium py-2 group/link"
              >
                {item.label}
                {/* خط سفلي متحرك بلون اللوجو اللبني عند تمرير الماوس */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sky-400 transition-all duration-300 group-hover/link:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => router.push('/auth/login')} 
              variant="ghost" 
              size="sm" 
              className="hidden sm:inline-flex text-foreground/80 hover:text-sky-400 hover:bg-sky-400/5 transition-all"
            >
              Sign In
            </Button>
            
            {/* زر رئيسي متناسق مع لون اللوجو والأزرار المستديرة الحديثة */}
            <Button 
              onClick={() => router.push('/auth/register')} 
              size="sm" 
              className="bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] font-semibold"
            >
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground/80 hover:text-sky-400 hover:bg-sky-400/10 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-sky-500/10 animate-in fade-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col gap-2 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 text-foreground/80 hover:text-sky-400 hover:bg-sky-400/5 rounded-lg transition-colors text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-sky-500/10 flex flex-col gap-2 px-4">
                <Button 
                  onClick={() => { router.push('/auth/login'); setIsOpen(false); }} 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-sky-500/20 text-foreground/80 hover:text-sky-400"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}