
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BarChart3, LineChart, TrendingUp, Globe, BarChart, BookOpen } from "lucide-react";
import { RaLogo } from './RaLogo';

// Menu items configuration
const modules = [
  {
    title: "Financeiro Corporativo",
    path: "/financeiro",
    icon: BarChart3,
  },
  {
    title: "Valuation",
    path: "/valuation",
    icon: TrendingUp,
  },
  {
    title: "Macroeconômico",
    path: "/macroeconomico",
    icon: Globe,
  },
  {
    title: "Inteligência de Mercado",
    path: "/mercado",
    icon: LineChart,
  },
  {
    title: "Modelagem Financeira",
    path: "/modelagem",
    icon: BarChart,
  }
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-slate-200">
      <div className="flex items-center h-16 px-4 border-b border-slate-200 bg-black">
        <div className="flex items-center">
          <RaLogo variant="full" size="md" />
          <div className="ml-2 text-lg font-bold text-white truncate">
            RA Finanças Corporativas
          </div>
        </div>
        <div className="ml-auto">
          <SidebarTrigger />
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-finance-primary font-bold">Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => (
                <SidebarMenuItem key={module.title}>
                  <SidebarMenuButton asChild>
                    <Link to={module.path} className="flex items-center">
                      <module.icon className="w-4 h-4 mr-2" />
                      <span>{module.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto pt-4">
          <SidebarGroupContent>
            <div className="px-4 py-2">
              <div className="bg-finance-neutral rounded-md p-3 text-xs">
                <p className="font-medium text-finance-text-primary">Precisa de ajuda?</p>
                <p className="text-finance-text-secondary mt-1">Acesse nossa documentação para obter suporte.</p>
                <Link 
                  to="/documentacao" 
                  className="flex items-center mt-2 text-[#40E0D0] hover:underline"
                >
                  <BookOpen className="w-3 h-3 mr-1" />
                  <span>Ver documentação</span>
                </Link>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
