import React from "react";
import { render } from "@testing-library/react-native";
import CurrencyTable from "./CurrencyTable";
import { Currency } from "../../types/currency";

// Upgrades: implement storybook and use {composeStories} for seamless integration between msw, storybook & test

const mockCryptoCurrencies: Currency[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC" },
  { id: "eth", name: "Ethereum", symbol: "ETH" },
  { id: "usdt", name: "Tether", symbol: "USDT" },
];

const mockFiatCurrencies: Currency[] = [
  { id: "usd", name: "US Dollar", symbol: "$", code: "USD" },
  { id: "eur", name: "Euro", symbol: "€", code: "EUR" },
];

const mockMixedData = [
  ...mockCryptoCurrencies.slice(0, 2),
  ...mockFiatCurrencies.slice(0, 1),
];

describe("CurrencyTable", () => {
  it("renders crypto", () => {
    const { getByText } = render(<CurrencyTable data={mockCryptoCurrencies} />);

    expect(getByText("Bitcoin")).toBeOnTheScreen();
    expect(getByText("Ethereum")).toBeOnTheScreen();
    expect(getByText("Tether")).toBeOnTheScreen();

    expect(getByText("BTC")).toBeOnTheScreen();
    expect(getByText("ETH")).toBeOnTheScreen();
    expect(getByText("USDT")).toBeOnTheScreen();
  });

  it("renders fiat ", () => {
    const { getByText } = render(<CurrencyTable data={mockFiatCurrencies} />);

    expect(getByText("US Dollar")).toBeOnTheScreen();
    expect(getByText("Euro")).toBeOnTheScreen();
    expect(getByText("$")).toBeOnTheScreen();
    expect(getByText("€")).toBeOnTheScreen();
  });

  it("renders mixed list of crypto and fiat", () => {
    const { getByText } = render(<CurrencyTable data={mockMixedData} />);

    expect(getByText("Bitcoin")).toBeOnTheScreen();
    expect(getByText("Ethereum")).toBeOnTheScreen();
    expect(getByText("US Dollar")).toBeOnTheScreen();
  });

  it("renders empty state", () => {
    const { getByText } = render(<CurrencyTable data={[]} />);
    expect(getByText("No result")).toBeOnTheScreen();
  });
});
