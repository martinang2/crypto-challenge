import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  const props = {
    focused: false,
    value: "",
    onFocus: jest.fn(),
    onSearchChange: jest.fn(),
    onSearchReset: jest.fn(),
    onClose: jest.fn(),
  };

  it("renders search input", () => {
    const { getByPlaceholderText } = render(<SearchBar {...props} />);
    expect(getByPlaceholderText("Search")).toBeOnTheScreen();
  });

  it("shows back and clear buttons when focused", () => {
    const { getByText } = render(<SearchBar {...props} focused={true} />);
    expect(getByText("←")).toBeOnTheScreen();
    expect(getByText("✕")).toBeOnTheScreen();
  });

  it("hides buttons when not focused", () => {
    const { queryByText } = render(<SearchBar {...props} focused={false} />);
    expect(queryByText("←")).not.toBeOnTheScreen();
  });

  it("calls callbacks", () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchBar {...props} focused={true} />
    );

    fireEvent(getByPlaceholderText("Search"), "focus");
    expect(props.onFocus).toHaveBeenCalled();

    fireEvent.changeText(getByPlaceholderText("Search"), "test");
    expect(props.onSearchChange).toHaveBeenCalledWith("test");

    fireEvent.press(getByText("✕"));
    expect(props.onSearchReset).toHaveBeenCalled();
  });
});
