import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Navigation from "./src/navigations";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/theme/theme";
import { EditingProvider, NotificationProvider, ScrapProvider } from "./src/contexts";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          FontL: require("./assets/fonts/YiSunSinDotumL.ttf"),
          FontM: require("./assets/fonts/YiSunSinDotumM.ttf"),
          FontB: require("./assets/fonts/YiSunSinDotumB.ttf"),
        });
      } catch (e) {
        console.warn("Font load failed:", e);
      } finally {
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  return (
    <NotificationProvider>
      <ScrapProvider>
        <EditingProvider>
          <ThemeProvider theme={theme}>
            <View style={{ flex: 1 }}>
              <StatusBar style="auto" />
              <Navigation />
            </View>
          </ThemeProvider>
        </EditingProvider>
      </ScrapProvider>
    </NotificationProvider>
  );
}