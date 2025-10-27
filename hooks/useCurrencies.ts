import { useQuery } from "@tanstack/react-query";
import { CurrencyData } from "../types/currency";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MOCK_ALL_CURRENCIES,
  MOCK_CRYPTO_DATA,
  MOCK_FIAT_DATA,
} from "../mocks/currencies";
import { CurrencyDatatype } from "../components/DemoBar";

export function useCurrencies(currencyDataType: CurrencyDatatype) {
  return useQuery<CurrencyData, Error>({
    queryKey: [`currencies-${currencyDataType}`],
    queryFn: () => getCurrency(currencyDataType),
  });
}

// Async storage mock database
const STORAGE_KEYS = {
  CRYPTO: "@currency/cryto",
  FIAT: "@currency/fiat",
  ALL: "@currency/all",
  EMPTY: "@currency/empty",
};

export const getCurrency = async (
  currencyDataType: CurrencyDatatype
): Promise<CurrencyData> => {
  try {
    await delay();
    const data = await AsyncStorage.getItem(getStorageKey(currencyDataType));

    if (!data) {
      await initialize();
      return getCurrencyMockData(currencyDataType);
    }

    return JSON.parse(data) as CurrencyData;
  } catch (error) {
    throw new Error(`Failed to fetch ${currencyDataType} currencies`);
  }
};

const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const initialize = async (): Promise<void> => {
  await AsyncStorage.multiSet([
    [STORAGE_KEYS.CRYPTO, JSON.stringify(MOCK_CRYPTO_DATA)],
    [STORAGE_KEYS.FIAT, JSON.stringify(MOCK_FIAT_DATA)],
    [STORAGE_KEYS.ALL, JSON.stringify([MOCK_ALL_CURRENCIES])],
    [STORAGE_KEYS.EMPTY, JSON.stringify([])],
  ]);
};

const getCurrencyMockData = (currencyDataType: CurrencyDatatype) => {
  switch (currencyDataType) {
    case CurrencyDatatype.CRYPTO:
      return MOCK_CRYPTO_DATA;
    case CurrencyDatatype.FIAT:
      return MOCK_FIAT_DATA;
    case CurrencyDatatype.ALL:
      return MOCK_ALL_CURRENCIES;
    case CurrencyDatatype.EMPTY:
      return [];
    default:
      return [];
  }
};

const getStorageKey = (currencyDataType: CurrencyDatatype) => {
  switch (currencyDataType) {
    case CurrencyDatatype.CRYPTO:
      return STORAGE_KEYS.CRYPTO;
    case CurrencyDatatype.FIAT:
      return STORAGE_KEYS.FIAT;
    case CurrencyDatatype.ALL:
      return STORAGE_KEYS.ALL;
    case CurrencyDatatype.EMPTY:
      return STORAGE_KEYS.EMPTY;
    default:
      return STORAGE_KEYS.EMPTY;
  }
};
