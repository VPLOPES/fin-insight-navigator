
import React from 'react';
import { ModuleDashboard } from '@/components/dashboard/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';

// Mock data - in a real app, this would come from an API
const financialMetrics = [
  { id: 1, title: 'Receita Total', value: 12850000, change: 8.5, format: 'currency' },
  { id: 2, title: 'EBITDA', value: 3560000, change: 12.3, format: 'currency' },
  { id: 3, title: 'Margem EBITDA', value: 27.7, change: 3.5, format: 'percentage', suffix: '%' },
  { id: 4, title: 'Lucro Líquido', value: 1950000, change: -2.4, format: 'currency' },
  { id: 5, title: 'ROE', value: 18.3, change: -1.2, format: 'percentage', suffix: '%', info: 'Retorno sobre o Patrimônio Líquido' },
  { id: 6, title: 'Índice de Liquidez', value: 2.4, change: 0.3 },
];

const revenueData = [
  { month: 'Jan', receita: 950000, custo: 560000, lucro: 390000 },
  { month: 'Fev', receita: 880000, custo: 520000, lucro: 360000 },
  { month: 'Mar', receita: 920000, custo: 540000, lucro: 380000 },
  { month: 'Abr', receita: 990000, custo: 570000, lucro: 420000 },
  { month: 'Mai', receita: 1050000, custo: 590000, lucro: 460000 },
  { month: 'Jun', receita: 1100000, custo: 620000, lucro: 480000 },
  { month: 'Jul', receita: 1180000, custo: 650000, lucro: 530000 },
  { month: 'Ago', receita: 1220000, custo: 680000, lucro: 540000 },
  { month: 'Set', receita: 1150000, custo: 660000, lucro: 490000 },
  { month: 'Out', receita: 1100000, custo: 640000, lucro: 460000 },
  { month: 'Nov', receita: 1250000, custo: 700000, lucro: 550000 },
  { month: 'Dez', receita: 1350000, custo: 750000, lucro: 600000 },
];

const balanceData = [
  { ano: '2020', ativo: 14500000, passivo: 8200000, pl: 6300000 },
  { ano: '2021', ativo: 15800000, passivo: 8900000, pl: 6900000 },
  { ano: '2022', ativo: 17200000, passivo: 9300000, pl: 7900000 },
  { ano: '2023', ativo: 18500000, passivo: 10100000, pl: 8400000 },
  { ano: '2024', ativo: 20700000, passivo: 11300000, pl: 9400000 },
];

const dupontData = [
  { ano: '2020', margemLiquida: 14.2, giroAtivo: 0.9, multiplicadorPL: 1.4, roe: 17.8 },
  { ano: '2021', margemLiquida: 14.8, giroAtivo: 0.92, multiplicadorPL: 1.42, roe: 19.3 },
  { ano: '2022', margemLiquida: 15.3, giroAtivo: 0.95, multiplicadorPL: 1.38, roe: 20.1 },
  { ano: '2023', margemLiquida: 15.1, giroAtivo: 0.93, multiplicadorPL: 1.35, roe: 19.5 },
  { ano: '2024', margemLiquida: 14.9, giroAtivo: 0.9, multiplicadorPL: 1.4, roe: 18.3 },
];

const OverviewTab = () => (
  <>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {financialMetrics.map((metric) => (
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
        title="Receita, Custo e Lucro"
        type="bar"
        data={revenueData}
        xAxisDataKey="month"
        categories={[
          { key: 'receita', name: 'Receita', color: '#0D326F' },
          { key: 'custo', name: 'Custo', color: '#F95738' },
          { key: 'lucro', name: 'Lucro', color: '#00A878' },
        ]}
      />
      
      <ChartCard
        title="Evolução do Balanço"
        type="line"
        data={balanceData}
        xAxisDataKey="ano"
        categories={[
          { key: 'ativo', name: 'Ativo Total', color: '#0E9AA7' },
          { key: 'passivo', name: 'Passivo Total', color: '#F95738' },
          { key: 'pl', name: 'Patrimônio Líquido', color: '#3F72AF' },
        ]}
      />
    </div>
  </>
);

const DupontTab = () => (
  <>
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        title="Margem Líquida"
        value={14.9}
        change={-0.2}
        format="percentage"
        suffix="%"
        info="Lucro Líquido / Receita Líquida"
      />
      <MetricCard
        title="Giro do Ativo"
        value={0.9}
        change={-0.3}
        info="Receita Líquida / Ativo Total"
      />
      <MetricCard
        title="Multiplicador de PL"
        value={1.4}
        change={0.5}
        info="Ativo Total / Patrimônio Líquido"
      />
    </div>
    
    <div className="mt-6">
      <ChartCard
        title="Análise DUPONT - Direcionadores do ROE"
        type="line"
        data={dupontData}
        xAxisDataKey="ano"
        categories={[
          { key: 'margemLiquida', name: 'Margem Líquida (%)', color: '#0D326F' },
          { key: 'giroAtivo', name: 'Giro do Ativo', color: '#0E9AA7' },
          { key: 'multiplicadorPL', name: 'Multiplicador de PL', color: '#F95738' },
          { key: 'roe', name: 'ROE (%)', color: '#00A878' },
        ]}
      />
    </div>
  </>
);

export default function FinanceiroModule() {
  return (
    <ModuleDashboard 
      title="Módulo Financeiro Corporativo" 
      description="Análise de indicadores financeiros e avaliação de performance"
      tabs={[
        { id: 'overview', label: 'Visão Geral', content: <OverviewTab /> },
        { id: 'dupont', label: 'Análise DUPONT', content: <DupontTab /> },
      ]}
    />
  );
}
