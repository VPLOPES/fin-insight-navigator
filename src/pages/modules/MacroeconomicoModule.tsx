
import React, { useEffect, useState } from 'react';
import { ModuleDashboard } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { ChartLoading } from '@/components/dashboard/ChartLoading';
import { BacenService, ExchangeRate } from '@/services/bacen-api';
import { formatDate } from '@/lib/chart-utils';

// Mock data
const macroIndicators = [
  { id: 1, title: 'PIB Anual', value: 2.9, change: 0.4, suffix: '%' },
  { id: 2, title: 'Inflação', value: 4.5, change: -0.3, suffix: '%' },
  { id: 3, title: 'Taxa Selic', value: 10.75, change: -0.25, suffix: '%' },
  { id: 4, title: 'Desemprego', value: 7.8, change: -0.5, suffix: '%' },
];

const comercioData = [
  { mes: 'Jan', exportacao: 24.5, importacao: 18.2, saldo: 6.3 },
  { mes: 'Fev', exportacao: 22.8, importacao: 17.9, saldo: 4.9 },
  { mes: 'Mar', exportacao: 28.1, importacao: 20.3, saldo: 7.8 },
  { mes: 'Abr', exportacao: 26.4, importacao: 19.8, saldo: 6.6 },
  { mes: 'Mai', exportacao: 27.7, importacao: 21.5, saldo: 6.2 },
  { mes: 'Jun', exportacao: 29.3, importacao: 22.1, saldo: 7.2 },
];

const MacroeconomicoModule = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      try {
        const data = await BacenService.getExchangeRates();
        // Transformar os dados para o formato esperado pelo gráfico
        const formattedData = data.map(item => ({
          data: formatDate(item.date),
          taxa: item.value
        }));
        setExchangeRates(formattedData);
      } catch (error) {
        console.error('Erro ao buscar taxas de câmbio:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const cambioContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Taxa de Câmbio (BRL/USD)</CardTitle>
            <CardDescription>
              Últimos 30 dias - Fonte: Banco Central do Brasil
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ChartLoading height={300} />
            ) : (
              <ChartCard
                title=""
                type="line"
                data={exchangeRates}
                xAxisDataKey="data"
                categories={[
                  { key: 'taxa', name: 'BRL/USD', color: '#0D326F' },
                ]}
                height={300}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Análise de Impacto</CardTitle>
            <CardDescription>
              Impacto da variação cambial nas operações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Impacto em Importações</h3>
                <p className="text-sm text-gray-600">
                  A variação cambial recente tem impacto direto nos custos de insumos importados,
                  com potencial aumento de {isLoading ? '...' : `${(exchangeRates[0]?.taxa - exchangeRates[exchangeRates.length-1]?.taxa).toFixed(2)}%`} 
                  nos últimos 30 dias.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Impacto em Exportações</h3>
                <p className="text-sm text-gray-600">
                  Empresas exportadoras podem se beneficiar da desvalorização do Real, aumentando
                  a competitividade no mercado internacional.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Recomendação</h3>
                <p className="text-sm text-gray-600">
                  Considerar operações de hedge cambial para proteção contra volatilidade futura.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const comercioExteriorContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Balança Comercial</CardTitle>
            <CardDescription>
              Exportações, Importações e Saldo Comercial (em bilhões de USD)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartCard
              title=""
              type="bar"
              data={comercioData}
              xAxisDataKey="mes"
              categories={[
                { key: 'exportacao', name: 'Exportações', color: '#0D326F' },
                { key: 'importacao', name: 'Importações', color: '#DD571C' },
                { key: 'saldo', name: 'Saldo', color: '#00A878' },
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const principalContent = (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {macroIndicators.map((indicator) => (
          <MetricCard
            key={indicator.id}
            title={indicator.title}
            value={indicator.value}
            change={indicator.change}
            suffix={indicator.suffix}
          />
        ))}
      </div>

      {cambioContent}
    </div>
  );

  return (
    <ModuleDashboard
      title="Módulo Macroeconômico"
      description="Acompanhamento de indicadores econômicos nacionais e internacionais"
      tabs={[
        { id: 'principal', label: 'Visão Geral', content: principalContent },
        { id: 'cambio', label: 'Câmbio', content: cambioContent },
        { id: 'comercio', label: 'Comércio Exterior', content: comercioExteriorContent },
      ]}
    />
  );
};

export default MacroeconomicoModule;
