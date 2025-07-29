import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LikeComponent } from "../../components";
import { COLORS } from "../../theme/color";
import GoodNewsList from "./GoodNewsList";
import { useRoute } from "@react-navigation/native";
import api from "../../utils/common";
import * as SecureStore from 'expo-secure-store';

// const goodNewInfo = {
//   placeName: "웃음 한 스푼",
//   placeDetails: "오늘 하루 미소 지었던 순간은 언제인가요?",
//   placeImg: "",
//   placeLikeCount: 3,
//   placeLiked: true,
// };

// const timeline = [
//   {
//     id: 1,
//     profileImage: "",
//     username: "하늘",
//     time: "30분 전",
//     content: "오늘 퇴근길에 우연히 본 노을이 너무 아름답더라고요!",
//     image: "있음",
//     likeCount: 5,
//     liked: true,
//     comment: [],
//   },
//   {
//     id: 2,
//     profileImage: "",
//     username: "이소식",
//     time: "1일 전",
//     content:
//       "오늘 아파트 엘리베이터에서 만난 할머니가 저한테 ‘오늘 하루도 힘내요~’라고 인사해주셨어요! 덕분에 하루 종일 미소가 떠나질 않네요 :)",
//     image: null,
//     likeCount: 3,
//     liked: true,
//     comment: [
//       {
//         id: 3,
//         profileImage: "",
//         username: "김소식",
//         time: "2시간 전",
//         content: "이런 소소한 인사로 하루가 따뜻해지는 것 같아요!!",
//         image: null,
//         likeCount: 0,
//         liked: false,
//         comment: [],
//       },
//     ],
//   },
//   {
//     id: 4,
//     profileImage: "",
//     username: "김소식",
//     time: "3일 전",
//     content:
//       "오늘 도시락을 열었더니 엄마가 제가 좋아하는 반찬을 챙겨주셨더라고요. 바쁜 하루였지만 도시락을 열었을 때 엄마의 마음이 느껴져셔 따뜻한 하루였어요.",
//     image: null,
//     likeCount: 2,
//     liked: false,
//     comment: [
//       {
//         id: 5,
//         profileImage: "",
//         username: "미소1",
//         time: "1일 전",
//         content: "1도시락 속 따뜻한 마음이라니, 저도 미소가 나는 것 같아요~",
//         image: null,
//         likeCount: 0,
//         liked: false,
//         comment: [],
//       },
//       {
//         id: 6,
//         profileImage: "",
//         username: "미소2",
//         time: "1일 전",
//         content: "2도시락 속 따뜻한 마음이라니, 저도 미소가 나는 것 같아요~",
//         image: null,
//         likeCount: 0,
//         liked: false,
//         comment: [],
//       },
//     ],
//   },
// ];

const GoodNewsDetail = () => {
  const route = useRoute();
  const { id } = route.params;
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [goodNewInfo, setGoodNewInfo] = useState([]); // 상태 변수
  const [placeList, setPlaceList] = useState([]);

  const fetchData = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await api.get(`/api/place`, {
        headers: { Authorization: token },
        params: { page: 0, size: 10 },
      });
      // 배열 확인 - 응답 구조 변경
      if (Array.isArray(response.data.result.content)) { // 응답이 배열인지 확인
        const filteredData = response.data.result.content.filter(place => place.placeId === id);
        setPlaceList(filteredData); // 필터링된 데이터 저장
      } else {
        console.error("예상과 다른 응답 형식:", response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (route.params?.refresh) fetchData();
  }, [route.params]);

  const fetchPostData = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      console.log(token);
      if (token) {
        const response = await api.get("/api/posts", {
          headers: {
            'Authorization': `${token}`
          },
          params: { page: 0, size: 50 },
        });
        // 배열 확인 - 응답 구조 변경
        if (Array.isArray(response.data.result)) { // 응답이 배열인지 확인
          const filteredData = response.data.result.filter(place => place.placeId === id);
          setGoodNewInfo(filteredData); // 필터링된 데이터 저장
        } else {
          console.error("예상과 다른 응답 형식:", response.data);
        }
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.placeInfoContainer}>
        <View style={{ marginTop: 7, gap: 16 }}>
          <Text style={styles.placeNameText}>{placeList[0]?.placeName}</Text>
          <Text style={styles.placeDetails}>{placeList[0]?.placeDetails}</Text>
          <LikeComponent
            likeCount={placeList[0]?.likeCount}
            liked={placeList[0]?.liked}
          />
        </View>
        <Image
          style={styles.placeImage}
          source={placeList[0]?.placeImg ? { uri: placeList[0]?.placeImg } : require("../../../assets/images/uploadImage/default_place_image.png")}
        />
      </View>

      <GoodNewsList
        timeline={goodNewInfo}
        selectedCommentId={selectedCommentId}
        setSelectedCommentId={setSelectedCommentId}
        placeName={placeList.placeName}
        placeId={placeList[0]?.placeId}
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
