import { ImageBackground, View } from "react-native";

const SplashScreen = () => {
  return (
    <ImageBackground style={{ flex: 1 }} source={require("../assets/background/bg_pattern.png")}></ImageBackground>
  );
};

export default SplashScreen;
