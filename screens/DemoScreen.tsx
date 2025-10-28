import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useMemo, useState } from "react";
import { useCurrencies, useResetCurrencies } from "../hooks/useCurrencies";
import DemoBar, { CurrencyDatatype } from "../components/DemoBar/DemoBar";
import { CurrencyData } from "../types/currency";
import { filterCurrencies } from "../utils/filterCurrencies";
import SearchBar from "../components/SearchBar/SearchBar";
import CurrencyTable from "../components/CurrencyTable/CurrencyTable";

const DemoScreen = () => {
  const [currencyDataType, setCurrencyDataType] = useState<CurrencyDatatype>(
    CurrencyDatatype.FIAT
  );

  const { resetStorage } = useResetCurrencies();

  return (
    <View>
      <DemoBar
        current={currencyDataType}
        onPress={(demoButton) => setCurrencyDataType(demoButton)}
        onReset={resetStorage}
      />

      <DemoContent currencyDataType={currencyDataType} />
    </View>
  );
};

const DemoContent = ({
  currencyDataType,
}: {
  currencyDataType: CurrencyDatatype;
}) => {
  const { data, isPending, isError, error } = useCurrencies(currencyDataType);

  return (
    <>
      {isError && <Text>{error.message}</Text>}
      {isPending && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#969696ff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      {data && <ContentWrapper data={data} />}
    </>
  );
};

const ContentWrapper = ({ data }: { data: CurrencyData }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchData = useMemo(
    () => filterCurrencies(data, searchInput),
    [data, searchInput]
  );

  return (
    <View>
      <SearchBar
        focused={isSearchFocused}
        value={searchInput}
        onFocus={() => setIsSearchFocused(true)}
        onSearchChange={setSearchInput}
        // Upgrades: debounce this with lodash debounce for better performance on large datasets
        onSearchReset={() => setSearchInput("")}
        onClose={() => setIsSearchFocused(false)}
      />
      {isSearchFocused ? (
        <>{searchInput && <CurrencyTable data={searchData} />}</>
      ) : (
        <CurrencyTable data={data} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 100,
    gap: 20,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
});

export default DemoScreen;
