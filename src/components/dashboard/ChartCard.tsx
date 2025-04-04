
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, AreaChart, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, Area, Pie, Cell } from 'recharts';
import { Info } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency, formatPercentage, formatNumber } from "@/lib/chart-utils";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

interface ChartCardProps {
  title: string;
  data: any[];
  type: 'line' | 'bar' | 'area' | 'pie';
  categories: { key: string; name: string; color: string }[];
  xAxisDataKey?: string;
  info?: string;
  className?: string;
  height?: number;
  formatValue?: 'currency' | 'percentage' | 'number';
  allowTypeChange?: boolean;
}

export function ChartCard({
  title,
  data,
  type: initialType,
  categories,
  xAxisDataKey,
  info,
  className,
  height = 300,
  formatValue,
  allowTypeChange = false
}: ChartCardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [type, setType] = useState(initialType);

  // Formatar valores dependendo do tipo
  const formatChartValue = (value: number) => {
    if (formatValue === 'currency') return formatCurrency(value);
    if (formatValue === 'percentage') return formatPercentage(value);
    return formatNumber(value);
  };

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatValue ? (value) => formatChartValue(value) : undefined}
            />
            <Tooltip 
              formatter={(value) => formatValue ? formatChartValue(Number(value)) : value} 
            />
            <Legend />
            {categories.map((category) => (
              <Line
                key={category.key}
                type="monotone"
                dataKey={category.key}
                name={category.name}
                stroke={category.color}
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatValue ? (value) => formatChartValue(value) : undefined}
            />
            <Tooltip 
              formatter={(value) => formatValue ? formatChartValue(Number(value)) : value}
            />
            <Legend />
            {categories.map((category) => (
              <Bar
                key={category.key}
                dataKey={category.key}
                name={category.name}
                fill={category.color}
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            ))}
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatValue ? (value) => formatChartValue(value) : undefined}
            />
            <Tooltip 
              formatter={(value) => formatValue ? formatChartValue(Number(value)) : value}
            />
            <Legend />
            {categories.map((category) => (
              <Area
                key={category.key}
                type="monotone"
                dataKey={category.key}
                name={category.name}
                stroke={category.color}
                fill={category.color}
                fillOpacity={0.2}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            ))}
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={categories[0].key}
              nameKey={xAxisDataKey || 'name'}
              cx="50%"
              cy="50%"
              outerRadius={80}
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              animationDuration={1000}
              onMouseEnter={handlePieEnter}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={categories[index % categories.length]?.color || `hsl(${index * 45}, 70%, 50%)`}
                  opacity={activeIndex === index ? 1 : 0.8}
                  strokeWidth={activeIndex === index ? 2 : 1}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip 
              formatter={(value) => formatValue ? formatChartValue(Number(value)) : value}
            />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`shadow-md hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          {title}
          {info && (
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1 inline text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{info}</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          )}
        </CardTitle>
        {allowTypeChange && (
          <div className="flex items-center space-x-1 bg-muted/50 rounded-md p-1">
            <Toggle 
              size="sm" 
              pressed={type === 'bar'} 
              onPressedChange={() => setType('bar')}
              className="data-[state=on]:bg-finance-accent data-[state=on]:text-white"
              title="Gráfico de barras"
            >
              <span className="sr-only">Bar</span>
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 0.5C11.2239 0.5 11 0.723858 11 1V13H4V7C4 6.72386 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.72386 3 7V13H1.5C1.22386 13 1 13.2239 1 13.5C1 13.7761 1.22386 14 1.5 14H3H4H11H11.5H13.5C13.7761 14 14 13.7761 14 13.5C14 13.2239 13.7761 13 13.5 13H12V1C12 0.723858 11.7761 0.5 11.5 0.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </Toggle>
            <Toggle 
              size="sm"
              pressed={type === 'line'} 
              onPressedChange={() => setType('line')}
              className="data-[state=on]:bg-finance-accent data-[state=on]:text-white"
              title="Gráfico de linha"
            >
              <span className="sr-only">Line</span>
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.877075 7.49988C0.877075 7.77602 1.10093 7.99988 1.37708 7.99988H13.1771C13.4532 7.99988 13.6771 7.77602 13.6771 7.49988C13.6771 7.22373 13.4532 6.99988 13.1771 6.99988H1.37708C1.10093 6.99988 0.877075 7.22373 0.877075 7.49988Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </Toggle>
            <Toggle 
              size="sm"
              pressed={type === 'area'} 
              onPressedChange={() => setType('area')}
              className="data-[state=on]:bg-finance-accent data-[state=on]:text-white"
              title="Gráfico de área"
            >
              <span className="sr-only">Area</span>
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </Toggle>
            <Toggle 
              size="sm"
              pressed={type === 'pie'} 
              onPressedChange={() => setType('pie')}
              className="data-[state=on]:bg-finance-accent data-[state=on]:text-white"
              title="Gráfico de pizza"
            >
              <span className="sr-only">Pie</span>
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.85001 7.50043C1.85001 4.37975 4.37963 1.85001 7.50001 1.85001C10.6204 1.85001 13.15 4.37975 13.15 7.50043C13.15 10.6211 10.6204 13.1509 7.50001 13.1509C4.37963 13.1509 1.85001 10.6211 1.85001 7.50043ZM7.50001 0.850006C3.82721 0.850006 0.850006 3.82733 0.850006 7.50043C0.850006 11.1735 3.82721 14.1509 7.50001 14.1509C11.1728 14.1509 14.15 11.1735 14.15 7.50043C14.15 3.82733 11.1728 0.850006 7.50001 0.850006ZM7.00001 8.00001V4.00001H8.00001V8.00001H7.00001Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </Toggle>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: `${height}px` }} className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
