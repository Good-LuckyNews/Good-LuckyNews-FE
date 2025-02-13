import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SocialLoginButton from "./src/components/SocialLoginButton";
import SquareButton from "./src/components/SquareButton";
import RoundButton from "./src/components/RoundButton";
import NextStepButton from "./src/components/NextStepButton";

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
    <View style={styles.container}>
      <Text style={{ fontFamily: "FontM" }}>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
      <SocialLoginButton type="naver" clicked={false} />
      <SquareButton text="완료" width={69} height={23} clicked={false} />
      <SquareButton
        text="플레이스 만들기"
        width={117}
        height={28}
        clicked={true}
      />
      <RoundButton text="버튼명" width={81} clicked={true} />
      <NextStepButton width={339} clicked={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
