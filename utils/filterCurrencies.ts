import { CurrencyData } from "../types/currency";

export const filterCurrencies = (
  data: CurrencyData,
  searchTerm: string
): CurrencyData => {
  if (!searchTerm.trim()) {
    return data;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();

  return data.filter((currency) => {
    const lowerName = currency.name.toLowerCase();
    const lowerSymbol = currency.symbol.toLowerCase();

    // AC : Name starts with search term
    if (lowerName.startsWith(lowerSearchTerm)) {
      return true;
    }

    // AC 2: Name contains search term with a space prefix
    if (lowerName.includes(` ${lowerSearchTerm}`)) {
      return true;
    }

    // AC 3: Symbol starts with search term
    if (lowerSymbol.startsWith(lowerSearchTerm)) {
      return true;
    }

    return false;
  });
};
