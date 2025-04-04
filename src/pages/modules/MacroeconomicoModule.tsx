
import React, { useState, useEffect } from 'react';
import { ModuleDashboard } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCard } from '@/components/dashboard/ChartCard';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/chart-utils';

// Definir a interface para as taxas de câmbio
interface ExchangeRate {
  date: string;
  value: number; 
}

const MacroeconomicoModule: React.FC = () => {
  // Estado para todas as séries temporais
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [selicRates, setSelicRates] = useState<ExchangeRate[]>([]);
  const [inflationRates, setInflationRates] = useState<ExchangeRate[]>([]);
  const [gdpData, setGdpData] = useState<ExchangeRate[]>([]);

  // Estado para os filtros
  const [period, setPeriod] = useState<string>("12m");

  // Efeito para carregar dados mockados
  useEffect(() => {
    // Função para gerar dados de exemplo com flutuação realista
    const generateTimeSeriesData = (
      startDate: Date, 
      count: number, 
      baseValue: number,
      volatility: number
    ): ExchangeRate[] => {
      const data: ExchangeRate[] = [];
      let currentValue = baseValue;
      
      for (let i = 0; i < count; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i * 30); // Aproximadamente mensal
        
        // Adicionar alguma aleatoriedade, mas manter a tendência
        const change = (Math.random() - 0.5) * volatility;
        currentValue = Math.max(0.1, currentValue + change);
        
        data.push({
          date: currentDate.toISOString().split('T')[0],
          value: parseFloat(currentValue.toFixed(2))
        });
      }
      
      return data;
    };

    // Data de início: 2 anos atrás
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 2);
    
    // Gerar dados mockados para cada série temporal
    setExchangeRates(generateTimeSeriesData(startDate, 24, 5.20, 0.15)); // USD/BRL
    setSelicRates(generateTimeSeriesData(startDate, 24, 4.25, 0.1));      // SELIC
    setInflationRates(generateTimeSeriesData(startDate, 24, 3.7, 0.2));    // IPCA
    setGdpData(generateTimeSeriesData(startDate, 24, 0.9, 0.3));          // GDP trimestral
  }, []);

  // Função para filtrar dados com base no período selecionado
  const getFilteredData = (data: ExchangeRate[], periodFilter: string) => {
    if (!data.length) return [];
    
    const today = new Date();
    let filterDate = new Date();
    
    switch(periodFilter) {
      case '3m':
        filterDate.setMonth(today.getMonth() - 3);
        break;
      case '6m':
        filterDate.setMonth(today.getMonth() - 6);
        break;
      case '12m':
      default:
        filterDate.setFullYear(today.getFullYear() - 1);
        break;
      case '24m':
        filterDate.setFullYear(today.getFullYear() - 2);
        break;
    }
    
    return data.filter(item => new Date(item.date) >= filterDate);
  };

  // Preparar os dados para exibição nos gráficos
  const filteredExchangeRates = getFilteredData(exchangeRates, period);
  const filteredSelicRates = getFilteredData(selicRates, period);
  const filteredInflationRates = getFilteredData(inflationRates, period);
  const filteredGdpData = getFilteredData(gdpData, period);

  // Calcular a última taxa e a variação percentual
  const getLatestValueAndChange = (data: ExchangeRate[]): { latest: number, change: number } => {
    if (data.length < 2) return { latest: 0, change: 0 };
    
    const latest = data[data.length - 1].value;
    const previous = data[data.length - 2].value;
    const change = ((latest - previous) / previous) * 100;
    
    return { latest, change };
  };

  const usdBrlMetric = getLatestValueAndChange(filteredExchangeRates);
  const selicMetric = getLatestValueAndChange(filteredSelicRates);
  const inflationMetric = getLatestValueAndChange(filteredInflationRates);
  const gdpMetric = getLatestValueAndChange(filteredGdpData);

  const dashboardContent = (
    <div className="space-y-6">
      {/* Filtros de período */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Período:</span>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3m">3 meses</SelectItem>
                  <SelectItem value="6m">6 meses</SelectItem>
                  <SelectItem value="12m">12 meses</SelectItem>
                  <SelectItem value="24m">24 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="sm:ml-auto">
              <Download className="h-4 w-4 mr-2" />
              Exportar dados
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cards de métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Câmbio USD/BRL"
          value={usdBrlMetric.latest}
          change={usdBrlMetric.change}
          prefix="R$ "
          icon="currency"
          info="Taxa de câmbio atual do Dólar Americano em Reais"
        />
        <MetricCard
          title="Taxa SELIC"
          value={selicMetric.latest}
          change={selicMetric.change}
          suffix="%"
          format="percentage"
          icon="percentage"
          info="Taxa básica de juros da economia brasileira"
        />
        <MetricCard
          title="Inflação (IPCA)"
          value={inflationMetric.latest}
          change={inflationMetric.change}
          suffix="%"
          format="percentage"
          icon="percentage"
          info="Índice de Preços ao Consumidor Amplo, acumulado 12 meses"
        />
        <MetricCard
          title="Crescimento PIB"
          value={gdpMetric.latest}
          change={gdpMetric.change}
          suffix="%"
          format="percentage"
          icon="chart"
          info="Variação do Produto Interno Bruto trimestral"
        />
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Câmbio USD/BRL"
          type="line"
          data={filteredExchangeRates.map(item => ({
            date: formatDate(item.date),
            value: item.value
          }))}
          xAxisDataKey="date"
          categories={[{ key: 'value', name: 'USD/BRL', color: '#0D326F' }]}
          height={300}
          formatValue="currency"
          allowTypeChange
        />
        <ChartCard
          title="Taxa SELIC"
          type="area"
          data={filteredSelicRates.map(item => ({
            date: formatDate(item.date),
            value: item.value
          }))}
          xAxisDataKey="date"
          categories={[{ key: 'value', name: 'SELIC %', color: '#0E9AA7' }]}
          height={300}
          formatValue="percentage"
          allowTypeChange
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Inflação (IPCA)"
          type="bar"
          data={filteredInflationRates.map(item => ({
            date: formatDate(item.date),
            value: item.value
          }))}
          xAxisDataKey="date"
          categories={[{ key: 'value', name: 'IPCA %', color: '#F97316' }]}
          height={300}
          formatValue="percentage"
          allowTypeChange
        />
        <ChartCard
          title="Crescimento PIB"
          type="line"
          data={filteredGdpData.map(item => ({
            date: formatDate(item.date),
            value: item.value
          }))}
          xAxisDataKey="date"
          categories={[{ key: 'value', name: 'Variação %', color: '#3F72AF' }]}
          height={300}
          formatValue="percentage"
          allowTypeChange
        />
      </div>
    </div>
  );

  return (
    <ModuleDashboard 
      title="Indicadores Macroeconômicos" 
      description="Análise de indicadores econômicos nacionais e internacionais"
      tabs={[
        { id: 'dashboard', label: 'Dashboard', content: dashboardContent },
        { id: 'inflacao', label: 'Inflação', content: <div>Conteúdo sobre inflação</div> },
        { id: 'cambio', label: 'Câmbio', content: <div>Conteúdo sobre câmbio</div> },
        { id: 'juros', label: 'Taxas de Juros', content: <div>Conteúdo sobre taxas de juros</div> }
      ]}
    >
      {dashboardContent}
    </ModuleDashboard>
  );
};

export default MacroeconomicoModule;
