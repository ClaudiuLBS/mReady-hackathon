import { TouchableOpacity, StyleSheet } from "react-native";
import TitanOneText from "./TitanOneText";

const CustomButton = ({ children, onPress, inactive = false, style }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, { backgroundColor: inactive ? "gray" : "#D87153" }]}
      onPress={onPress}
      activeOpacity={inactive ? 1 : 0.7}
    >
      <TitanOneText style={styles.text}>{children}</TitanOneText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    alignSelf: "center",
  },
  container: {
    backgroundColor: "#D87153",
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 20,
  },
});

export default CustomButton;
