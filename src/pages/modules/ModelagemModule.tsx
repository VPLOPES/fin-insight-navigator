
import React from 'react';
import { ModuleDashboard } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, Calendar, TrendingUp } from "lucide-react";

export default function ModelagemModule() {
  const modelCards = [
    {
      title: "Projeções Financeiras",
      description: "Crie modelos de projeção financeira para sua empresa com base em diferentes cenários.",
      icon: LineChart,
      status: "Em breve",
    },
    {
      title: "Análise de Cenários",
      description: "Simule diferentes cenários macroeconômicos e seus impactos no seu negócio.",
      icon: TrendingUp,
      status: "Em breve",
    },
    {
      title: "Orçamento e Planejamento",
      description: "Elabore orçamentos detalhados e acompanhe a execução orçamentária.",
      icon: Calendar,
      status: "Em breve",
    },
    {
      title: "Modelagem de Investimentos",
      description: "Avalie projetos de investimento com análise de payback, TIR e VPL.",
      icon: BarChart,
      status: "Em breve",
    },
  ];

  return (
    <ModuleDashboard 
      title="Módulo de Modelagem Financeira" 
      description="Projeções financeiras automatizadas e análise de cenários"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-6">
        {modelCards.map((card, index) => (
          <Card key={index} className="relative overflow-hidden border border-blue-100">
            <div className="absolute top-0 right-0 bg-finance-primary text-white text-xs px-2 py-1 rounded-bl">
              {card.status}
            </div>
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <div className="p-2 bg-finance-neutral rounded-md">
                <card.icon className="h-6 w-6 text-finance-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <CardDescription className="mt-1">{card.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-center justify-center bg-finance-neutral bg-opacity-50 rounded-md">
                <p className="text-sm text-finance-text-secondary">
                  Este recurso estará disponível em breve.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Sobre o Módulo de Modelagem Financeira</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-finance-text-secondary">
            O Módulo de Modelagem Financeira está em desenvolvimento e trará recursos avançados
            para criação automatizada de projeções financeiras, análises de cenários e ferramentas
            para suporte à tomada de decisão.
          </p>
          <p className="text-finance-text-secondary mt-4">
            Com este módulo, você poderá simular diferentes cenários de negócio, avaliar o impacto
            de variáveis macroeconômicas nas suas operações e criar planos financeiros robustos
            para sua empresa.
          </p>
          <div className="bg-finance-neutral p-4 rounded-md mt-6">
            <h3 className="font-medium text-finance-primary mb-2">
              Principais recursos que estarão disponíveis:
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-finance-text-secondary">
              <li>Projeção automática de demonstrativos financeiros</li>
              <li>Análise de cenários otimista, realista e pessimista</li>
              <li>Simulações de impacto de variáveis macroeconômicas</li>
              <li>Modelagem de novos projetos e investimentos</li>
              <li>Planejamento tributário e análise de resultados</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </ModuleDashboard>
  );
}
