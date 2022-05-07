import React from "react";
import { StyleSheet, View } from "react-native";
import TitanOneText from "./TitanOneText";

const HistoryItem = ({ item }) => {
  const double = item[0] == item[1];
  const color = double ? "#D87153" : "#ffffff";

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TitanOneText style={[styles.text, { color: color }]}>{item[0] + item[1]}</TitanOneText>
        <TitanOneText style={[styles.text, { color: color }]}>
          {item[0]}-{item[1]}
        </TitanOneText>
      </View>
      {double ? <TitanOneText style={{ color: color }}>Dublă</TitanOneText> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#000000B3",
    marginVertical: 10,
    borderRadius: 50,
    padding: 13,
    paddingHorizontal: 25,
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "25%",
  },
  text: {
    fontSize: 20,
  },
});

export default HistoryItem;
