import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Color from "../theme/color";

const NextStepButton = ({ text = "완료", width, clicked }) => {
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

NextStepButton.propTypes = {
  text: PropTypes.string,
  width: PropTypes.number.isRequired,
  clicked: PropTypes.bool,
};

export default NextStepButton;

const styles = StyleSheet.create({
  container: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1.3,
    borderColor: Color.MainYellow,
    backgroundColor: Color.White,
  },
  clickedContainer: {
    backgroundColor: Color.MainYellow,
  },
  text: {
    fontFamily: "FontB",
    fontSize: 20,
    color: Color.MainYellow,
  },
  clickedText: {
    color: Color.White,
  },
});
