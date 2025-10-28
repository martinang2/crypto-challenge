import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DemoScreen from "./DemoScreen";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
    {children}
  </QueryClientProvider>
);

describe("DemoScreen", () => {
  it("renders loading state", () => {
    const { getByText } = render(<DemoScreen />, { wrapper });
    expect(getByText("Loading...")).toBeOnTheScreen();
  });

  it("renders DemoBar", () => {
    const { getByText } = render(<DemoScreen />, { wrapper });
    expect(getByText("Crypto")).toBeOnTheScreen();
    expect(getByText("Reset")).toBeOnTheScreen();
  });

  it("loads and displays data", async () => {
    const { getByText } = render(<DemoScreen />, { wrapper });

    await waitFor(() => expect(getByText("Singapore Dollar")).toBeOnTheScreen(), { timeout: 3000 });
  });
});
