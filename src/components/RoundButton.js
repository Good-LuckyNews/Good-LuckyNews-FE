import PropTypes from "prop-types";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../theme/color";

const RoundButton = ({ text, width, clicked = false, onPress = () => {} }) => {
  return (
    <Pressable
      style={[
        styles.container,
        clicked && styles.clickedContainer,
        { width: width },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, clicked && styles.clickedText]}>{text}</Text>
    </Pressable>
  );
};

RoundButton.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  clicked: PropTypes.bool,
  onPress: PropTypes.func,
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: COLORS.LightGray,
  },
  clickedContainer: {
    backgroundColor: COLORS.MainYellow,
  },
  text: {
    fontFamily: "FontM",
    fontSize: 15,
    color: COLORS.Gray,
  },
  clickedText: {
    color: COLORS.Black,
  },
});
