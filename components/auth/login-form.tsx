'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { loginUser } from '@/serverActions/auth';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!password.trim()) {
      toast.error('Please enter your password');
      return;
    }
    setLoading(true);
    try {
      const message: string = await loginUser(email.trim(), password);
      toast.success(message || 'Login successful!');
      router.refresh();
      router.replace('/dashboard');
    } catch (error: any) {
      console.error('Error during login:', error);
      toast.error(error?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/90">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground/70" />
          <Input
            disabled={loading}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-11 bg-background border-sky-500/10 focus-visible:ring-sky-500/30 focus-visible:border-sky-500/50 transition-all"
            required
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-foreground/90">Password</label>
          <Link 
            href="/auth/forgot-password" 
            className="text-xs text-sky-400 hover:text-sky-500 font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground/70" />
          <Input
            disabled={loading}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-11 bg-background border-sky-500/10 focus-visible:ring-sky-500/30 focus-visible:border-sky-500/50 transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-muted-foreground/70 hover:text-sky-400 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="remember" 
          className="w-4 h-4 rounded border-sky-500/20 text-sky-500 focus:ring-sky-500/30 bg-background accent-sky-500" 
        />
        <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors">
          Remember me
        </label>
      </div>

      {/* Sign In Button */}
      <Button 
        disabled={loading} 
        type="submit" 
        className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg shadow-sky-500/10 transition-all active:scale-[0.99]"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      {/* Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-sky-500/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="px-3 bg-card text-muted-foreground/60">Or continue with</span>
        </div>
      </div>

      {/* OAuth Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="h-11 border-sky-500/10 bg-background hover:bg-sky-400/5 hover:text-sky-400 hover:border-sky-500/30 transition-all"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C15.503,1.607,13.811,0.915,12.545,0.915 c-6.302,0-11.4,5.098-11.4,11.4c0,6.302,5.098,11.4,11.4,11.4c6.302,0,11.4-5.098,11.4-11.4C23.945,11.619,23.589,10.879,23.045,10.239z"/>
          </svg>
          Google
        </Button>
        <Button 
          variant="outline" 
          className="h-11 border-sky-500/10 bg-background hover:bg-sky-400/5 hover:text-sky-400 hover:border-sky-500/30 transition-all"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.6915026,3.99226679 L3.50612381,3.99226679 C3.19218622,3.99226679 3,4.18741924 3,4.40540377 L3,19.5946039 C3,19.8126062 3.19218622,20.0077479 3.50612381,20.0077479 L10.4744692,20.0077479 L10.4744692,14.0152755 L8.32205323,14.0152755 L8.32205323,11.2639505 L10.4744692,11.2639505 L10.4744692,9.32394659 C10.4744692,7.25339235 11.6872608,6.04126679 13.5180365,6.04126679 C14.4506984,6.04126679 15.2215769,6.10720414 15.4408363,6.13950414 L15.4408363,8.61722156 L14.1415141,8.61722156 C13.1115365,8.61722156 12.9206531,9.09787326 12.9206531,9.84309114 L12.9206531,11.2639505 L15.3510949,11.2639505 L15.0151557,14.0152755 L12.9206531,14.0152755 L12.9206531,20.0077479 L19.6915026,20.0077479 C20.0054402,20.0077479 20.1976264,19.8126062 20.1976264,19.5946039 L20.1976264,4.40540377 C20.1976264,4.18741924 20.0054402,3.99226679 19.6915026,3.99226679"/>
          </svg>
          Facebook
        </Button>
      </div>

      {/* Sign Up Link */}
      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="text-sky-400 hover:text-sky-500 font-semibold transition-colors">
          Sign up
        </Link>
      </div>
    </form>
  );
}