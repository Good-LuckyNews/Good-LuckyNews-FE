import React, { useEffect, useState } from "react";
import { COLORS } from "../../theme/color";
import { StyleSheet, Text, View } from "react-native";
import RoundButton from "../../components/RoundButton";
import PlaceList from "./PlaceList";
import api from "../../utils/common";
import * as SecureStore from "expo-secure-store";

const GoodNews = ({ route, navigation }) => {
  const [sort, setSort] = useState("all");
  const [placeList, setPlaceList] = useState([]);
  const [myPlaceList, setMyPlaceList] = useState([]);

  const fetchData = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response1 = await api.get(`/api/place`, {
        headers: { Authorization: token },
        params: { page: 0, size: 100 },
      });
      setPlaceList(response1.data.result.content);

      // 필요없음
      // const response2 = await api.get(`/api/place/mypage`, {
      //   headers: { Authorization: token },
      // });
      // setMyPlaceList(response2.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMyData = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await api.get(`/api/place/mypage`, {
        headers: { Authorization: token },
        params: { page: 0, size: 20 },
      });
      // myplacelist 저장으로 변경
      setMyPlaceList(response.data.result.content);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (sort === 'all') {
      fetchData();
    } else {
      fetchMyData();
    }
  }, [sort]);

  useEffect(() => {
    if (sort === 'all') {
      if (route.params?.refresh) fetchData();
    } else {
      if (route.params?.refresh) fetchMyData();
    }
  }, [route.params]);

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
      <PlaceList
        placeList={sort === "all" ? placeList : myPlaceList}
        sort={sort}
        fetchData={fetchData}
      />
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
