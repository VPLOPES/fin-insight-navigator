
import React from 'react';
import { ModuleDashboard } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';

// Mock data
const commodityMetrics = [
  { id: 1, title: 'Petróleo Brent', value: 85.4, change: 3.2, suffix: 'USD' },
  { id: 2, title: 'Minério de Ferro', value: 120.7, change: 5.1, suffix: 'USD' },
  { id: 3, title: 'Soja', value: 552.3, change: -1.8, suffix: 'USD' },
  { id: 4, title: 'Milho', value: 175.8, change: -2.5, suffix: 'USD' },
];

const oilData = [
  { mes: 'Jan', preco: 75.2 },
  { mes: 'Fev', preco: 78.5 },
  { mes: 'Mar', preco: 80.1 },
  { mes: 'Abr', preco: 82.7 },
  { mes: 'Mai', preco: 83.2 },
  { mes: 'Jun', preco: 85.4 },
];

const ironData = [
  { mes: 'Jan', preco: 105.3 },
  { mes: 'Fev', preco: 108.7 },
  { mes: 'Mar', preco: 112.4 },
  { mes: 'Abr', preco: 115.6 },
  { mes: 'Mai', preco: 118.9 },
  { mes: 'Jun', preco: 120.7 },
];

const agriData = [
  { mes: 'Jan', soja: 560.2, milho: 182.3 },
  { mes: 'Fev', soja: 558.7, milho: 180.5 },
  { mes: 'Mar', soja: 554.9, milho: 178.7 },
  { mes: 'Abr', soja: 555.8, milho: 177.2 },
  { mes: 'Mai', soja: 553.6, milho: 176.3 },
  { mes: 'Jun', soja: 552.3, milho: 175.8 },
];

const freightData = [
  { rota: 'Santos-Shanghai', valor: 38.5, variacao: 2.5 },
  { rota: 'Santos-Rotterdam', valor: 27.8, variacao: 1.8 },
  { rota: 'Paranaguá-Dubai', valor: 35.2, variacao: 3.1 },
  { rota: 'Itajaí-Nova York', valor: 22.4, variacao: -0.5 },
];

// Componente para o módulo de Inteligência de Mercado
const MercadoModule = () => {
  // Conteúdo da tab de Energia
  const energiaContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Preço do Petróleo (Brent)</CardTitle>
          <CardDescription>Últimos 6 meses (USD/barril)</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: '300px' }}>
            <ChartCard
              title=""
              type="line"
              data={oilData}
              xAxisDataKey="mes"
              categories={[
                { key: 'preco', name: 'Preço (USD)', color: '#0D326F' },
              ]}
              height={300}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Conteúdo da tab de Mineração
  const mineracaoContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Preço do Minério de Ferro</CardTitle>
          <CardDescription>Últimos 6 meses (USD/tonelada)</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: '300px' }}>
            <ChartCard
              title=""
              type="line"
              data={ironData}
              xAxisDataKey="mes"
              categories={[
                { key: 'preco', name: 'Preço (USD)', color: '#0D326F' },
              ]}
              height={300}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Conteúdo da tab de Agronegócio
  const agroContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Preço de Commodities Agrícolas</CardTitle>
          <CardDescription>Últimos 6 meses (USD/bushel)</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: '300px' }}>
            <ChartCard
              title=""
              type="line"
              data={agriData}
              xAxisDataKey="mes"
              categories={[
                { key: 'soja', name: 'Soja', color: '#0D326F' },
                { key: 'milho', name: 'Milho', color: '#00A878' },
              ]}
              height={300}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Conteúdo da tab de Frete
  const freteContent = (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Custos de Frete Marítimo</CardTitle>
            <CardDescription>Principais rotas (USD/container)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {freightData.map((freight, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">{freight.rota}</p>
                    <p className="text-sm text-gray-500">USD {freight.valor}k / container</p>
                  </div>
                  <div className={`text-sm ${freight.variacao > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {freight.variacao > 0 ? '+' : ''}{freight.variacao}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Conteúdo principal (overview)
  const principalContent = (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {commodityMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            suffix={metric.suffix}
          />
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Energia</CardTitle>
            <CardDescription>Preço do Petróleo Brent (USD/barril)</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: '200px' }}>
              <ChartCard
                title=""
                type="line"
                data={oilData}
                xAxisDataKey="mes"
                categories={[
                  { key: 'preco', name: 'Preço (USD)', color: '#0D326F' },
                ]}
                height={200}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agronegócio</CardTitle>
            <CardDescription>Preço da Soja (USD/bushel)</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: '200px' }}>
              <ChartCard
                title=""
                type="line"
                data={agriData}
                xAxisDataKey="mes"
                categories={[
                  { key: 'soja', name: 'Soja', color: '#0D326F' },
                ]}
                height={200}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <ModuleDashboard
      title="Inteligência de Mercado"
      description="Acompanhamento de preços de commodities e custos logísticos"
      tabs={[
        { id: 'principal', label: 'Visão Geral', content: principalContent },
        { id: 'energia', label: 'Energia', content: energiaContent },
        { id: 'mineracao', label: 'Mineração', content: mineracaoContent },
        { id: 'agro', label: 'Agronegócio', content: agroContent },
        { id: 'frete', label: 'Frete', content: freteContent },
      ]}
    />
  );
};

export default MercadoModule;
