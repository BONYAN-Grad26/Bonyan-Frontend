import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Sign In - Bonyan',
  description: 'Sign in to your Bonyan health account',
};

export default function LoginPage() {
  return (
    <>
      {/* رأس الصفحة مع ضبط التباين وعمل تباعد متناسق */}
      <div className="text-center mb-8 space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground/90">
          Sign in to your Bonyan account
        </p>
      </div>
      
      {/* فورم تسجيل الدخول المحدث بالهوية اللبنية */}
      <LoginForm />
    </>
  );
}