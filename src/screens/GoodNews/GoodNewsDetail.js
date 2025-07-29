import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LikeComponent } from "../../components";
import { COLORS } from "../../theme/color";
import GoodNewsList from "./GoodNewsList";
import { useRoute } from "@react-navigation/native";
import api from "../../utils/common";
import * as SecureStore from "expo-secure-store";

const GoodNewsDetail = () => {
  const route = useRoute();
  const { id } = route.params;
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [placeInfo, setPlaceList] = useState({});
  const [goodNewInfo, setGoodNewInfo] = useState([]); // 상태 변수

  const fetchPlaceData = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await api.get(`/api/place/${id}`, {
        headers: { Authorization: token },
      });
      setPlaceList(response.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPostData = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        const response = await api.get("/api/posts", {
          headers: {
            Authorization: `${token}`,
          },
          params: { page: 0, size: 50 },
        });
        savePostData(response.data.result);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  const savePostData = (data) => {
    if (Array.isArray(data)) {
      // 응답이 배열인지 확인
      const filteredData = data.filter((place) => place.placeId === id);
      setGoodNewInfo(filteredData); // 필터링된 데이터 저장
      const updatedData = filteredData.map((item, index) => ({
        ...item,
        username: index === 0 ? "김소식" : "하늘",
      }));
      setGoodNewInfo(updatedData);
    } else {
      console.error("예상과 다른 응답 형식:", data);
    }
  };

  useEffect(() => {
    fetchPlaceData();
    fetchPostData();
  }, []);

  useEffect(() => {
    if (route.params?.refresh) fetchData();
  }, [route.params]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.placeInfoContainer}>
        <View style={{ marginTop: 7, gap: 16 }}>
          <Text style={styles.placeNameText}>{placeInfo.placeName}</Text>
          <Text style={styles.placeDetails}>{placeInfo.placeDetails}</Text>
          <LikeComponent
            likeCount={placeInfo.likeCount}
            liked={placeInfo.liked}
          />
        </View>
        <Image
          style={styles.placeImage}
          source={
            placeInfo.placeImg
              ? { uri: placeInfo.placeImg }
              : require("../../../assets/images/uploadImage/default_place_image.png")
          }
        />
      </View>

      <GoodNewsList
        timeline={goodNewInfo}
        selectedCommentId={selectedCommentId}
        setSelectedCommentId={setSelectedCommentId}
        placeName={placeInfo.placeName}
        placeId={placeInfo.placeId}
      />
    </View>
  );
};

export default GoodNewsDetail;

const styles = StyleSheet.create({
  placeInfoContainer: {
    paddingTop: 29,
    paddingHorizontal: 22,
    paddingBottom: 29,
    backgroundColor: COLORS.LightGray,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: "row",
  },
  placeNameText: {
    fontFamily: "FontB",
    fontSize: 22,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  placeDetails: {
    overflow: "hidden",
    color: "#8A8888",
    fontFamily: "FontM",
    fontSize: 14,
    fontWeight: 400,
  },

  placeImage: {
    width: 77,
    height: 77,
    borderRadius: 50,
    marginLeft: "auto",
    marginRight: 6,
  },
});
