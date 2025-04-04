
import React, { useState } from 'react';
import { ModuleDashboard } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Download, Upload, Calendar, Filter } from "lucide-react";

// Dados simulados para commodities
const oilPriceData = [
  { date: 'Jan', wti: 76.84, brent: 81.25 },
  { date: 'Fev', wti: 77.21, brent: 83.65 },
  { date: 'Mar', wti: 78.54, brent: 84.29 },
  { date: 'Abr', wti: 80.12, brent: 85.68 },
  { date: 'Mai', wti: 82.47, brent: 87.92 },
  { date: 'Jun', wti: 80.33, brent: 85.14 },
  { date: 'Jul', wti: 78.95, brent: 84.37 },
  { date: 'Ago', wti: 81.63, brent: 86.72 },
  { date: 'Set', wti: 83.54, brent: 88.45 },
  { date: 'Out', wti: 84.72, brent: 89.33 },
  { date: 'Nov', wti: 82.15, brent: 86.84 },
  { date: 'Dez', wti: 81.53, brent: 85.91 },
];

const agriculturalData = [
  { date: 'Jan', soybean: 1250, corn: 420, wheat: 580 },
  { date: 'Fev', soybean: 1230, corn: 425, wheat: 585 },
  { date: 'Mar', soybean: 1245, corn: 430, wheat: 570 },
  { date: 'Abr', soybean: 1260, corn: 435, wheat: 575 },
  { date: 'Mai', soybean: 1275, corn: 440, wheat: 590 },
  { date: 'Jun', soybean: 1290, corn: 445, wheat: 595 },
  { date: 'Jul', soybean: 1310, corn: 450, wheat: 600 },
  { date: 'Ago', soybean: 1330, corn: 455, wheat: 610 },
  { date: 'Set', soybean: 1320, corn: 460, wheat: 615 },
  { date: 'Out', soybean: 1315, corn: 465, wheat: 620 },
  { date: 'Nov', soybean: 1300, corn: 470, wheat: 625 },
  { date: 'Dez', soybean: 1295, corn: 475, wheat: 630 },
];

const metalData = [
  { date: 'Jan', gold: 1840, silver: 24.5, copper: 4.1 },
  { date: 'Fev', gold: 1865, silver: 24.8, copper: 4.2 },
  { date: 'Mar', gold: 1900, silver: 25.1, copper: 4.3 },
  { date: 'Abr', gold: 1925, silver: 25.3, copper: 4.4 },
  { date: 'Mai', gold: 1950, silver: 25.6, copper: 4.5 },
  { date: 'Jun', gold: 1975, silver: 26.0, copper: 4.6 },
  { date: 'Jul', gold: 2000, silver: 26.3, copper: 4.7 },
  { date: 'Ago', gold: 2025, silver: 26.7, copper: 4.8 },
  { date: 'Set', gold: 2050, silver: 27.0, copper: 4.9 },
  { date: 'Out', gold: 2070, silver: 27.3, copper: 5.0 },
  { date: 'Nov', gold: 2085, silver: 27.7, copper: 5.1 },
  { date: 'Dez', gold: 2100, silver: 28.0, copper: 5.2 },
];

const freightIndex = [
  { date: 'Jan', maritime: 1100, rail: 850, road: 920 },
  { date: 'Fev', maritime: 1120, rail: 860, road: 930 },
  { date: 'Mar', maritime: 1150, rail: 870, road: 940 },
  { date: 'Abr', maritime: 1200, rail: 880, road: 950 },
  { date: 'Mai', maritime: 1250, rail: 890, road: 960 },
  { date: 'Jun', maritime: 1300, rail: 900, road: 970 },
  { date: 'Jul', maritime: 1350, rail: 910, road: 980 },
  { date: 'Ago', maritime: 1400, rail: 920, road: 990 },
  { date: 'Set', maritime: 1450, rail: 930, road: 1000 },
  { date: 'Out', maritime: 1480, rail: 940, road: 1010 },
  { date: 'Nov', maritime: 1520, rail: 950, road: 1020 },
  { date: 'Dez', maritime: 1550, rail: 960, road: 1030 },
];

const MercadoModule: React.FC = () => {
  const [timeframe, setTimeframe] = useState("12m");
  
  const commoditiesDashboardContent = (
    <div className="space-y-6">
      {/* Controles do painel */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap justify-between gap-4 items-center">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Período:</span>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3m">3 meses</SelectItem>
                  <SelectItem value="6m">6 meses</SelectItem>
                  <SelectItem value="12m">12 meses</SelectItem>
                  <SelectItem value="36m">36 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas de preços atuais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Petróleo Brent"
          value={85.91}
          change={0.42}
          prefix="US$ "
          icon="currency"
        />
        <MetricCard
          title="Ouro"
          value={2100}
          change={1.23}
          prefix="US$ "
          icon="currency"
        />
        <MetricCard
          title="Soja"
          value={1295}
          change={-0.38}
          prefix="US$ "
          icon="currency"
        />
        <MetricCard
          title="Índice Frete"
          value={1550}
          change={1.97}
          prefix="US$ "
          icon="chart"
        />
      </div>

      {/* Gráficos de commodities */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Preços do Petróleo"
          type="line"
          data={oilPriceData}
          xAxisDataKey="date"
          categories={[
            { key: 'wti', name: 'WTI', color: '#D63031' },
            { key: 'brent', name: 'Brent', color: '#E17055' },
          ]}
          height={300}
          formatValue="currency"
          allowTypeChange
          info="Preço do barril em USD"
        />
        <ChartCard
          title="Preços de Metais"
          type="line"
          data={metalData}
          xAxisDataKey="date"
          categories={[
            { key: 'gold', name: 'Ouro', color: '#FDCB6E' },
            { key: 'silver', name: 'Prata', color: '#B2BEC3' },
            { key: 'copper', name: 'Cobre', color: '#E67E22' },
          ]}
          height={300}
          formatValue="currency"
          allowTypeChange
          info="Preço por onça (ouro/prata) e por libra (cobre) em USD"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Preços Agrícolas"
          type="line"
          data={agriculturalData}
          xAxisDataKey="date"
          categories={[
            { key: 'soybean', name: 'Soja', color: '#27AE60' },
            { key: 'corn', name: 'Milho', color: '#F1C40F' },
            { key: 'wheat', name: 'Trigo', color: '#E1C16E' },
          ]}
          height={300}
          formatValue="currency"
          allowTypeChange
          info="Preço por bushel em USD"
        />
        <ChartCard
          title="Índice de Frete"
          type="bar"
          data={freightIndex}
          xAxisDataKey="date"
          categories={[
            { key: 'maritime', name: 'Marítimo', color: '#2980B9' },
            { key: 'rail', name: 'Ferroviário', color: '#8E44AD' },
            { key: 'road', name: 'Rodoviário', color: '#E74C3C' },
          ]}
          height={300}
          formatValue="currency"
          allowTypeChange
          info="Índice de custo de frete (base 100 = Jan 2020)"
        />
      </div>

      {/* Análise de correlação */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Correlação de Preços</CardTitle>
          <CardDescription>
            Correlação entre preços de commodities e impacto nos custos logísticos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            O aumento de 10% no preço do petróleo está correlacionado com um aumento médio de 4.3% 
            nos custos de frete marítimo e 2.8% nos fretes rodoviários no último trimestre.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Petróleo × Frete Marítimo</span>
              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-finance-primary h-full" style={{ width: "78%" }}></div>
              </div>
              <span className="text-sm font-medium">0.78</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Petróleo × Frete Rodoviário</span>
              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-finance-primary h-full" style={{ width: "63%" }}></div>
              </div>
              <span className="text-sm font-medium">0.63</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="ml-auto">
            Ver análise completa
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  const logisticaDashboardContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análise de Custos Logísticos</CardTitle>
          <CardDescription>Dados em desenvolvimento</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <p className="text-muted-foreground">Conteúdo em desenvolvimento</p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ModuleDashboard 
      title="Inteligência de Mercado" 
      description="Análise de preços de commodities e custos logísticos"
      tabs={[
        { id: 'commodities', label: 'Commodities', content: commoditiesDashboardContent },
        { id: 'logistica', label: 'Logística', content: logisticaDashboardContent }
      ]}
    >
      {commoditiesDashboardContent}
    </ModuleDashboard>
  );
};

export default MercadoModule;
