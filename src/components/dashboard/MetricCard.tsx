
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, TrendingDown, TrendingUp, DollarSign, PercentIcon, BarChart3, PieChart } from "lucide-react";
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: number;
  info?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
  format?: "currency" | "percentage" | "number";
  icon?: "currency" | "percentage" | "chart" | "pie";
}

export function MetricCard({
  title,
  value,
  description,
  change,
  info,
  className,
  prefix = "",
  suffix = "",
  format = "number",
  icon
}: MetricCardProps) {
  const formattedValue = React.useMemo(() => {
    if (typeof value === 'number') {
      if (format === 'currency') {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      } else if (format === 'percentage') {
        return `${value.toFixed(2)}%`;
      } else {
        return new Intl.NumberFormat('pt-BR').format(value);
      }
    }
    return value;
  }, [value, format]);

  const displayValue = `${prefix}${formattedValue}${suffix}`;

  const getIcon = () => {
    if (!icon) {
      // Auto-detect icon based on format if not specified
      if (format === 'currency') return <DollarSign className="h-5 w-5 text-finance-primary" />;
      if (format === 'percentage') return <PercentIcon className="h-5 w-5 text-finance-primary" />;
      return null;
    }
    
    switch(icon) {
      case 'currency': return <DollarSign className="h-5 w-5 text-finance-primary" />;
      case 'percentage': return <PercentIcon className="h-5 w-5 text-finance-primary" />;
      case 'chart': return <BarChart3 className="h-5 w-5 text-finance-primary" />;
      case 'pie': return <PieChart className="h-5 w-5 text-finance-primary" />;
      default: return null;
    }
  };

  return (
    <Card className={cn("overflow-hidden shadow-md hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {getIcon()}
          <span>{title}</span>
          {info && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1 inline text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{info}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mt-2">{displayValue}</div>
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
        {typeof change === 'number' && (
          <div className={cn(
            "flex items-center text-xs font-medium mt-3 p-1 rounded-md",
            change > 0 ? "text-finance-positive bg-finance-positive/10" : 
            change < 0 ? "text-finance-negative bg-finance-negative/10" : 
            "text-muted-foreground bg-muted/50"
          )}>
            {change > 0 ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : change < 0 ? (
              <TrendingDown className="mr-1 h-3 w-3" />
            ) : null}
            <span>{change > 0 ? "+" : ""}{change.toFixed(2)}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
