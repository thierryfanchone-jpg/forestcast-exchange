import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-navy">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-navy-border bg-navy/90 px-6 backdrop-blur-md">
          <div className="text-sm text-slate-400">Espace membre</div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold">
              A
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-white">Apprenant Demo</div>
              <div className="text-xs text-slate-500">Plan Pro</div>
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
