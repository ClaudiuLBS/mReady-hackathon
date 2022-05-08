import { Image, View, StyleSheet } from "react-native";
import TitanOneText from "./TitanOneText";
const EptyHistory = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.diceImage} source={require("../assets/logos/illustration_empty_history.png")} />
      <TitanOneText style={styles.title}>Nu ai istoric încă</TitanOneText>
      <TitanOneText style={styles.subtitle}>Dă shake sau învârte zarurile,</TitanOneText>
      <TitanOneText style={styles.subtitle}>aici vor apărea toate scorurile tale</TitanOneText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  diceImage: {
    width: 152,
    height: 108,
  },
  title: {
    fontSize: 24,
    color: "#D87153",
    marginVertical: 13,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default EptyHistory;
