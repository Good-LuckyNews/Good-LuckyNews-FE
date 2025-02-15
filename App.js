import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigations";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        FontL: require("./assets/fonts/YiSunSinDotumL.ttf"),
        FontM: require("./assets/fonts/YiSunSinDotumM.ttf"),
        FontB: require("./assets/fonts/YiSunSinDotumB.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Navigation />
    </View>
  );
}