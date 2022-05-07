import React from "react";
import { useFonts, TitanOne_400Regular } from "@expo-google-fonts/titan-one";
import { StyleSheet, Text } from "react-native";

const TitanOneText = ({ style, children }) => {
  let [fontsLoaded] = useFonts({
    TitanOne_400Regular,
  });

  if (!fontsLoaded) {
    return <Text></Text>;
  }
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "TitanOne_400Regular",
    fontSize: 18,
    color: "#ffffff",
  },
});

export default TitanOneText;
