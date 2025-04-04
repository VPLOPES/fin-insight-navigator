
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, Database, GitBranch } from "lucide-react";

export function CustomizationCard() {
  return (
    <Card className="bg-finance-neutral/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-finance-primary" />
          Customização
        </CardTitle>
        <CardDescription>
          Como personalizar e expandir a plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 space-y-4">
        <div className="border-l-2 border-finance-primary pl-4">
          <h3 className="font-medium text-finance-text-primary flex items-center gap-2">
            <Database className="h-4 w-4" /> Fontes de Dados
          </h3>
          <p className="text-sm text-finance-text-secondary mt-1">
            Modifique os arquivos na pasta <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">modules</code> para 
            conectar com suas próprias fontes de dados.
          </p>
        </div>
        
        <div className="border-l-2 border-finance-primary pl-4">
          <h3 className="font-medium text-finance-text-primary flex items-center gap-2">
            <GitBranch className="h-4 w-4" /> Novas Funcionalidades
          </h3>
          <p className="text-sm text-finance-text-secondary mt-1">
            A estrutura modular permite adicionar novos módulos conforme necessário.
            Crie novos componentes em <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">components/</code> e 
            páginas em <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">pages/modules/</code>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
