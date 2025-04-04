import React, { useEffect, useState } from 'react';
import { ModuleDashboard } from '@/components/dashboard/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { BacenService, ExchangeRate } from '@/services/bacen-api';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/chart-utils';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

// Mock data for macroeconomic indicators
const economicIndicators = [
  { id: 1, title: 'PIB Brasil (var. anual)', value: 2.8, change: 0.3, format: 'percentage', suffix: '%', info: 'Variação do PIB em relação ao ano anterior' },
  { id: 2, title: 'Inflação (IPCA)', value: 4.2, change: -0.5, format: 'percentage', suffix: '%' },
  { id: 3, title: 'Taxa Selic', value: 10.75, change: -0.25, format: 'percentage', suffix: '%' },
  { id: 5, title: 'Dívida/PIB', value: 78.3, change: 0.8, format: 'percentage', suffix: '%' },
  { id: 6, title: 'Desemprego', value: 7.8, change: -0.4, format: 'percentage', suffix: '%' },
];

const gdpSectorData = [
  { setor: 'Agropecuária', contribuicao: 27.8 },
  { setor: 'Indústria', contribuicao: 20.4 },
  { setor: 'Comércio', contribuicao: 15.2 },
  { setor: 'Serviços', contribuicao: 19.5 },
  { setor: 'Construção', contribuicao: 6.3 },
  { setor: 'Outros', contribuicao: 10.8 },
];

const inflationData = [
  { mes: 'Jan', ipca: 0.52, igpm: 0.47 },
  { mes: 'Fev', ipca: 0.48, igpm: 0.53 },
  { mes: 'Mar', ipca: 0.37, igpm: 0.42 },
  { mes: 'Abr', ipca: 0.41, igpm: 0.35 },
  { mes: 'Mai', ipca: 0.33, igpm: 0.40 },
  { mes: 'Jun', ipca: 0.29, igpm: 0.32 },
  { mes: 'Jul', ipca: 0.38, igpm: 0.45 },
  { mes: 'Ago', ipca: 0.43, igpm: 0.51 },
  { mes: 'Set', ipca: 0.35, igpm: 0.37 },
  { mes: 'Out', ipca: 0.28, igpm: 0.31 },
  { mes: 'Nov', ipca: 0.32, igpm: 0.38 },
  { mes: 'Dez', ipca: 0.44, igpm: 0.48 },
];

const interestRateData = [
  { data: 'Jan 23', taxa: 13.75 },
  { data: 'Mar 23', taxa: 13.75 },
  { data: 'Mai 23', taxa: 13.75 },
  { data: 'Jul 23', taxa: 13.25 },
  { data: 'Set 23', taxa: 12.75 },
  { data: 'Nov 23', taxa: 12.25 },
  { data: 'Jan 24', taxa: 11.75 },
  { data: 'Mar 24', taxa: 11.25 },
  { data: 'Mai 24', taxa: 10.75 },
];

const tradeBalanceData = [
  { mes: 'Jan', exportacoes: 23.1, importacoes: 18.2, saldo: 4.9 },
  { mes: 'Fev', exportacoes: 22.4, importacoes: 17.8, saldo: 4.6 },
  { mes: 'Mar', exportacoes: 24.5, importacoes: 19.2, saldo: 5.3 },
  { mes: 'Abr', exportacoes: 23.8, importacoes: 18.6, saldo: 5.2 },
  { mes: 'Mai', exportacoes: 25.6, importacoes: 19.8, saldo: 5.8 },
  { mes: 'Jun', exportacoes: 26.2, importacoes: 20.4, saldo: 5.8 },
  { mes: 'Jul', exportacoes: 25.8, importacoes: 20.1, saldo: 5.7 },
  { mes: 'Ago', exportacoes: 27.3, importacoes: 21.2, saldo: 6.1 },
  { mes: 'Set', exportacoes: 26.9, importacoes: 21.0, saldo: 5.9 },
  { mes: 'Out', exportacoes: 25.7, importacoes: 20.3, saldo: 5.4 },
  { mes: 'Nov', exportacoes: 24.8, importacoes: 19.5, saldo: 5.3 },
  { mes: 'Dez', exportacoes: 26.5, importacoes: 20.8, saldo: 5.7 },
];

const IndicadoresTab = () => {
  const { data: exchangeRates, isLoading, error } = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: () => BacenService.getExchangeRates(30),
  });

  const calculateExchangeRateChange = () => {
    if (!exchangeRates || exchangeRates.length < 2) return 0;
    
    const lastValue = exchangeRates[exchangeRates.length - 1].value;
    const previousValue = exchangeRates[exchangeRates.length - 2].value;
    
    return ((lastValue - previousValue) / previousValue) * 100;
  };

  const exchangeRateChartData = React.useMemo(() => {
    if (!exchangeRates) return [];
    
    return exchangeRates.map(item => ({
      data: item.date,
      taxa: item.value
    }));
  }, [exchangeRates]);

  const currentExchangeRate = exchangeRates && exchangeRates.length > 0 
    ? exchangeRates[exchangeRates.length - 1].value 
    : 0;

  const exchangeRateChange = calculateExchangeRateChange();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {economicIndicators.map((indicator) => (
          <MetricCard
            key={indicator.id}
            title={indicator.title}
            value={indicator.value}
            change={indicator.change}
            format={indicator.format as any}
            suffix={indicator.suffix}
            info={indicator.info}
          />
        ))}

        <MetricCard
          key="exchange-rate"
          title="Taxa de Câmbio (BRL/USD)"
          value={isLoading ? "Carregando..." : currentExchangeRate}
          change={exchangeRateChange}
          info="Fonte: Banco Central do Brasil (PTAX venda)"
          format="number"
        />
      </div>
      
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Índices de Inflação"
          type="line"
          data={inflationData}
          xAxisDataKey="mes"
          categories={[
            { key: 'ipca', name: 'IPCA', color: '#0D326F' },
            { key: 'igpm', name: 'IGP-M', color: '#F95738' },
          ]}
        />
        
        <ChartCard
          title="Evolução da Taxa Selic"
          type="area"
          data={interestRateData}
          xAxisDataKey="data"
          categories={[
            { key: 'taxa', name: 'Taxa Selic (%)', color: '#0E9AA7' },
          ]}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Contribuição por Setor no PIB"
          type="bar"
          data={gdpSectorData}
          xAxisDataKey="setor"
          categories={[
            { key: 'contribuicao', name: 'Contribuição (%)', color: '#3F72AF' },
          ]}
        />
        
        <ChartCard
          title="Balança Comercial (US$ bilhões)"
          type="line"
          data={tradeBalanceData}
          xAxisDataKey="mes"
          categories={[
            { key: 'exportacoes', name: 'Exportações', color: '#00A878' },
            { key: 'importacoes', name: 'Importações', color: '#F95738' },
            { key: 'saldo', name: 'Saldo', color: '#3F72AF' },
          ]}
        />
      </div>

      <div className="mt-6">
        <ChartCard
          title="Evolução da Taxa de Câmbio BRL/USD (últimos 30 dias)"
          type="line"
          data={exchangeRateChartData}
          xAxisDataKey="data"
          categories={[
            { key: 'taxa', name: 'BRL/USD', color: '#0D326F' },
          ]}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default function MacroeconomicoModule() {
  return (
    <ModuleDashboard 
      title="Módulo Macroeconômico" 
      description="Acompanhamento dos principais indicadores da economia"
      tabs={[
        { id: 'indicators', label: 'Indicadores', content: <IndicadoresTab /> },
      ]}
    />
  );
}
