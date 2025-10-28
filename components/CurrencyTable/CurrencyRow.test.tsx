import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CurrencyRow from "./CurrencyRow";

describe("CurrencyRow", () => {
  const mockCurrency = { id: "btc", name: "Bitcoin", symbol: "BTC" };

  it("renders currency info", () => {
    const { getByText } = render(<CurrencyRow currency={mockCurrency} />);

    expect(getByText("Bitcoin")).toBeOnTheScreen();
    expect(getByText("BTC")).toBeOnTheScreen();
    expect(getByText("B")).toBeOnTheScreen();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(<CurrencyRow currency={mockCurrency} onPress={onPress} />);

    fireEvent.press(getByText("Bitcoin"));

    expect(onPress).toHaveBeenCalledWith(mockCurrency);
  });
});
