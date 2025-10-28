import { FlatList, View, Text, StyleSheet } from "react-native";
import React from "react";
import { Currency, CurrencyData } from "../types/currency";
import CurrencyRow from "./CurrencyRow";

const renderItem = ({ item: currency }: { item: Currency }) => {
  const handlePress = (currency: Currency) => {
    console.log("Pressed:", currency.name);
  };

  return <CurrencyRow currency={currency} onPress={handlePress} />;
};

const renderEmpty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Currency in database</Text>
    </View>
  );
};

const CurrencyTable = ({ data }: { data: CurrencyData }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={renderEmpty}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});

export default CurrencyTable;
