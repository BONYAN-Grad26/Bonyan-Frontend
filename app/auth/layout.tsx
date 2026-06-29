'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/bonyan2.jpeg';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* خلفية مضيئة هادئة في زاوية الشاشة لتعزيز ثيم صفحة تسجيل الدخول */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-sky-500/10 relative z-10 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center">
          {/* تم استبدال الأيقونة باللوجو الجديد */}
          <Link href="/" className="group relative w-[160px] h-[45px] flex items-center transition-all duration-300 hover:opacity-90">
            <Image 
              src={logo} 
              alt="Bonyan Logo" 
              fill 
              priority 
              className="object-contain object-left" 
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="w-full max-w-md">
          {/* صندوق النماذج (Login/Register Card) بلمسة زجاجية ناعمة وحدود متناسقة */}
          <div className="bg-card border border-sky-500/10 rounded-2xl p-8 sm:p-10 space-y-4 shadow-xl shadow-sky-500/5 mb-8">
            {children}
          </div>

          {/* Trust Badges - تم ضبط تباين النصوص وتناسق الألوان */}
          <div className="flex items-center justify-center gap-8 text-xs sm:text-sm text-muted-foreground/80">
            <div className="text-center space-y-0.5">
              <p className="font-bold text-foreground">256-bit SSL</p>
              <p className="text-[11px] text-muted-foreground/60">Encrypted</p>
            </div>
            <div className="h-4 w-[1px] bg-sky-500/10" /> {/* فاصل أنيق بين العناصر */}
            <div className="text-center space-y-0.5">
              <p className="font-bold text-foreground">HIPAA</p>
              <p className="text-[11px] text-muted-foreground/60">Compliant</p>
            </div>
            <div className="h-4 w-[1px] bg-sky-500/10" />
            <div className="text-center space-y-0.5">
              <p className="font-bold text-foreground">2FA</p>
              <p className="text-[11px] text-muted-foreground/60">Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}