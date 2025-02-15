import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../theme/color";

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
    borderColor: COLORS.Gray,
    backgroundColor: COLORS.White,
  },
  clickedContainer: {
    borderColor: COLORS.MainYellow,
    backgroundColor: COLORS.MainYellow,
  },
  text: {
    color: COLORS.Gray,
    textAlign: "center",
    fontFamily: "FontB",
    fontSize: 15,
  },
  clickedText: {
    color: COLORS.White,
  },
});
