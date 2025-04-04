
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Upload, BarChart3, TrendingUp, Globe } from "lucide-react";

interface InstructionStepProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const InstructionStep = ({ icon, title, description }: InstructionStepProps) => (
  <div className="flex items-start gap-3 mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0 border-slate-100">
    <div className="bg-finance-neutral p-2 rounded-full mt-0.5">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-finance-text-primary">{title}</h3>
      <p className="text-sm text-finance-text-secondary mt-1">{description}</p>
    </div>
  </div>
);

export function InstructionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-finance-primary" />
          Instruções de Uso
        </CardTitle>
        <CardDescription>
          Como utilizar a plataforma de inteligência financeira
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <InstructionStep 
          icon={<BarChart3 className="h-4 w-4 text-finance-primary" />}
          title="Navegação"
          description="Use o menu lateral para navegar entre os diferentes módulos da plataforma."
        />
        <InstructionStep 
          icon={<Upload className="h-4 w-4 text-finance-primary" />}
          title="Análise Financeira"
          description="Faça upload de seus dados financeiros ou use os dados de exemplo para explorar as funcionalidades."
        />
        <InstructionStep 
          icon={<Globe className="h-4 w-4 text-finance-primary" />}
          title="Inteligência de Mercado"
          description="Explore oportunidades de mercado e acompanhe indicadores de commodities."
        />
        <InstructionStep 
          icon={<TrendingUp className="h-4 w-4 text-finance-primary" />}
          title="Valuation"
          description="Ajuste premissas e realize avaliações de empresas com diferentes métodos."
        />
      </CardContent>
    </Card>
  );
}
