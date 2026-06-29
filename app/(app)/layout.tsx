import { AppSidebar } from '@/components/layout/app-sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-stretch h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 md:pl-0 overflow-auto ">{children}</main>
    </div>
  );
}
