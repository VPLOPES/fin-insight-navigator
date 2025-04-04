
import React from 'react';
import { ModuleDashboard } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';

// Mock data
const valuationMetrics = [
  { id: 1, title: 'Valor da Empresa', value: 450000000, format: 'currency' },
  { id: 2, title: 'Valor por Ação', value: 45.8, change: 5.2 },
  { id: 3, title: 'P/L', value: 12.5, change: -1.8 },
  { id: 4, title: 'EV/EBITDA', value: 8.7, change: -0.5 },
];

const dcfData = [
  { ano: '2024', fluxo: 42500000 },
  { ano: '2025', fluxo: 46800000 },
  { ano: '2026', fluxo: 51400000 },
  { ano: '2027', fluxo: 56500000 },
  { ano: '2028', fluxo: 62100000 },
  { ano: 'Perpetuidade', fluxo: 310500000 },
];

const multiplosData = [
  { empresa: 'Empresa A', pl: 14.2, evebitda: 9.5 },
  { empresa: 'Empresa B', pl: 12.8, evebitda: 8.2 },
  { empresa: 'Empresa C', pl: 11.5, evebitda: 7.8 },
  { empresa: 'Empresa D', pl: 13.7, evebitda: 9.1 },
  { empresa: 'Empresa E', pl: 10.9, evebitda: 7.3 },
  { empresa: 'Média', pl: 12.6, evebitda: 8.4 },
  { empresa: 'Sua Empresa', pl: 12.5, evebitda: 8.7 },
];

const sensibilidadeData = [
  { wacc: '10.0%', g: '2.0%', valor: 412500000 },
  { wacc: '10.0%', g: '2.5%', valor: 425000000 },
  { wacc: '10.0%', g: '3.0%', valor: 437500000 },
  { wacc: '10.5%', g: '2.0%', valor: 400000000 },
  { wacc: '10.5%', g: '2.5%', valor: 412500000 },
  { wacc: '10.5%', g: '3.0%', valor: 425000000 },
  { wacc: '11.0%', g: '2.0%', valor: 387500000 },
  { wacc: '11.0%', g: '2.5%', valor: 400000000 },
  { wacc: '11.0%', g: '3.0%', valor: 412500000 },
];

// Componente para o módulo de Valuation
const ValuationModule = () => {
  // Conteúdo da tab de DCF
  const dcfContent = (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Taxa de Crescimento" value={9.5} suffix="%" />
        <MetricCard title="WACC" value={10.5} suffix="%" />
        <MetricCard title="Taxa Perpetuidade" value={2.5} suffix="%" />
        <MetricCard title="Valor Terminal" value={310500000} format="currency" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Fluxo de Caixa Projetado</CardTitle>
          <CardDescription>Valores em reais</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ height: '300px' }}>
            <ChartCard
              title=""
              type="bar"
              data={dcfData}
              xAxisDataKey="ano"
              categories={[
                { key: 'fluxo', name: 'Fluxo de Caixa', color: '#0D326F' },
              ]}
              height={300}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Conteúdo da tab de Múltiplos
  const multiplosContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comparação de Múltiplos</CardTitle>
          <CardDescription>Comparativo com empresas do setor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium text-sm">Empresa</th>
                  <th className="pb-2 font-medium text-sm">P/L</th>
                  <th className="pb-2 font-medium text-sm">EV/EBITDA</th>
                </tr>
              </thead>
              <tbody>
                {multiplosData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b ${item.empresa === 'Sua Empresa' ? 'bg-slate-50' : ''} ${item.empresa === 'Média' ? 'font-medium' : ''}`}
                  >
                    <td className="py-2">{item.empresa}</td>
                    <td className="py-2">{item.pl.toFixed(1)}</td>
                    <td className="py-2">{item.evebitda.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Conteúdo da tab de Sensibilidade
  const sensibilidadeContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análise de Sensibilidade</CardTitle>
          <CardDescription>Impacto de WACC e Taxa de Crescimento no Valor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium text-sm">WACC / g</th>
                  <th className="pb-2 font-medium text-sm">g = 2.0%</th>
                  <th className="pb-2 font-medium text-sm">g = 2.5%</th>
                  <th className="pb-2 font-medium text-sm">g = 3.0%</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">10.0%</td>
                  <td className="py-2">R$ 412.5M</td>
                  <td className="py-2">R$ 425.0M</td>
                  <td className="py-2">R$ 437.5M</td>
                </tr>
                <tr className="border-b bg-slate-50">
                  <td className="py-2 font-medium">10.5%</td>
                  <td className="py-2">R$ 400.0M</td>
                  <td className="py-2">R$ 412.5M</td>
                  <td className="py-2">R$ 425.0M</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">11.0%</td>
                  <td className="py-2">R$ 387.5M</td>
                  <td className="py-2">R$ 400.0M</td>
                  <td className="py-2">R$ 412.5M</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Conteúdo principal (overview)
  const principalContent = (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {valuationMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            format={metric.format as any}
          />
        ))}
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Métodos de Valuation</CardTitle>
            <CardDescription>Comparação entre diferentes métodos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-md">
                <p className="text-sm font-medium">DCF</p>
                <p className="text-xl font-bold">R$ 450 milhões</p>
                <div className="w-full bg-slate-200 h-2 mt-2 rounded-full overflow-hidden">
                  <div className="bg-finance-primary h-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-md">
                <p className="text-sm font-medium">Múltiplos de Mercado</p>
                <p className="text-xl font-bold">R$ 430 milhões</p>
                <div className="w-full bg-slate-200 h-2 mt-2 rounded-full overflow-hidden">
                  <div className="bg-finance-primary h-full" style={{width: '95%'}}></div>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-md">
                <p className="text-sm font-medium">Valor Patrimonial</p>
                <p className="text-xl font-bold">R$ 380 milhões</p>
                <div className="w-full bg-slate-200 h-2 mt-2 rounded-full overflow-hidden">
                  <div className="bg-finance-primary h-full" style={{width: '84%'}}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Premissas-Chave</CardTitle>
            <CardDescription>Parâmetros utilizados no valuation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-sm">Taxa de Crescimento</span>
                <span className="font-medium">9.5%</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-sm">WACC</span>
                <span className="font-medium">10.5%</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-sm">Taxa Perpetuidade</span>
                <span className="font-medium">2.5%</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-sm">Margem EBITDA</span>
                <span className="font-medium">27.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Dívida Líquida</span>
                <span className="font-medium">R$ 85 milhões</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <ModuleDashboard
      title="Valuation"
      description="Avaliação por métodos de Fluxo de Caixa Descontado e múltiplos"
      tabs={[
        { id: 'principal', label: 'Visão Geral', content: principalContent },
        { id: 'dcf', label: 'DCF', content: dcfContent },
        { id: 'multiplos', label: 'Múltiplos', content: multiplosContent },
        { id: 'sensibilidade', label: 'Sensibilidade', content: sensibilidadeContent },
      ]}
    />
  );
};

export default ValuationModule;
