import { View, StyleSheet, Animated } from "react-native";
import TitanOneText from "./TitanOneText";
import CustomButton from "./CustomButton";
import { useEffect, useRef } from "react";

const DoubleDiceModal = ({ closeModal }) => {
  const fadeInAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeInAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <Animated.View style={[styles.background, { opacity: fadeInAnimation }]}>
      <View style={styles.container}>
        <TitanOneText style={styles.title}>Ai dat dublă!</TitanOneText>
        <TitanOneText style={styles.subtitle}>Foarte tare! Bravo, mai</TitanOneText>
        <TitanOneText style={styles.subtitle}>încearcă până mai dai o dată!</TitanOneText>
        <CustomButton style={styles.button} onPress={closeModal}>
          Super tare, mersi
        </CustomButton>
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    backgroundColor: "#00000050",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#332F2C",
    borderColor: "#F2E7C9",
    borderRadius: 20,
    padding: 30,
    borderWidth: 2,
  },
  title: {
    color: "#D87153",
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
export default DoubleDiceModal;
