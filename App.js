import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import EmptyHistoryScreen from "./screens/EmptyHistoryScreen";
import MainScreen from "./screens/MainScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Notifications" component={HistoryScreen} />
        <Stack.Screen name="Profile" component={EmptyHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
