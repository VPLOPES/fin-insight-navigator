
import React from 'react';
import { ModuleDashboard } from '@/components/dashboard/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';

// Mock data for a financial valuation
const valuationMetrics = [
  { id: 1, title: 'Valor da Empresa (EV)', value: 124500000, format: 'currency' },
  { id: 2, title: 'Valor de Mercado', value: 98700000, format: 'currency' },
  { id: 3, title: 'EV/EBITDA', value: 8.4, change: -0.3 },
  { id: 4, title: 'P/L', value: 12.3, change: 0.8 },
  { id: 5, title: 'WACC', value: 10.5, format: 'percentage', suffix: '%' },
  { id: 6, title: 'Taxa de Crescimento Perpetuidade', value: 3.5, format: 'percentage', suffix: '%' },
];

const dcfData = [
  { ano: '2025', fluxoCaixa: 4200000, fluxoDescontado: 3800000 },
  { ano: '2026', fluxoCaixa: 4500000, fluxoDescontado: 3700000 },
  { ano: '2027', fluxoCaixa: 4900000, fluxoDescontado: 3600000 },
  { ano: '2028', fluxoCaixa: 5300000, fluxoDescontado: 3500000 },
  { ano: '2029', fluxoCaixa: 5800000, fluxoDescontado: 3400000 },
  { ano: 'Valor Terminal', fluxoCaixa: 105000000, fluxoDescontado: 62000000 },
];

const sensibilityWACC = [
  { wacc: '9.5%', valor: 135000000 },
  { wacc: '10.0%', valor: 129800000 },
  { wacc: '10.5%', valor: 124500000 },
  { wacc: '11.0%', valor: 119700000 },
  { wacc: '11.5%', valor: 115200000 },
];

const sensibilityGrowth = [
  { growth: '2.5%', valor: 115000000 },
  { growth: '3.0%', valor: 119800000 },
  { growth: '3.5%', valor: 124500000 },
  { growth: '4.0%', valor: 130000000 },
  { growth: '4.5%', valor: 136200000 },
];

const multiplesBenchmark = [
  { empresa: 'Empresa A', evEbitda: 7.8, pl: 11.5, roic: 18.3 },
  { empresa: 'Empresa B', evEbitda: 8.2, pl: 12.7, roic: 16.8 },
  { empresa: 'Empresa C', evEbitda: 9.5, pl: 14.2, roic: 15.3 },
  { empresa: 'Sua Empresa', evEbitda: 8.4, pl: 12.3, roic: 17.5 },
  { empresa: 'Empresa D', evEbitda: 7.6, pl: 11.9, roic: 16.2 },
  { empresa: 'Empresa E', evEbitda: 8.9, pl: 13.5, roic: 14.8 },
];

const DCFTab = () => (
  <>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {valuationMetrics.map((metric) => (
        <MetricCard
          key={metric.id}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          format={metric.format as any}
          suffix={metric.suffix}
          info={metric.info}
        />
      ))}
    </div>
    
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <ChartCard
        title="Projeção de Fluxo de Caixa Descontado"
        type="bar"
        data={dcfData}
        xAxisDataKey="ano"
        categories={[
          { key: 'fluxoCaixa', name: 'Fluxo de Caixa', color: '#3F72AF' },
          { key: 'fluxoDescontado', name: 'Fluxo Descontado', color: '#0D326F' },
        ]}
      />
      
      <ChartCard
        title="Análise de Sensibilidade - WACC"
        type="line"
        data={sensibilityWACC}
        xAxisDataKey="wacc"
        categories={[
          { key: 'valor', name: 'Valor da Empresa', color: '#0E9AA7' },
        ]}
        info="Impacto da variação do WACC no valor da empresa"
      />
    </div>

    <div className="mt-6">
      <ChartCard
        title="Análise de Sensibilidade - Taxa de Crescimento na Perpetuidade"
        type="area"
        data={sensibilityGrowth}
        xAxisDataKey="growth"
        categories={[
          { key: 'valor', name: 'Valor da Empresa', color: '#00A878' },
        ]}
        info="Impacto da variação da taxa de crescimento na perpetuidade no valor da empresa"
      />
    </div>
  </>
);

const MultiplosTab = () => (
  <>
    <div className="mb-6">
      <ChartCard
        title="Análise de Múltiplos de Mercado"
        type="bar"
        data={multiplesBenchmark}
        xAxisDataKey="empresa"
        categories={[
          { key: 'evEbitda', name: 'EV/EBITDA', color: '#0D326F' },
          { key: 'pl', name: 'P/L', color: '#0E9AA7' },
          { key: 'roic', name: 'ROIC (%)', color: '#00A878' },
        ]}
        info="Comparação com empresas do setor"
        height={400}
      />
    </div>
    
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        title="Valor por EV/EBITDA"
        value={121800000}
        description="Baseado na média do setor (8.2x)"
        format="currency"
      />
      <MetricCard
        title="Valor por P/L"
        value={118500000}
        description="Baseado na média do setor (12.7x)"
        format="currency"
      />
      <MetricCard
        title="Valor Médio por Múltiplos"
        value={120150000}
        description="Média dos métodos de valuation por múltiplos"
        format="currency"
      />
    </div>
  </>
);

export default function ValuationModule() {
  return (
    <ModuleDashboard 
      title="Módulo de Valuation" 
      description="Avaliação da empresa por diferentes metodologias"
      tabs={[
        { id: 'dcf', label: 'Fluxo de Caixa Descontado', content: <DCFTab /> },
        { id: 'multiplos', label: 'Análise por Múltiplos', content: <MultiplosTab /> },
      ]}
    />
  );
}
