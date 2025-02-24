import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../theme/color";

const SquareButton = ({
  text,
  width,
  height,
  clicked = false,
  onPress = () => {},
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        clicked && styles.clickedContainer,
        { width: width, height: height },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, clicked && styles.clickedText]}>{text}</Text>
    </Pressable>
  );
};

SquareButton.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  clicked: PropTypes.bool,
  onPress: PropTypes.func,
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
