import { Pressable, View, Text } from "react-native";

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
}: {
  current: CurrencyDatatype;
  onPress: (currencyDataType: CurrencyDatatype) => void;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        {demoButtons.map((demoButton) => (
          <Pressable
            key={demoButton}
            onPress={() => onPress(demoButton)}
            style={{ padding: 10, backgroundColor: "#eee", borderRadius: 5 }}
          >
            <Text>{demoButton}</Text>
          </Pressable>
        ))}
      </View>

      <Text>Current: {current} </Text>
    </View>
  );
};

export default DemoBar;
