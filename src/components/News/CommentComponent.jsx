import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const CommentComponent = ({ count }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../../assets/images/news/comment_logo.png")}
        style={{ width: 16.5, height: 16.5 }}
      />
      <Text
        style={{
          color: "#8A8888",
          fontFamily: "FontM",
          fontSize: 11,
          fontWeight: 400,
          lineHeight: 22,
          letterSpacing: -0.408,
        }}
      >
        {/* 수정사항: 데이터 연동 */}
        {count}
      </Text>
    </View>
  );
};

export default CommentComponent;

const styles = StyleSheet.create({});
