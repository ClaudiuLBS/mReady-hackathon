import React, { useState } from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TitanOneText from "../components/TitanOneText";

const footerWidth = Dimensions.get("window").width;
const footerHeight = footerWidth / 1.9;

const dice1 = require("../assets/dice/dice_face_01.png");
const dice2 = require("../assets/dice/dice_face_02.png");
const dice3 = require("../assets/dice/dice_face_03.png");
const dice4 = require("../assets/dice/dice_face_04.png");
const dice5 = require("../assets/dice/dice_face_05.png");
const dice6 = require("../assets/dice/dice_face_06.png");

const diceFaces = [dice1, dice2, dice3, dice4, dice5, dice6];
const MainScreen = () => {
  const [leftDice, setLeftDice] = useState(dice1);
  const [rightDice, setRightDice] = useState(dice2);
  const [result, setResult] = useState((0, 0));

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const rollDice = () => {
    let leftDiceNumber;
    let rightDiceNumber;
    let iterations = 0;
    let interval = setInterval(() => {
      iterations++;

      leftDiceNumber = randomIntFromInterval(1, 6);
      rightDiceNumber = randomIntFromInterval(1, 6);

      setResult((leftDiceNumber, rightDiceNumber));
      setLeftDice(diceFaces[leftDiceNumber - 1]);
      setRightDice(diceFaces[rightDiceNumber - 1]);

      if (iterations == 20) clearInterval(interval);
    }, 100);
  };

  return (
    <ImageBackground style={styles.container} source={require("../assets/background/bg_pattern.png")}>
      {/* HISTORY BUTTON */}
      <TouchableOpacity style={styles.historyContainer} activeOpacity={0.7}>
        <View style={styles.textContainer}>
          <TitanOneText style={{ fontSize: 14 }}>Zarul anterior</TitanOneText>
          <TitanOneText>6-5</TitanOneText>
        </View>
        <Image resizeMode="contain" style={styles.historyIcon} source={require("../assets/icons/ic_nav_history.png")} />
      </TouchableOpacity>

      {/* INVARTE-MA LOGO */}
      <Image resizeMode="contain" style={styles.logo} source={require("../assets/logos/illustration_app.png")} />

      {/* DICE */}
      <View style={styles.diceContainer}>
        <Image resizeMode="contain" style={styles.dice} source={leftDice} />
        <Image resizeMode="contain" style={styles.dice} source={rightDice} />
      </View>

      {/* DICE COMMANDS */}
      <View>
        {/* INVARTE ZARURILE BUTTON */}
        <TouchableOpacity style={styles.rollDiceButton} onPress={rollDice} activeOpacity={0.7}>
          <TitanOneText style={styles.diceText}>Învârte zarurile</TitanOneText>
        </TouchableOpacity>

        {/* DA UN SHAKE */}
        <View style={styles.shakeContainer}>
          <TitanOneText style={styles.diceText}>...sau dă un shake</TitanOneText>
          <Image style={styles.shakeImage} source={require("../assets/icons/ic_shake.png")} />
        </View>
      </View>

      {/* FOOTER IMAGE */}
      <Image resizeMode="stretch" style={styles.footer} source={require("../assets/background/bg_footer.png")} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  historyContainer: {
    flexDirection: "row",
    padding: 4,
    marginTop: 28,
    marginRight: 28,
    backgroundColor: "#00000099",
    borderColor: "#00000080",
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: "flex-end",
  },
  textContainer: {
    alignSelf: "center",
    marginHorizontal: 10,
    marginVertical: 0,
  },
  text: {
    alignSelf: "flex-end",
  },
  historyIcon: {
    height: 40,
    width: 40,
    margin: 0,
  },
  logo: {
    width: 304,
    height: 126,
  },
  diceContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
  },
  dice: {
    height: 108,
    width: 108,
    margin: 15,
  },
  diceText: {
    fontSize: 16,
    alignSelf: "center",
  },
  rollDiceButton: {
    backgroundColor: "#D87153",
    borderRadius: 50,
    padding: 10,
  },
  shakeContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  shakeImage: {
    width: 35,
    height: 35,
  },
  footer: {
    width: footerWidth,
    height: footerHeight,
  },
});

export default MainScreen;
