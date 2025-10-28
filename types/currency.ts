export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
}

export interface FiatCurrency {
  id: string;
  name: string;
  symbol: string;
  code: string;
}

export type Currency = CryptoCurrency | FiatCurrency;

export type CurrencyData = Currency[];
