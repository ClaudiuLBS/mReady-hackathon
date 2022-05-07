import { TouchableOpacity, StyleSheet } from "react-native";
import TitanOneText from "./TitanOneText";

const CustomButton = ({ children, onPress, inactive = false }) => {
  return (
    <TouchableOpacity
      style={[styles.rollDiceButton, { backgroundColor: inactive ? "gray" : "#D87153" }]}
      onPress={onPress}
      activeOpacity={inactive ? 1 : 0.7}
    >
      <TitanOneText style={styles.diceText}>{children}</TitanOneText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  diceText: {
    fontSize: 16,
    alignSelf: "center",
  },
  rollDiceButton: {
    backgroundColor: "#D87153",
    borderRadius: 50,
    padding: 10,
  },
});

export default CustomButton;
