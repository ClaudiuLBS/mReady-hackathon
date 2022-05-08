import { View, StyleSheet, Animated } from "react-native";
import TitanOneText from "./TitanOneText";
import CustomButton from "./CustomButton";
import { useEffect, useRef } from "react";

const DoubleDiceModal = ({ closeModal }) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const animationDuration = 200;
  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  const handleButton = () => {
    fadeOut();
    setTimeout(() => closeModal(), animationDuration);
  };

  return (
    <Animated.View style={[styles.background, { opacity: fadeAnimation }]}>
      <View style={styles.container}>
        <TitanOneText style={styles.title}>Ai dat dublă!</TitanOneText>
        <TitanOneText style={styles.subtitle}>Foarte tare! Bravo, mai{"\n"}încearcă până mai dai o dată!</TitanOneText>
        <CustomButton style={styles.button} onPress={handleButton}>
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
    textAlign: "center",
  },
  button: {
    marginTop: 10,
  },
});
export default DoubleDiceModal;
