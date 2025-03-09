import React, { useState } from "react";
import { COLORS } from "../../theme/color";
import { StyleSheet, Text, View } from "react-native";
import RoundButton from "../../components/RoundButton";
import PlaceList from "./PlaceList";

const GoodNews = () => {
  const [sort, setSort] = useState("all");
  const [placeList, setPlaceList] = useState([
    {
      id: 1,
      title: "웃음 한 스푼",
      content: "오늘 하루 미소지었던 순간은 언제인가요?",
      likeCount: 1,
      liked: true,
      image: "이미지 경로",
    },
    {
      id: 2,
      title: "웃음 한 스푼",
      content: "오늘 하루 미소지었던 순간은 언제인가요?",
      likeCount: 1,
      liked: false,
      image: "이미지 경로",
    },
    {
      id: 3,
      title: "웃음 한 스푼",
      content: "오늘 하루 미소지었던 순간은 언제인가요?",
      likeCount: 2,
      liked: true,
      image: "이미지 경로",
    },
    {
      id: 4,
      title: "웃음 한 스푼",
      content: "오늘 하루 미소지었던 순간은 언제인가요?",
      likeCount: 1,
      liked: true,
      image: "이미지 경로",
    },
    {
      id: 5,
      title: "웃음 한 스푼",
      content: "오늘 하루 미소지었던 순간은 언제인가요?",
      likeCount: 1,
      liked: false,
      image: "이미지 경로",
    },
    {
      id: 6,
      title: "웃음 한 스푼",
      content: "오늘 하루 미소지었던 순간은 언제인가요?",
      likeCount: 2,
      liked: true,
      image: "이미지 경로",
    },
    {
      id: 7,
      title: "웃음 한 스푼",
      content: "오늘 하루 미소지었던 순간은 언제인가요?",
      likeCount: 1,
      liked: true,
      image: "이미지 경로",
    },
    {
      id: 8,
      title: "웃음 한 스푼",
      content: "오늘 하루 미소지었던 순간은 언제인가요?",
      likeCount: 1,
      liked: false,
      image: "이미지 경로",
    },
    {
      id: 9,
      title: "웃음 한 스푼",
      content: "오늘 하루 미소지었던 순간은 언제인가요?",
      likeCount: 2,
      liked: true,
      image: "이미지 경로",
    },
  ]);

  return (
    <View style={styles.cotainer}>
      <Text style={styles.mainTitle}>희소식</Text>
      <View style={styles.buttonContainer}>
        <RoundButton
          text="전체 플레이스"
          width={121}
          clicked={sort === "all"}
          onPress={() => setSort("all")}
        />
        <RoundButton
          text="MY 플레이스"
          width={121}
          clicked={sort === "my"}
          onPress={() => setSort("my")}
        />
      </View>
      <PlaceList placeList={placeList} sort={sort} />
    </View>
  );
};

export default GoodNews;

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    backgroundColor: COLORS.White,
    paddingHorizontal: "18",
    paddingTop: "24",
    paddingBottom: 90,
  },
  mainTitle: {
    marginBottom: "17",
    fontFamily: "FontM",
    fontSize: 22,
    fontWeight: 400,
    letterSpacing: -0.408,
  },
  buttonContainer: {
    marginBottom: 5,
    flexDirection: "row",
    gap: "6",
  },
});
