
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, LineChart, ArrowDownUp, Target, PieChart, TrendingUp, Lightbulb } from 'lucide-react';

interface CapabilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function CapabilityCard({ icon, title, description }: CapabilityCardProps) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-finance-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-300 min-h-16">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function CapabilitiesSection() {
  const capabilities = [
    {
      title: "Demonstrações Contábeis Automatizadas",
      description: "Geração automática de relatórios financeiros, como DRE, Balanço Patrimonial e DFC, integrados ao ERP da empresa.",
      icon: <BarChart3 size={24} />
    },
    {
      title: "Fluxo de Caixa Financeiro",
      description: "Monitoramento e projeção do fluxo de caixa, oferecendo controle e visibilidade completa das finanças.",
      icon: <ArrowDownUp size={24} />
    },
    {
      title: "Consolidação Financeira",
      description: "Centralização de dados financeiros de múltiplas empresas, reduzindo o tempo de fechamento contábil em pelo menos 50%.",
      icon: <PieChart size={24} />
    },
    {
      title: "Monitor de Indicadores Personalizados",
      description: "Criação e acompanhamento de KPIs específicos para o negócio, permitindo insights valiosos em tempo real.",
      icon: <Target size={24} />
    },
    {
      title: "Criação de Orçamento",
      description: "Facilita a elaboração e acompanhamento de orçamentos, estabelecendo metas financeiras e monitorando o desempenho real em relação ao planejado.",
      icon: <LineChart size={24} />
    },
    {
      title: "Dashboards de Performance Financeira",
      description: "Painéis interativos que apresentam dados financeiros precisos e atualizados, auxiliando na tomada de decisões estratégicas.",
      icon: <BarChart size={24} />
    },
    {
      title: "Simulação de Cenários",
      description: "Permite explorar múltiplas opções e preparar a empresa para diferentes situações financeiras futuras.",
      icon: <Lightbulb size={24} />
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recursos do Módulo Financeiro</CardTitle>
        <CardDescription>Principais funcionalidades disponíveis nesta solução</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((capability, index) => (
            <CapabilityCard
              key={index}
              title={capability.title}
              description={capability.description}
              icon={capability.icon}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
