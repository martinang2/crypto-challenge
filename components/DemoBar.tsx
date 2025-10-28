import { Pressable, View, Text, StyleSheet } from "react-native";

export enum CurrencyDatatype {
  CRYPTO = "Crypto",
  FIAT = "Fiat",
  ALL = "All",
  EMPTY = "Empty",
}

const demoButtons = Object.values(CurrencyDatatype);

const DemoBar = ({
  current,
  onPress,
  onReset,
}: {
  current: CurrencyDatatype;
  onPress: (currencyDataType: CurrencyDatatype) => void;
  onReset: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        {demoButtons.map((demoButton) => (
          <Pressable
            key={demoButton}
            onPress={() => onPress(demoButton)}
            style={styles.button}
          >
            <Text>{demoButton}</Text>
          </Pressable>
        ))}
        <Pressable onPress={onReset} style={styles.button}>
          <Text>Reset</Text>
        </Pressable>
      </View>

      <Text>data: {current} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
});

export default DemoBar;
