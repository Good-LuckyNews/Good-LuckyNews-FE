import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Color from "../theme/color";
import PropTypes from "prop-types";

const SocialLoginButton = ({ type, clicked = false }) => {
  const logoImages = {
    google: {
      name: "구글",
      source: require(`../../assets/images/logo/google_logo.png`),
    },
    naver: {
      name: "네이버",
      source: require(`../../assets/images/logo/naver_logo.png`),
    },
  };

  return (
    <View style={[styles.container, clicked && styles.clickedContainer]}>
      <Image source={logoImages[type].source} style={styles.logo} />
      <Text style={[styles.text, clicked && styles.clickedText]}>
        {logoImages[type].name}로 시작하기
      </Text>
    </View>
  );
};

SocialLoginButton.propTypes = {
  type: PropTypes.oneOf(["google", "naver"]).isRequired,
  clicked: PropTypes.bool,
};

export default SocialLoginButton;

const styles = StyleSheet.create({
  container: {
    width: 271,
    height: 42,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.MainYellow,
    backgroundColor: Color.White,
  },
  clickedContainer: {
    backgroundColor: Color.MainYellow,
  },
  logo: {
    width: 17,
    height: 17,
    aspectRatio: 1 / 1,
    position: "absolute",
    top: 12,
    left: 20,
  },
  text: {
    color: Color.Gray,
    fontSize: 17,
    fontFamily: "FontB",
  },
  clickedText: {
    color: Color.White,
  },
});
