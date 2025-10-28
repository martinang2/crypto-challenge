import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DemoBar, { CurrencyDatatype } from "./DemoBar";

describe("DemoBar", () => {
  const props = {
    current: CurrencyDatatype.ALL,
    onPress: jest.fn(),
    onReset: jest.fn(),
  };

  it("renders all buttons", () => {
    const { getByText } = render(<DemoBar {...props} />);
    expect(getByText("Crypto")).toBeOnTheScreen();
    expect(getByText("Fiat")).toBeOnTheScreen();
    expect(getByText("All")).toBeOnTheScreen();
    expect(getByText("Empty")).toBeOnTheScreen();
    expect(getByText("Reset")).toBeOnTheScreen();
  });

  it("displays current type", () => {
    const { getByText } = render(
      <DemoBar {...props} current={CurrencyDatatype.CRYPTO} />
    );
    expect(getByText("data: Crypto")).toBeOnTheScreen();
  });

  it("calls onPress with correct type", () => {
    const { getByText } = render(<DemoBar {...props} />);

    fireEvent.press(getByText("Crypto"));
    expect(props.onPress).toHaveBeenCalledWith(CurrencyDatatype.CRYPTO);

    fireEvent.press(getByText("Fiat"));
    expect(props.onPress).toHaveBeenCalledWith(CurrencyDatatype.FIAT);
  });

  it("calls onReset", () => {
    const { getByText } = render(<DemoBar {...props} />);
    fireEvent.press(getByText("Reset"));
    expect(props.onReset).toHaveBeenCalled();
  });
});
