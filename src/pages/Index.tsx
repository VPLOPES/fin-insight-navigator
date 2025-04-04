
import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { BarChart3, LineChart, TrendingUp, Globe, BarChart } from "lucide-react";
import { InstructionsCard } from '@/components/dashboard/InstructionsCard';
import { CustomizationCard } from '@/components/dashboard/CustomizationCard';

// Mock data for the dashboard overview
const dashboardMetrics = [
  { id: 1, title: 'Receita Anual', value: 45800000, change: 8.5, format: 'currency' },
  { id: 2, title: 'EBITDA', value: 12500000, change: 12.3, format: 'currency' },
  { id: 3, title: 'Margem EBITDA', value: 27.3, change: 3.5, format: 'percentage', suffix: '%' },
  { id: 4, title: 'Valor de Mercado', value: 98700000, format: 'currency' },
];

const performanceData = [
  { quarter: 'Q1/23', receita: 10200000, ebitda: 2700000 },
  { quarter: 'Q2/23', receita: 10800000, ebitda: 2900000 },
  { quarter: 'Q3/23', receita: 11500000, ebitda: 3100000 },
  { quarter: 'Q4/23', receita: 12300000, ebitda: 3400000 },
  { quarter: 'Q1/24', receita: 11000000, ebitda: 3000000 },
  { quarter: 'Q2/24', receita: 11800000, ebitda: 3200000 },
];

const modules = [
  {
    title: "Financeiro Corporativo",
    description: "Análise de indicadores financeiros e avaliação de performance",
    path: "/financeiro",
    icon: BarChart3,
    color: "bg-gradient-to-br from-blue-500 to-blue-700",
  },
  {
    title: "Valuation",
    description: "Avaliação por métodos de Fluxo de Caixa Descontado e múltiplos",
    path: "/valuation",
    icon: TrendingUp,
    color: "bg-gradient-to-br from-green-500 to-green-700",
  },
  {
    title: "Macroeconômico",
    description: "Acompanhamento de indicadores econômicos nacionais e internacionais",
    path: "/macroeconomico",
    icon: Globe,
    color: "bg-gradient-to-br from-purple-500 to-purple-700",
  },
  {
    title: "Inteligência de Mercado",
    description: "Análise de preços de commodities e custos logísticos",
    path: "/mercado",
    icon: LineChart,
    color: "bg-gradient-to-br from-orange-500 to-orange-700",
  },
  {
    title: "Modelagem Financeira",
    description: "Projeções financeiras automatizadas e análise de cenários",
    path: "/modelagem",
    icon: BarChart,
    color: "bg-gradient-to-br from-red-500 to-red-700",
  }
];

const Index = () => {
  return (
    <DashboardLayout
      title="Plataforma Integrada de Inteligência Financeira"
      description="Dashboard com visão consolidada dos principais indicadores"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {dashboardMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            format={metric.format as any}
            suffix={metric.suffix}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7 mb-6">
        <Card className="col-span-7 md:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Performance Financeira
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: '300px' }}>
              <ChartCard
                title=""
                type="bar"
                data={performanceData}
                xAxisDataKey="quarter"
                categories={[
                  { key: 'receita', name: 'Receita', color: '#0D326F' },
                  { key: 'ebitda', name: 'EBITDA', color: '#00A878' },
                ]}
                height={300}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-7 md:col-span-3">
          <CardHeader>
            <CardTitle>Próximos Passos</CardTitle>
            <CardDescription>Ações recomendadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="font-medium">Modelagem Financeira</p>
                  <p className="text-xs text-muted-foreground">Configurar projeção financeira</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/modelagem">Iniciar</Link>
                </Button>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="font-medium">Análise de Valuation</p>
                  <p className="text-xs text-muted-foreground">Revisar premissas do DCF</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/valuation">Revisar</Link>
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Análise de Mercado</p>
                  <p className="text-xs text-muted-foreground">Verificar tendências de preços</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/mercado">Explorar</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <InstructionsCard />
        <CustomizationCard />
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Módulos da Plataforma</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => (
          <Link to={module.path} key={index} className="h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className={`${module.color} text-white rounded-t-lg`}>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <module.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{module.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription>{module.description}</CardDescription>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Acessar módulo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Index;
