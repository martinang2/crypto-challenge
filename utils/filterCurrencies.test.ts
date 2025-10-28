import { filterCurrencies } from "./filterCurrencies";
import { Currency } from "../types/currency";

const mockCurrencies: Currency[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC" },
  { id: "eth", name: "Ethereum", symbol: "ETH" },
  { id: "bnb", name: "Binance Coin", symbol: "BNB" },
  { id: "usd", name: "US Dollar", symbol: "$", code: "USD" },
];

describe("filterCurrencies", () => {
  it("returns all data when search is empty", () => {
    expect(filterCurrencies(mockCurrencies, "")).toEqual(mockCurrencies);
    expect(filterCurrencies(mockCurrencies, "  ")).toEqual(mockCurrencies);
  });

  it("filters by name", () => {
    expect(filterCurrencies(mockCurrencies, "bit")).toHaveLength(1);
    expect(filterCurrencies(mockCurrencies, "coin")[0].name).toBe("Binance Coin");
  });

  it("filters by symbol", () => {
    expect(filterCurrencies(mockCurrencies, "btc")[0].symbol).toBe("BTC");
    expect(filterCurrencies(mockCurrencies, "$")[0].name).toBe("US Dollar");
  });

  it("is case insensitive", () => {
    expect(filterCurrencies(mockCurrencies, "BITCOIN")).toHaveLength(1);
    expect(filterCurrencies(mockCurrencies, "eth")).toHaveLength(1);
  });

  it("returns empty array when no match", () => {
    expect(filterCurrencies(mockCurrencies, "xyz")).toEqual([]);
  });
});
