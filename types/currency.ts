export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
}

export type CryptoCurrencyData = CryptoCurrency[];

export interface FiatCurrency {
  id: string;
  name: string;
  symbol: string;
  code: string;
}

export type FiatCurrencyData = FiatCurrency[];

export type CurrencyData = (CryptoCurrency | FiatCurrency)[];
