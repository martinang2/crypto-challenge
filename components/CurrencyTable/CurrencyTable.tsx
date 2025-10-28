import { FlatList, View, Text, StyleSheet } from "react-native";
import React from "react";
import CurrencyRow from "./CurrencyRow";
import { Currency, CurrencyData } from "../../types/currency";

const renderItem = ({ item: currency }: { item: Currency }) => {
  // Upgrades: navigate to detail screen
  const handlePress = (currency: Currency) => undefined;

  return <CurrencyRow currency={currency} onPress={handlePress} />;
};

const renderEmpty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No result</Text>
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
