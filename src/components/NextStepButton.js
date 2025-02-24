import PropTypes from "prop-types";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../theme/color";

const NextStepButton = ({
  text = "완료",
  width,
  clicked = false,
  onPress = () => {},
  style = {},
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        clicked && styles.clickedContainer,
        { width: width },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, clicked && styles.clickedText]}>{text}</Text>
    </Pressable>
  );
};

NextStepButton.propTypes = {
  text: PropTypes.string,
  width: PropTypes.number.isRequired,
  clicked: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

export default NextStepButton;

const styles = StyleSheet.create({
  container: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1.3,
    borderColor: COLORS.MainYellow,
    backgroundColor: COLORS.White,
  },
  clickedContainer: {
    backgroundColor: COLORS.MainYellow,
  },
  text: {
    fontFamily: "FontB",
    fontSize: 20,
    color: COLORS.MainYellow,
  },
  clickedText: {
    color: COLORS.White,
  },
});
