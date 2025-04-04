import React, { ReactNode } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RaLogo } from './RaLogo';
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
interface DashboardLayoutProps {
  children?: ReactNode;
  title: string;
  description?: string;
}
export function DashboardLayout({
  children,
  title,
  description
}: DashboardLayoutProps) {
  const {
    theme,
    setTheme
  } = useTheme();
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-card border-b border-border py-4 px-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-finance-primary">{title}</h1>
                {description && <p className="mt-1 text-base font-semibold text-slate-50">{description}</p>}
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-full">
                  {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                  <span className="sr-only">Alternar tema</span>
                </Button>
                <RaLogo variant="icon" size="sm" />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6 space-y-6 bg-background">
            {children}
          </main>
          
          <footer className="bg-card border-t border-border py-3 px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Fin-Insight Navigator • Plataforma de Inteligência Financeira
              </p>
              <RaLogo variant="full" size="sm" />
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>;
}
export function ModuleDashboard({
  children,
  title,
  description,
  tabs = []
}: DashboardLayoutProps & {
  tabs?: {
    id: string;
    label: string;
    content: ReactNode;
  }[];
}) {
  return <DashboardLayout title={title} description={description}>
      {tabs.length > 0 ? <Tabs defaultValue={tabs[0].id} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            {tabs.map(tab => <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-white dark:data-[state=active]:bg-muted data-[state=active]:shadow-sm">
                {tab.label}
              </TabsTrigger>)}
          </TabsList>
          {tabs.map(tab => <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              {tab.content}
            </TabsContent>)}
        </Tabs> : children}
    </DashboardLayout>;
}