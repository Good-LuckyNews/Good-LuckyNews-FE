import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LikeComponent } from "../../components";
import { COLORS } from "../../theme/color";
import GoodNewsList from "./GoodNewsList";
import * as SecureStore from "expo-secure-store";
import api from "../../utils/common";

const GoodNewsDetail = ({ route, navigation }) => {
  const [goodNewsList, setGoodNewsList] = useState([]);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const {
    placeName,
    placeDetails,
    placeImage,
    placeLikeCount,
    placeLiked,
    placeId,
  } = route.params;

  const fetchData = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await api.get(`/api/posts`, {
        headers: { Authorization: `${token}` },
      });
      console.log(response.data);
      setGoodNewsList(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // focus될 때마다 데이터를 새로 고침
      fetchData();
    });

    // cleanup
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.placeInfoContainer}>
        <View style={{ marginTop: 7, gap: 16 }}>
          <Text style={styles.placeNameText}>{placeName}</Text>
          <Text style={styles.placeDetails}>{placeDetails}</Text>
          <LikeComponent likeCount={placeLikeCount} liked={placeLiked} />
        </View>
        <Image style={styles.placeImage} source={{ uri: placeImage }} />
      </View>

      <GoodNewsList
        timeline={goodNewsList}
        selectedCommentId={selectedCommentId}
        setSelectedCommentId={setSelectedCommentId}
        placeName={placeName}
        placeId={placeId}
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
