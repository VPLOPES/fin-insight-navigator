
export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface ChartCategory {
  key: string;
  name: string;
  color: string;
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

/**
 * Formata a data no padrão brasileiro (DD/MM/YYYY)
 */
export const formatDate = (dateString: string): string => {
  // Verifica se o formato da data é DD/MM/YYYY ou YYYY-MM-DD
  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  } else if (dateString.includes('/')) {
    return dateString; // Já está no formato brasileiro
  }
  return dateString; // Retorna o formato original se não reconhecido
};

