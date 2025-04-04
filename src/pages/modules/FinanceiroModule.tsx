
import React, { useState, useCallback } from 'react';
import { ModuleDashboard } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { ChartLoading } from '@/components/dashboard/ChartLoading';
import { formatCurrency } from '@/lib/chart-utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { RefreshCw, FileText, BarChart3, ArrowDownUp, PieChart, Target, LineChart, Lightbulb } from 'lucide-react';

const financialMetrics = [
  { id: 1, title: 'Receita Líquida', value: 45800000, change: 8.5, format: 'currency' },
  { id: 2, title: 'EBITDA', value: 12500000, change: 12.3, format: 'currency' },
  { id: 3, title: 'Lucro Líquido', value: 8300000, change: 15.2, format: 'currency' },
  { id: 4, title: 'Margem EBITDA', value: 27.3, change: 3.5, suffix: '%' },
];

const quarterlyData = {
  '2023': [
    { quarter: 'Q1/23', receita: 10200000, ebitda: 2700000, lucro: 1800000 },
    { quarter: 'Q2/23', receita: 10800000, ebitda: 2900000, lucro: 1950000 },
    { quarter: 'Q3/23', receita: 11500000, ebitda: 3100000, lucro: 2100000 },
    { quarter: 'Q4/23', receita: 12300000, ebitda: 3400000, lucro: 2300000 },
  ],
  '2024': [
    { quarter: 'Q1/24', receita: 11000000, ebitda: 3000000, lucro: 2050000 },
    { quarter: 'Q2/24', receita: 11800000, ebitda: 3200000, lucro: 2200000 },
    { quarter: 'Q3/24', receita: 12500000, ebitda: 3500000, lucro: 2400000 },
    { quarter: 'Q4/24', receita: 13200000, ebitda: 3800000, lucro: 2650000 },
  ],
};

const liquidityData = [
  { name: 'Liquidez Corrente', value: 1.8 },
  { name: 'Liquidez Seca', value: 1.5 },
  { name: 'Liquidez Imediata', value: 0.7 },
];

const debtData = [
  { name: 'CP', value: 25 },
  { name: 'LP', value: 75 },
];

const FinanceiroModule = () => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [dataYear, setDataYear] = useState<'2023' | '2024'>('2024');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMetrics, setActiveMetrics] = useState<string[]>(['receita', 'ebitda', 'lucro']);

  const handleRefreshData = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simular carregamento de dados
  }, []);

  const toggleMetric = useCallback((metric: string) => {
    setActiveMetrics(prev => {
      if (prev.includes(metric)) {
        return prev.filter(m => m !== metric);
      }
      return [...prev, metric];
    });
  }, []);

  const demonstracoesContabeisContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-finance-primary">
              <FileText size={24} />
            </div>
            <div>
              <CardTitle>Demonstrações Contábeis Automatizadas</CardTitle>
              <CardDescription>
                Automatiza a geração de relatórios financeiros como DRE, Balanço Patrimonial e DFC
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-base">
                Automatiza a geração de relatórios financeiros como <strong>DRE (Demonstração do Resultado do Exercício), 
                Balanço Patrimonial e DFC (Demonstração do Fluxo de Caixa)</strong>. Esses relatórios são integrados 
                diretamente ao ERP da empresa, eliminando processos manuais e reduzindo erros.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Benefícios:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Eficiência:</strong> Reduz o tempo gasto na elaboração de demonstrações financeiras.</li>
                <li><strong>Precisão:</strong> Minimiza erros humanos ao automatizar processos.</li>
                <li><strong>Conformidade:</strong> Garante que os relatórios estejam em conformidade com as normas contábeis vigentes.</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md border border-slate-200 dark:border-slate-700">
              <p className="text-sm italic">
                🔹 <strong>Analogia:</strong> Assim como um piloto automático mantém um avião na rota correta, 
                essa funcionalidade mantém os relatórios financeiros precisos e no caminho certo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const fluxoCaixaContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-finance-primary">
              <ArrowDownUp size={24} />
            </div>
            <div>
              <CardTitle>Fluxo de Caixa Financeiro e Relatórios de Tesouraria</CardTitle>
              <CardDescription>
                Monitoramento contínuo e projeções do fluxo de caixa
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-base">
                Fornece <strong>monitoramento contínuo e projeções do fluxo de caixa</strong>, além de relatórios 
                detalhados de tesouraria. Isso permite um controle mais rigoroso das entradas e saídas financeiras.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Benefícios:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Visibilidade:</strong> Oferece uma visão clara das finanças da empresa.</li>
                <li><strong>Planejamento:</strong> Facilita a previsão de necessidades de capital e investimentos futuros.</li>
                <li><strong>Tomada de Decisão:</strong> Apoia decisões estratégicas baseadas em dados financeiros atualizados.</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md border border-slate-200 dark:border-slate-700">
              <p className="text-sm italic">
                🔹 <strong>Analogia:</strong> Semelhante a um farol que guia navios em mares turbulentos, 
                essa funcionalidade orienta a empresa através de suas finanças.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const consolidacaoFinanceiraContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-finance-primary">
              <PieChart size={24} />
            </div>
            <div>
              <CardTitle>Consolidação Financeira</CardTitle>
              <CardDescription>
                Centralização de dados financeiros de múltiplas empresas
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-base">
                Centraliza dados financeiros de diversas <strong>subsidiárias ou unidades de negócio</strong>, 
                permitindo uma visão unificada das finanças corporativas. Isso reduz o tempo de fechamento 
                contábil em pelo menos <strong>50%</strong>.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Benefícios:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Centralização:</strong> Combina informações financeiras de diferentes fontes em um único local.</li>
                <li><strong>Agilidade:</strong> Acelera o processo de fechamento contábil.</li>
                <li><strong>Consistência:</strong> Garante uniformidade nos dados financeiros apresentados.</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md border border-slate-200 dark:border-slate-700">
              <p className="text-sm italic">
                🔹 <strong>Analogia:</strong> Como um maestro que coordena uma orquestra, 
                essa funcionalidade harmoniza dados financeiros de várias fontes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const indicadoresPersonalizadosContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-finance-primary">
              <Target size={24} />
            </div>
            <div>
              <CardTitle>Monitor de Indicadores Personalizados</CardTitle>
              <CardDescription>
                Criação e acompanhamento de KPIs específicos para o negócio
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-base">
                Permite a <strong>criação e acompanhamento de KPIs (Indicadores-Chave de Desempenho)</strong> 
                específicos para o negócio, com dados precisos e atualizados em tempo real.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Benefícios:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Personalização:</strong> Adapta os indicadores às necessidades específicas da empresa.</li>
                <li><strong>Atualização Contínua:</strong> Fornece dados em tempo real para monitoramento constante.</li>
                <li><strong>Insights Valiosos:</strong> Auxilia na identificação de tendências e áreas que necessitam de atenção.</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md border border-slate-200 dark:border-slate-700">
              <p className="text-sm italic">
                🔹 <strong>Analogia:</strong> Assim como um painel de controle de um carro fornece informações essenciais 
                ao motorista, essa funcionalidade oferece dados cruciais para a gestão empresarial.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const criacaoOrcamentoContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-finance-primary">
              <LineChart size={24} />
            </div>
            <div>
              <CardTitle>Criação de Orçamento</CardTitle>
              <CardDescription>
                Elaboração, monitoramento e governança de orçamentos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-base">
                Facilita a <strong>elaboração, monitoramento e governança de orçamentos</strong>, 
                permitindo um planejamento financeiro mais eficaz e colaborativo.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Benefícios:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Colaboração:</strong> Permite que diferentes departamentos contribuam para o processo orçamentário.</li>
                <li><strong>Controle:</strong> Mantém registros detalhados das previsões e despesas reais.</li>
                <li><strong>Ajustes Rápidos:</strong> Facilita revisões orçamentárias conforme necessário.</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md border border-slate-200 dark:border-slate-700">
              <p className="text-sm italic">
                🔹 <strong>Analogia:</strong> Como um arquiteto que desenha uma planta antes da construção, 
                essa funcionalidade ajuda a planejar as finanças antes de executá-las.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const dashboardsPerformanceContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-finance-primary">
              <BarChart3 size={24} />
            </div>
            <div>
              <CardTitle>Dashboards de Performance Financeira</CardTitle>
              <CardDescription>
                Painéis interativos que apresentam dados financeiros precisos e atualizados
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-base">
                Oferece <strong>painéis interativos</strong> que apresentam <strong>dados financeiros precisos e atualizados</strong>, 
                auxiliando na visualização e análise da performance financeira da empresa.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Benefícios:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Visualização Clara:</strong> Transforma dados complexos em gráficos e tabelas de fácil compreensão.</li>
                <li><strong>Tomada de Decisão Rápida:</strong> Fornece informações em tempo real para decisões ágeis.</li>
                <li><strong>Identificação de Tendências:</strong> Ajuda a detectar padrões e anomalias nos dados financeiros.</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md border border-slate-200 dark:border-slate-700">
              <p className="text-sm italic">
                🔹 <strong>Analogia:</strong> Semelhante a um mapa que mostra o caminho e os obstáculos, 
                essa funcionalidade revela a situação financeira da empresa de forma clara.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const simulacaoCenariosContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-finance-primary">
              <Lightbulb size={24} />
            </div>
            <div>
              <CardTitle>Simulação de Cenários</CardTitle>
              <CardDescription>
                Criação e análise de múltiplos cenários financeiros
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-base">
                Permite a <strong>criação e análise de múltiplos cenários financeiros</strong>, 
                ajudando a empresa a se preparar para diferentes situações futuras.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Benefícios:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Previsibilidade:</strong> Avalia possíveis impactos de decisões antes de implementá-las.</li>
                <li><strong>Mitigação de Riscos:</strong> Identifica vulnerabilidades e prepara planos de contingência.</li>
                <li><strong>Flexibilidade Estratégica:</strong> Ajuda a adaptar estratégias com base em diferentes cenários possíveis.</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-md border border-slate-200 dark:border-slate-700">
              <p className="text-sm italic">
                🔹 <strong>Analogia:</strong> Assim como um jogador de xadrez planeja seus movimentos antecipadamente, 
                essa funcionalidade ajuda a empresa a se preparar para o futuro.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const rentabilidadeContent = (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard title="ROE" value={18.5} suffix="%" change={2.3} />
        <MetricCard title="ROA" value={8.7} suffix="%" change={1.1} />
        <MetricCard title="ROIC" value={15.2} suffix="%" change={1.8} />
        <MetricCard title="Margem Líquida" value={16.3} suffix="%" change={3.4} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Análise DUPONT</CardTitle>
          <CardDescription>Decomposição do ROE</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Margem Líquida</p>
              <p className="text-2xl font-bold">18.1%</p>
              <p className="text-xs text-green-600 mt-1">↑ 2.7%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Giro do Ativo</p>
              <p className="text-2xl font-bold">1.2x</p>
              <p className="text-xs text-green-600 mt-1">↑ 0.2x</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Alavancagem</p>
              <p className="text-2xl font-bold">1.8x</p>
              <p className="text-xs text-red-600 mt-1">↓ 0.1x</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const liquidezContent = (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Índices de Liquidez</CardTitle>
            <CardDescription>Capacidade de pagamento de obrigações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartCard
                title=""
                type="bar"
                data={liquidityData}
                xAxisDataKey="name"
                categories={[
                  { key: 'value', name: 'Índice', color: '#0D326F' },
                ]}
                height={250}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const endividamentoContent = (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Estrutura da Dívida</CardTitle>
            <CardDescription>Perfil de curto e longo prazo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartCard
                title=""
                type="pie"
                data={debtData}
                xAxisDataKey="name"
                categories={[
                  { key: 'value', name: 'Percentual', color: '#0D326F' },
                ]}
                height={250}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Indicadores de Endividamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">Dívida Líquida / EBITDA</p>
                <p className="text-2xl font-bold">1.8x</p>
                <p className="text-xs text-green-600">↓ 0.3x (melhor)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">EBITDA / Despesa Financeira</p>
                <p className="text-2xl font-bold">5.2x</p>
                <p className="text-xs text-green-600">↑ 0.5x (melhor)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Grau de Endividamento</p>
                <p className="text-2xl font-bold">42%</p>
                <p className="text-xs text-green-600">↓ 3% (melhor)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const principalContent = (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {financialMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            format={metric.format as any}
            suffix={metric.suffix}
          />
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Desempenho Trimestral</CardTitle>
            <CardDescription>
              Evolução das principais métricas financeiras (em {formatCurrency(1000000)})
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={dataYear} onValueChange={(value: any) => setDataYear(value)}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Barras</SelectItem>
                <SelectItem value="line">Linhas</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleRefreshData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={activeMetrics.includes('receita') ? "default" : "outline"} 
                size="sm"
                onClick={() => toggleMetric('receita')}
              >
                Receita
              </Button>
              <Button 
                variant={activeMetrics.includes('ebitda') ? "default" : "outline"} 
                size="sm"
                onClick={() => toggleMetric('ebitda')}
              >
                EBITDA
              </Button>
              <Button 
                variant={activeMetrics.includes('lucro') ? "default" : "outline"} 
                size="sm"
                onClick={() => toggleMetric('lucro')}
              >
                Lucro Líquido
              </Button>
            </div>
            
            <div style={{ height: '300px' }}>
              {isLoading ? (
                <ChartLoading height={300} />
              ) : (
                <ChartCard
                  title=""
                  type={chartType}
                  data={quarterlyData[dataYear]}
                  xAxisDataKey="quarter"
                  categories={[
                    ...(activeMetrics.includes('receita') ? [{ key: 'receita', name: 'Receita', color: '#0D326F' }] : []),
                    ...(activeMetrics.includes('ebitda') ? [{ key: 'ebitda', name: 'EBITDA', color: '#00A878' }] : []),
                    ...(activeMetrics.includes('lucro') ? [{ key: 'lucro', name: 'Lucro Líquido', color: '#DD571C' }] : []),
                  ]}
                  height={300}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'principal', label: 'Visão Geral', content: principalContent },
    { id: 'demonstracoes', label: 'Demonstrações Contábeis', content: demonstracoesContabeisContent },
    { id: 'fluxo-caixa', label: 'Fluxo de Caixa', content: fluxoCaixaContent },
    { id: 'consolidacao', label: 'Consolidação', content: consolidacaoFinanceiraContent },
    { id: 'indicadores', label: 'Indicadores', content: indicadoresPersonalizadosContent },
    { id: 'orcamento', label: 'Orçamento', content: criacaoOrcamentoContent },
    { id: 'dashboards', label: 'Dashboards', content: dashboardsPerformanceContent },
    { id: 'simulacao', label: 'Simulação', content: simulacaoCenariosContent },
    { id: 'rentabilidade', label: 'Rentabilidade', content: rentabilidadeContent },
    { id: 'liquidez', label: 'Liquidez', content: liquidezContent },
    { id: 'endividamento', label: 'Endividamento', content: endividamentoContent },
  ];

  return (
    <ModuleDashboard
      title="Financeiro Corporativo"
      description="Análise de indicadores financeiros e avaliação de performance"
      tabs={tabs}
    >
      {null}
    </ModuleDashboard>
  );
};

export default FinanceiroModule;
