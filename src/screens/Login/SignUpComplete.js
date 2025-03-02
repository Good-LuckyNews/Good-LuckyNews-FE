import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { NextStepButton } from "../../components";
import { useNavigation } from "@react-navigation/native";

const SignUpComplete = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/logo/logo.png")}
        style={{ width: 65, height: 47, marginBottom: 21 }}
      />
      <Image
        source={require("../../../assets/images/logo/logo_text.png")}
        style={{ width: 151, height: 55 }}
      />
      <View>
        <Text style={[styles.textStyle, styles.largeText]}>
          회원가입이 완료되었습니다.
        </Text>
        <Text style={[styles.textStyle, styles.smallText]}>
          하루의 긍정적인 소식을
        </Text>
        <Text style={[styles.textStyle, styles.smallText]}>
          희소식과 함께해 주셔서 감사합니다.
        </Text>
      </View>
      <NextStepButton
        text="희소식 시작하기"
        width={339}
        clicked
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: "Login" }] })
        }
        style={{ marginTop: 49 }}
      />
    </View>
  );
};

export default SignUpComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontFamily: "FontM",
    fontWeight: 400,
    textAlign: "center",
  },
  largeText: {
    marginTop: 69,
    marginBottom: 19,
    color: "#4A4A4A",
    fontSize: 27,
    letterSpacing: -2,
  },
  smallText: {
    color: "#8A8A8A",
    fontSize: 20,
  },
});
