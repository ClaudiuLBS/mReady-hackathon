import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, Vibration, View } from "react-native";
import { Accelerometer } from "expo-sensors";

import TitanOneText from "../components/TitanOneText";
import DoubleDiceModal from "./../components/DoubleDiceModal";
import CustomButton from "../components/CustomButton";

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
  const navigation = useNavigation();

  const [leftDice, setLeftDice] = useState(dice1);
  const [rightDice, setRightDice] = useState(dice2);

  const [result, setResult] = useState(null);
  const [previousResults, setPreviousResults] = useState(null);

  const [rolling, setRolling] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [subscription, setSubscription] = useState(null);

  const vibrationPattern = [30, 150, 30, 300];
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const rollDice = () => {
    if (rolling) return;

    let leftDiceNumber;
    let rightDiceNumber;
    let iterations = 0;
    if (previousResults) setPreviousResults([result, ...previousResults]);
    else if (result) setPreviousResults([result]);

    setRolling(true);
    let interval = setInterval(() => {
      iterations++;

      leftDiceNumber = randomIntFromInterval(1, 6);
      rightDiceNumber = randomIntFromInterval(1, 6);

      setLeftDice(diceFaces[leftDiceNumber - 1]);
      setRightDice(diceFaces[rightDiceNumber - 1]);

      if (iterations == 10) {
        //se invarte zarul de 10 ori
        clearInterval(interval);
        setResult([leftDiceNumber, rightDiceNumber]);
        storeDiceValues([leftDiceNumber, rightDiceNumber]);
        //in caz ca am dat dubla sa nu se afiseze instant modalul
        setTimeout(() => {
          if (leftDiceNumber == rightDiceNumber) {
            setActiveModal(true);
            Vibration.vibrate(vibrationPattern);
          }
          setRolling(false);
        }, 500);
      }
    }, 200);
  };

  const [lastPosition, setLastPosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const _subscribe = () => {
    Accelerometer.setUpdateInterval(100);
    setSubscription(
      Accelerometer.addListener((data) => {
        setCurrentPosition(data);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    //calculam viteza de fiecare data cand se misca telefonul
    setLastPosition(currentPosition);
    if (currentPosition && lastPosition) {
      const { x, y, z } = currentPosition;
      const speed = Math.abs(x + y + z - lastPosition.x - lastPosition.y - lastPosition.z) * 100;
      if (speed > 300 && !rolling) rollDice();
    }
  }, [currentPosition]);

  useEffect(() => {
    _subscribe();

    getDiceValues().then((data) => {
      if (data.diceValues.length > 0) {
        const lastValue = data.diceValues[0];
        setPreviousResults(data.diceValues);
        setResult(lastValue);
        setLeftDice(diceFaces[lastValue[0]] - 1);
        setRightDice(diceFaces[lastValue[1]] - 1);
      }
    });

    return () => _unsubscribe();
  }, []);

  const getDiceValues = async () => {
    try {
      const value = await AsyncStorage.getItem("data7");
      if (value !== null) {
        return JSON.parse(value);
      } else return { diceValues: [] };
    } catch (e) {
      console.log(e);
    }
  };

  const storeDiceValues = async (value) => {
    try {
      const lastDiceValues = await getDiceValues();
      const newDiceValues = {
        diceValues: [value, ...lastDiceValues.diceValues],
      };
      await AsyncStorage.setItem("data7", JSON.stringify(newDiceValues));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ImageBackground style={styles.container} source={require("../assets/background/bg_pattern.png")}>
      {/* HISTORY BUTTON */}
      <TouchableOpacity
        style={styles.historyContainer}
        onPress={() => navigation.navigate("History", { previousResults })}
        activeOpacity={0.7}
      >
        <View style={styles.textContainer}>
          <TitanOneText style={{ fontSize: 14 }}>Zarul anterior</TitanOneText>
          {previousResults ? (
            <TitanOneText>
              {previousResults[0][0]}-{previousResults[0][1]}
            </TitanOneText>
          ) : (
            <TitanOneText>0-0</TitanOneText>
          )}
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
        <CustomButton onPress={rollDice} inactive={rolling}>
          Învârte zarurile
        </CustomButton>

        {/* DA UN SHAKE */}
        <View style={styles.shakeContainer}>
          <TitanOneText style={styles.diceText}>...sau dă un shake</TitanOneText>
          <Image style={styles.shakeImage} source={require("../assets/icons/ic_shake.png")} />
        </View>
      </View>
      {activeModal ? <DoubleDiceModal closeModal={() => setActiveModal(false)} /> : null}
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
