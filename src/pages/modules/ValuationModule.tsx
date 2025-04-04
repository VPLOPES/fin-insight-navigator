
import React, { useState } from 'react';
import { ModuleDashboard } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Calculator, BarChart3, Settings } from "lucide-react";

// Dados de exemplo para o módulo de Valuation
const historicalFCF = [
  { year: '2018', fcf: 4200000 },
  { year: '2019', fcf: 4500000 },
  { year: '2020', fcf: 3800000 },
  { year: '2021', fcf: 5100000 },
  { year: '2022', fcf: 5800000 },
  { year: '2023', fcf: 6200000 },
];

const fcfProjection = [
  { year: '2023', fcf: 6200000 },
  { year: '2024', fcf: 6800000 },
  { year: '2025', fcf: 7500000 },
  { year: '2026', fcf: 8200000 },
  { year: '2027', fcf: 9000000 },
  { year: '2028', fcf: 9800000 },
];

const multiples = [
  { name: 'P/L', company: 15.8, sector: 14.2, industry: 16.5 },
  { name: 'P/VPA', company: 2.3, sector: 2.1, industry: 2.5 },
  { name: 'EV/EBITDA', company: 8.6, sector: 7.9, industry: 8.8 },
  { name: 'EV/EBIT', company: 11.2, sector: 10.5, industry: 11.8 },
  { name: 'ROIC', company: 12.5, sector: 11.8, industry: 13.2 },
];

const multiplesBenchmark = multiples.map(item => ({
  name: item.name,
  company: item.company,
  benchmark: (item.sector + item.industry) / 2
}));

const ValuationModule: React.FC = () => {
  const [growthRate, setGrowthRate] = useState(5);
  const [wacc, setWacc] = useState(10);
  const [perpetuityGrowth, setPerpetuityGrowth] = useState(3);
  
  // Calcular o valor intrínseco baseado nas entradas (simulação simples)
  const calculateIntrinsicValue = () => {
    const terminalValue = fcfProjection[fcfProjection.length - 1].fcf * (1 + perpetuityGrowth / 100) / (wacc / 100 - perpetuityGrowth / 100);
    
    let pvFCF = 0;
    for (let i = 0; i < fcfProjection.length; i++) {
      pvFCF += fcfProjection[i].fcf / Math.pow(1 + wacc / 100, i + 1);
    }
    
    const pvTV = terminalValue / Math.pow(1 + wacc / 100, fcfProjection.length);
    
    return {
      enterpriseValue: pvFCF + pvTV,
      pvFCF: pvFCF,
      pvTV: pvTV
    };
  };
  
  const valuationResult = calculateIntrinsicValue();
  
  // Calcular métricas de sensibilidade
  const sensitivityWacc = [
    { wacc: (wacc - 2) + "%", value: calculateIntrinsicValue().enterpriseValue * 1.25 },
    { wacc: (wacc - 1) + "%", value: calculateIntrinsicValue().enterpriseValue * 1.12 },
    { wacc: wacc + "%", value: calculateIntrinsicValue().enterpriseValue },
    { wacc: (wacc + 1) + "%", value: calculateIntrinsicValue().enterpriseValue * 0.9 },
    { wacc: (wacc + 2) + "%", value: calculateIntrinsicValue().enterpriseValue * 0.82 },
  ];

  const dcfDashboardContent = (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Valor da Empresa"
          value={valuationResult.enterpriseValue}
          format="currency"
          icon="currency"
        />
        <MetricCard
          title="VP dos FCLs"
          value={valuationResult.pvFCF}
          format="currency"
          icon="currency"
        />
        <MetricCard
          title="VP do Valor Terminal"
          value={valuationResult.pvTV}
          format="currency" 
          icon="currency"
        />
        <MetricCard
          title="% Valor Terminal"
          value={(valuationResult.pvTV / valuationResult.enterpriseValue) * 100}
          format="percentage"
          suffix="%"
          icon="percentage"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Fluxo de Caixa Histórico</CardTitle>
            <CardDescription>Fluxos de caixa livres dos últimos 6 anos</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartCard
              title=""
              type="bar"
              data={historicalFCF}
              xAxisDataKey="year"
              categories={[{ key: 'fcf', name: 'FCL', color: '#0D326F' }]}
              height={250}
              formatValue="currency"
              allowTypeChange
            />
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Projeção de Fluxo de Caixa</CardTitle>
            <CardDescription>Projeção de FCL para os próximos 5 anos</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartCard
              title=""
              type="line"
              data={fcfProjection}
              xAxisDataKey="year"
              categories={[{ key: 'fcf', name: 'FCL Projetado', color: '#0E9AA7' }]}
              height={250}
              formatValue="currency"
              allowTypeChange
            />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Parâmetros do Modelo DCF</CardTitle>
          <CardDescription>Ajuste as premissas para análise de sensibilidade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Taxa de Crescimento</label>
                <span className="text-sm">{growthRate}%</span>
              </div>
              <Slider
                value={[growthRate]}
                min={0}
                max={20}
                step={0.5}
                onValueChange={value => setGrowthRate(value[0])}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground">
                Taxa de crescimento anual dos fluxos de caixa projetados
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">WACC</label>
                <span className="text-sm">{wacc}%</span>
              </div>
              <Slider
                value={[wacc]}
                min={5}
                max={20}
                step={0.5}
                onValueChange={value => setWacc(value[0])}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground">
                Custo médio ponderado de capital
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Crescimento Perpétuo</label>
                <span className="text-sm">{perpetuityGrowth}%</span>
              </div>
              <Slider
                value={[perpetuityGrowth]}
                min={0}
                max={5}
                step={0.1}
                onValueChange={value => setPerpetuityGrowth(value[0])}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground">
                Taxa de crescimento na perpetuidade
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Análise de Sensibilidade - WACC</h4>
            <ChartCard
              title=""
              type="bar"
              data={sensitivityWacc}
              xAxisDataKey="wacc"
              categories={[{ key: 'value', name: 'Valor da Empresa', color: '#3F72AF' }]}
              height={200}
              formatValue="currency"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="btn-highlight ml-auto">
            <Calculator className="mr-2 h-4 w-4" />
            Recalcular Valuation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  const multiplosDashboardContent = (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="P/L"
          value={15.8}
          change={1.6}
          icon="chart"
        />
        <MetricCard
          title="EV/EBITDA"
          value={8.6}
          change={0.7}
          icon="chart"
        />
        <MetricCard
          title="P/VPA"
          value={2.3}
          change={0.2}
          icon="chart"
        />
        <MetricCard
          title="ROIC"
          value={12.5}
          suffix="%"
          format="percentage"
          change={0.7}
          icon="percentage"
        />
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Comparativo de Múltiplos</CardTitle>
          <CardDescription>Comparação com setor e indústria</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartCard
            title=""
            type="bar"
            data={multiples}
            xAxisDataKey="name"
            categories={[
              { key: 'company', name: 'Empresa', color: '#0D326F' },
              { key: 'sector', name: 'Setor', color: '#8DA9C4' },
              { key: 'industry', name: 'Indústria', color: '#134074' }
            ]}
            height={300}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Benchmark de Múltiplos</CardTitle>
          <CardDescription>Comparação da empresa com benchmark do mercado</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartCard
            title=""
            type="bar"
            data={multiplesBenchmark}
            xAxisDataKey="name"
            categories={[
              { key: 'company', name: 'Empresa', color: '#0E9AA7' },
              { key: 'benchmark', name: 'Benchmark', color: '#334E68' }
            ]}
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ModuleDashboard 
      title="Valuation" 
      description="Avaliação por métodos de Fluxo de Caixa Descontado e múltiplos"
      tabs={[
        { id: 'dcf', label: 'Fluxo de Caixa Descontado', content: dcfDashboardContent },
        { id: 'multiplos', label: 'Análise por Múltiplos', content: multiplosDashboardContent },
        { id: 'relatorio', label: 'Relatório de Avaliação', content: <div>Conteúdo em desenvolvimento</div> }
      ]}
    >
      {dcfDashboardContent}
    </ModuleDashboard>
  );
};

export default ValuationModule;
