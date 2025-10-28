import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useCurrencies, useResetCurrencies } from "../hooks/useCurrencies";
import DemoBar, { CurrencyDatatype } from "../components/DemoBar";
import { CurrencyData } from "../types/currency";
import CurrencyTable from "../components/CurrencyTable";

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
      {data && <TableWrapper data={data} />}
    </>
  );
};

const TableWrapper = ({ data }: { data: CurrencyData }) => {
  return (
    <View>
      {/* TODO: Search bar */}

      <CurrencyTable data={data} />
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
