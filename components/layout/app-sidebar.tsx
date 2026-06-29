'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Leaf, Menu, X  } from 'lucide-react';
import { useEffect, useState } from 'react';
import { logoutUser } from '@/serverActions/auth';
import { navItems } from '@/lib/constants';
import "aos/dist/aos.css";
import AOS from "aos";

export function AppSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); 

  const logoutHandling = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logoutUser();
      router.refresh(); 
      router.push('/');

    } catch (error) { 

      console.error('Error logging out:', error); 

    }
  }
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
      {/* Mobile Menu Button - Updated Hover State */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-100 p-2 rounded-lg hover:bg-sky-500/5 text-foreground/70 transition-colors cursor-pointer"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-background/60 backdrop-blur-xs z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Updated Border Color */}
      <aside
        className={`fixed md:static left-0 top-0  h-screen w-64 bg-card border-r border-sky-500/5 flex flex-col transition-transform z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo - Bonyan Minimalist Identity */}
        <div className="h-16 flex items-center px-6 border-b border-sky-500/5 mt-12 md:mt-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-sky-500/5 border border-sky-500/10 flex items-center justify-center transition-transform group-hover:scale-105">
              <Leaf className="w-5 h-5 text-sky-500" />
            </div>
            <span className="font-extrabold text-base text-foreground tracking-tight">Bonyan</span>
          </Link>
        </div>

        {/* Navigation - Updated Active & Hover States */}
        <nav  className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const x = item.href.split('?')[0];
            const isActive = pathname.startsWith(item.href) || pathname.startsWith(x) || pathname === item.href;
            console.log({isActive ,pathname,href:item.href})

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex select-none items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-medium cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-xs shadow-sky-500/10 font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-sky-500/5'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-muted-foreground/70'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section - Refined Sign Out Button */}
        <div className="border-t border-sky-500/5 p-4 space-y-3">
          <button 
            onClick={logoutHandling} 
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-500/5 border border-transparent hover:border-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}