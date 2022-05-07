import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import HistoryItem from "../components/HistoryItem";
import TitanOneText from "../components/TitanOneText";

const HistoryScreen = ({ route }) => {
  const navigation = useNavigation();
  const { previousResults } = route.params;
  useEffect(() => {
    console.log(previousResults);
  }, []);

  if (!previousResults) return <View></View>;

  return (
    <ImageBackground style={styles.container} source={require("../assets/background/bg_pattern.png")}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")} activeOpacity={0.7}>
          <Image resizeMode="contain" style={styles.backButton} source={require("../assets/icons/ic_nav_back.png")} />
        </TouchableOpacity>
        <TitanOneText style={styles.headerText}>Istoric</TitanOneText>
      </View>
      <FlatList data={previousResults} renderItem={HistoryItem} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
  },
  headerText: {
    fontSize: 24,
    marginLeft: 20,
  },
  backButton: {
    width: 40,
    height: 40,
  },
});

export default HistoryScreen;
