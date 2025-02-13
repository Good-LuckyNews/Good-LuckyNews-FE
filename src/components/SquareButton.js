import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Color from "../theme/color";
import PropTypes from "prop-types";

const SquareButton = ({ text, width, height, clicked }) => {
  return (
    <View
      style={[
        styles.container,
        clicked && styles.clickedContainer,
        { width: width, height: height },
      ]}
    >
      <Text style={[styles.text, clicked && styles.clickedText]}>{text}</Text>
    </View>
  );
};

SquareButton.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  clicked: PropTypes.bool,
};

export default SquareButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: Color.Gray,
    backgroundColor: Color.White,
  },
  clickedContainer: {
    borderColor: Color.MainYellow,
    backgroundColor: Color.MainYellow,
  },
  text: {
    color: Color.Gray,
    textAlign: "center",
    fontFamily: "FontB",
    fontSize: 15,
  },
  clickedText: {
    color: Color.White,
  },
});
