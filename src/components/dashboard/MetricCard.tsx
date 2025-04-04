
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, TrendingDown, TrendingUp } from "lucide-react";
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
  format = "number"
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

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
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
        <div className="text-2xl font-bold">{displayValue}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {typeof change === 'number' && (
          <div className={cn(
            "flex items-center text-xs font-medium mt-2",
            change > 0 ? "text-finance-positive" : change < 0 ? "text-finance-negative" : "text-muted-foreground"
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
