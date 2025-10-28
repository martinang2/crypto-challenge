import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCurrencies } from "./useCurrencies";
import { CurrencyDatatype } from "../components/DemoBar/DemoBar";
import { MOCK_CRYPTO_DATA, MOCK_FIAT_DATA } from "../mocks/currencies";
import React from "react";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider
    client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
  >
    {children}
  </QueryClientProvider>
);

describe("useCurrencies", () => {
  it("fetches crypto data", async () => {
    const { result } = renderHook(
      () => useCurrencies(CurrencyDatatype.CRYPTO),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true), {
      timeout: 3000,
    });
    expect(result.current.data).toEqual(MOCK_CRYPTO_DATA);
  });

  it("fetches fiat data", async () => {
    const { result } = renderHook(() => useCurrencies(CurrencyDatatype.FIAT), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), {
      timeout: 3000,
    });
    expect(result.current.data).toEqual(MOCK_FIAT_DATA);
  });

  it("shows loading state", () => {
    const { result } = renderHook(
      () => useCurrencies(CurrencyDatatype.CRYPTO),
      { wrapper }
    );
    expect(result.current.isLoading).toBe(true);
  });
});
