import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Color from "../theme/color";

const RoundButton = ({ text, width, clicked }) => {
  return (
    <View
      style={[
        styles.container,
        clicked && styles.clickedContainer,
        { width: width },
      ]}
    >
      <Text style={[styles.text, clicked && styles.clickedText]}>{text}</Text>
    </View>
  );
};

RoundButton.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  clicked: PropTypes.bool,
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: Color.White,
  },
  clickedContainer: {
    backgroundColor: Color.MainYellow,
  },
  text: {
    fontFamily: "FontM",
    fontSize: 15,
    color: Color.Gray,
  },
  clickedText: {
    color: Color.Black,
  },
});
