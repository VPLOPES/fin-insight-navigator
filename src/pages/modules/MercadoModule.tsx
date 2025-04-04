
import React from 'react';
import { ModuleDashboard } from '@/components/dashboard/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';

// Mock data for market intelligence
const commodityPrices = [
  { id: 1, title: 'Petróleo Brent', value: 85.27, change: 2.3, suffix: ' USD' },
  { id: 2, title: 'Minério de Ferro', value: 120.5, change: -1.8, suffix: ' USD/ton' },
  { id: 3, title: 'Soja', value: 543.75, change: 1.2, suffix: ' USD/bushel' },
  { id: 4, title: 'Açúcar', value: 0.21, change: 3.5, suffix: ' USD/lb' },
  { id: 5, title: 'Cobre', value: 4.05, change: -0.7, suffix: ' USD/lb' },
  { id: 6, title: 'Milho', value: 4.72, change: 0.5, suffix: ' USD/bushel' },
];

const oilPriceData = [
  { data: 'Jan', brent: 79.10, wti: 74.30 },
  { data: 'Fev', brent: 81.20, wti: 76.50 },
  { data: 'Mar', brent: 80.80, wti: 75.90 },
  { data: 'Abr', brent: 83.30, wti: 78.40 },
  { data: 'Mai', brent: 84.70, wti: 79.80 },
  { data: 'Jun', brent: 86.20, wti: 81.30 },
  { data: 'Jul', brent: 85.90, wti: 80.70 },
  { data: 'Ago', brent: 83.80, wti: 78.90 },
  { data: 'Set', brent: 82.50, wti: 77.60 },
  { data: 'Out', brent: 84.60, wti: 79.80 },
  { data: 'Nov', brent: 85.10, wti: 80.30 },
  { data: 'Dez', brent: 85.27, wti: 80.45 },
];

const agriculturePriceData = [
  { data: 'Jan', soja: 520, milho: 4.59, algodao: 80.2, cafe: 178.5 },
  { data: 'Fev', soja: 525, milho: 4.62, algodao: 82.1, cafe: 183.2 },
  { data: 'Mar', soja: 530, milho: 4.65, algodao: 81.8, cafe: 180.7 },
  { data: 'Abr', soja: 528, milho: 4.63, algodao: 82.6, cafe: 184.5 },
  { data: 'Mai', soja: 532, milho: 4.67, algodao: 83.4, cafe: 186.2 },
  { data: 'Jun', soja: 536, milho: 4.70, algodao: 83.9, cafe: 187.8 },
  { data: 'Jul', soja: 538, milho: 4.72, algodao: 84.1, cafe: 189.2 },
  { data: 'Ago', soja: 540, milho: 4.73, algodao: 84.8, cafe: 190.5 },
  { data: 'Set', soja: 541, milho: 4.71, algodao: 84.5, cafe: 189.8 },
  { data: 'Out', soja: 542, milho: 4.70, algodao: 83.9, cafe: 188.3 },
  { data: 'Nov', soja: 544, milho: 4.73, algodao: 84.2, cafe: 190.1 },
  { data: 'Dez', soja: 543, milho: 4.72, algodao: 84.0, cafe: 189.5 },
];

const logisticCostData = [
  { rota: 'Santos -> Shanghai', conteiners: 3800, graneis: 32.5 },
  { rota: 'Paranaguá -> Rotterdam', conteiners: 3650, graneis: 30.8 },
  { rota: 'Itajaí -> Los Angeles', conteiners: 3250, graneis: 28.3 },
  { rota: 'Rio Grande -> Dubai', conteiners: 4100, graneis: 35.2 },
  { rota: 'Vitória -> Singapura', conteiners: 3950, graneis: 33.7 },
];

const CommoditiesTab = () => (
  <>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {commodityPrices.map((commodity) => (
        <MetricCard
          key={commodity.id}
          title={commodity.title}
          value={commodity.value}
          change={commodity.change}
          suffix={commodity.suffix}
        />
      ))}
    </div>
    
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <ChartCard
        title="Evolução do Preço do Petróleo"
        type="line"
        data={oilPriceData}
        xAxisDataKey="data"
        categories={[
          { key: 'brent', name: 'Brent (USD)', color: '#0D326F' },
          { key: 'wti', name: 'WTI (USD)', color: '#F95738' },
        ]}
        info="Preços em USD por barril"
      />
      
      <ChartCard
        title="Preços de Commodities Agrícolas"
        type="line"
        data={agriculturePriceData}
        xAxisDataKey="data"
        categories={[
          { key: 'soja', name: 'Soja (USD/bushel)', color: '#00A878' },
          { key: 'cafe', name: 'Café (USD/lb)', color: '#3F72AF' },
        ]}
      />
    </div>
  </>
);

const LogisticaTab = () => (
  <>
    <div className="mb-6">
      <ChartCard
        title="Custos Logísticos por Rota"
        type="bar"
        data={logisticCostData}
        xAxisDataKey="rota"
        categories={[
          { key: 'conteiners', name: 'Contêineres (USD)', color: '#0E9AA7' },
          { key: 'graneis', name: 'Granéis (USD/ton)', color: '#3F72AF' },
        ]}
        info="Custos de transporte marítimo por tipo de carga"
        height={400}
      />
    </div>
    
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        title="Índice de Frete Global"
        value={2450}
        change={3.2}
        description="Baltic Dry Index"
      />
      <MetricCard
        title="Lead Time Médio"
        value={38}
        description="Dias - Santos para Rotterdam"
        suffix=" dias"
      />
      <MetricCard
        title="Custo Médio Terrestre"
        value={0.12}
        description="Transporte rodoviário nacional"
        suffix=" USD/ton/km"
      />
    </div>
  </>
);

export default function MercadoModule() {
  return (
    <ModuleDashboard 
      title="Módulo de Inteligência de Mercado" 
      description="Análise de preços de commodities e custos logísticos"
      tabs={[
        { id: 'commodities', label: 'Commodities', content: <CommoditiesTab /> },
        { id: 'logistica', label: 'Logística', content: <LogisticaTab /> },
      ]}
    />
  );
}
