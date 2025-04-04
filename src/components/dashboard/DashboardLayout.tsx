
import React, { ReactNode } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-slate-200 py-4 px-6">
            <div>
              <h1 className="text-2xl font-bold text-finance-primary">{title}</h1>
              {description && (
                <p className="text-finance-text-secondary mt-1">{description}</p>
              )}
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
          
          <footer className="bg-white border-t border-slate-200 py-3 px-6">
            <p className="text-sm text-finance-text-secondary">
              © {new Date().getFullYear()} Fin-Insight Navigator • Plataforma de Inteligência Financeira
            </p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function ModuleDashboard({ 
  children, 
  title, 
  description,
  tabs = [] 
}: DashboardLayoutProps & { tabs?: { id: string, label: string, content: ReactNode }[] }) {
  return (
    <DashboardLayout title={title} description={description}>
      {tabs.length > 0 ? (
        <Tabs defaultValue={tabs[0].id} className="space-y-4">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-4">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        children
      )}
    </DashboardLayout>
  );
}
