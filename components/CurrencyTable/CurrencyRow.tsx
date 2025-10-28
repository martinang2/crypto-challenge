import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Currency } from "../../types/currency";

interface CurrencyRowProps {
  currency: Currency;
  onPress?: (currency: Currency) => void;
}

const CurrencyRow = ({ currency, onPress }: CurrencyRowProps) => {
  const handlePress = () => {
    onPress?.(currency);
  };

  const firstLetter = currency.name.charAt(0).toUpperCase();

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconLetter}>{firstLetter}</Text>
        </View>
        <Text style={styles.currencyName}>{currency.name}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.currencySymbol}>{currency.symbol}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CurrencyRow;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4a4a4a",
    justifyContent: "center",
    alignItems: "center",
  },
  iconLetter: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  currencyName: {
    fontSize: 16,
    color: "#000",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  currencySymbol: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  arrow: {
    fontSize: 20,
    color: "#666",
  },
});
