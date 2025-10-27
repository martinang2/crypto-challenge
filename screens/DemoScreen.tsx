import { View, Text, Pressable } from "react-native";
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
      {isPending && <Text>Loading...</Text>}
      {data && <TableWrapper data={data} />}
    </>
  );
};

const TableWrapper = ({ data }: { data: CurrencyData }) => {
  return (
    <View>
      {/* TODO: Search bar */}
      {/* TODO: Table */}
      <CurrencyTable data={data} />
    </View>
  );
};

export default DemoScreen;
