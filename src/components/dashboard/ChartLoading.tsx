
import React from 'react';
import { Loader2 } from 'lucide-react';

export const ChartLoading = ({ height = 300 }: { height?: number }) => {
  return (
    <div 
      className="flex items-center justify-center bg-slate-50 rounded-md" 
      style={{ height: `${height}px` }}
    >
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#40E0D0] mx-auto" />
        <p className="text-sm text-finance-text-secondary mt-2">Carregando dados...</p>
      </div>
    </div>
  );
};
