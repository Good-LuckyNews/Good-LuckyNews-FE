import React, { useState } from "react";
import { COLORS } from "../../theme/color";
import { Image, StyleSheet, Text, View } from "react-native";
import RoundButton from "../../components/RoundButton";
import SquareButton from "../../components/SquareButton";
import PlaceList from "./PlaceList";

const GoodNews = () => {
  const [sort, setSort] = useState("all");
  const [placeList, setPlaceList] = useState([
    {
      title: "웃음 한 스푼",
      content: "오늘 하루 미소지었던 순간은 언제인가요?",
      likeCount: 1,
      liked: true,
      image: "이미지 경로",
    },
    {
      title: "웃음 한 스푼",
      content: "오늘 하루 미소지었던 순간은 언제인가요?",
      likeCount: 1,
      liked: false,
      image: "이미지 경로",
    },
    {
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
      {sort === "my" && <MakePlace />}
      <PlaceList placeList={placeList} />
    </View>
  );
};

const MakePlace = () => {
  return (
    <View style={styles.makePlaceContainer}>
      <Text style={styles.makePlaceText}>함께 희소식을 공유할</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "15",
        }}
      >
        <Text style={styles.makePlaceText}>플레이스를 만들어주세요</Text>
        <Image
          style={{ width: "20", height: "14" }}
          source={require("../../../assets/icon.png")}
        />
      </View>
      <SquareButton text="플레이스 만들기" width={117} height={28} />
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
  },
  mainTitle: {
    marginBottom: "17",
    fontFamily: "FontM",
    fontSize: "22",
    fontWeight: 400,
    letterSpacing: "-0.408",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: "6",
  },

  // MakePlace 컴포넌트
  makePlaceContainer: {
    alignItems: "center",
    marginTop: "24",
  },
  makePlaceText: {
    fontFamily: "FontL",
    fontSize: "17",
    fontWeight: "400",
    lineHeight: "22",
    letterSpacing: "-0.408",
  },
});
