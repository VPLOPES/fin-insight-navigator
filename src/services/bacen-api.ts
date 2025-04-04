
import { toast } from "sonner";

export interface ExchangeRate {
  date: string;
  value: number;
}

/**
 * Serviço para buscar dados da API do Banco Central do Brasil
 */
export const BacenService = {
  /**
   * Busca a série temporal de taxa de câmbio BRL/USD
   * @param days Número de dias para buscar (padrão: 30)
   * @returns Array com os dados da série de câmbio
   */
  async getExchangeRates(days = 30): Promise<ExchangeRate[]> {
    try {
      // API do Banco Central - Série 1 = Dólar (venda)
      // Documentação: https://dadosabertos.bcb.gov.br/dataset/dolar-americano-usd-todos-os-boletins-diarios
      const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados/ultimos/${days}?formato=json`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados do BACEN: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Formatar os dados da API para o formato da aplicação
      return data.map((item: { data: string; valor: string }) => ({
        date: item.data,
        value: parseFloat(item.valor)
      })) as ExchangeRate[];
    } catch (error) {
      console.error('Erro ao buscar dados de câmbio:', error);
      toast.error('Não foi possível carregar os dados de câmbio do Banco Central');
      return [];
    }
  }
};
