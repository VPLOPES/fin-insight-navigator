
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, Area } from 'recharts';
import { Info } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChartCardProps {
  title: string;
  data: any[];
  type: 'line' | 'bar' | 'area';
  categories: { key: string; name: string; color: string }[];
  xAxisDataKey: string;
  info?: string;
  className?: string;
  height?: number;
}

export function ChartCard({
  title,
  data,
  type,
  categories,
  xAxisDataKey,
  info,
  className,
  height = 300
}: ChartCardProps) {
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
            />
            <Tooltip />
            <Legend />
            {categories.map((category) => (
              <Line
                key={category.key}
                type="monotone"
                dataKey={category.key}
                name={category.name}
                stroke={category.color}
                strokeWidth={2}
                dot={{ r: 3 }}
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
            />
            <Tooltip />
            <Legend />
            {categories.map((category) => (
              <Bar
                key={category.key}
                dataKey={category.key}
                name={category.name}
                fill={category.color}
                radius={[4, 4, 0, 0]}
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
            />
            <Tooltip />
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
              />
            ))}
          </AreaChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
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
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
