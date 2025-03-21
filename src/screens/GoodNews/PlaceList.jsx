import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../../theme/color";
import MakePlaceButton from "./MakePlaceButton";
import { useNavigation } from "@react-navigation/native";
import { LikeComponent } from "../../components";
import DeleteModal from "../../components/News/DeleteModal";
import api from "../../utils/common";
import * as SecureStore from "expo-secure-store";

const PlaceList = ({ placeList, sort, fetchData }) => {
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();
  const moveToDetail = (item) => {
    // console.log(item);
    navigation.navigate("GoodNewsDetail", {
      id: item.placeId,
      placeName: item.placeName,
      placeDetails: item.placeDetails,
      placeImage: item.placeImg,
      placeLikeCount: item.likeCount,
      placeLiked: item.liked,
      placeId: item.placeId,
    });
  };

  const deletePlace = (id) => {
    // axios 연동
    // try {
    //   const response = api.delete(`/api/place/${id}`);
    //   setSelectedId(null);
    //   fetchData();
    //   console.log(response);
    // } catch (e) {
    //   console.error(e);
    // }
  };

  const toggleLike = async (id) => {
    console.log(id);
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }
      console.log(token);
      const response = await api.post(`/api/place/${id}/bookmark`, null, {
        headers: { Authorization: token },
      });
      console.log("response", response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <DeleteModal
        visible={!!selectedId}
        text="플레이스를 삭제하시겠습니까?"
        onCancel={() => setSelectedId(null)}
        onDelete={() => deletePlace(selectedId)}
      />
      <FlatList
        data={placeList}
        ListHeaderComponent={
          sort === "my" && <MakePlaceButton type="플레이스" />
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.placeContainer}
            onPress={() => moveToDetail(item)}
            onLongPress={() => setSelectedId(item.placeId)}
            delayLongPress={500}
          >
            <View>
              <Text style={styles.placeTitle}>{item.placeName}</Text>
              <Text style={styles.placeContent}>{item.placeDetails}</Text>
              <LikeComponent
                likeCount={item.likeCount}
                liked={item.liked}
                onPress={() => toggleLike(item.placeId)}
              />
            </View>
            <Image
              source={
                item.placeImg
                  ? { uri: item.placeImg }
                  : require("../../../assets/icon.png")
              }
              style={styles.placeImage}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.placeId.toString()}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
      />
    </View>
  );
};

export default PlaceList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeContainer: {
    height: 93,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "24",
    paddingBottom: "17",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    backgroundColor: COLORS.White,
  },
  placeTitle: {
    marginBottom: "6",
    fontFamily: "FontB",
    fontSize: 16,
    fontWeight: "400",
  },
  placeContent: {
    marginBottom: "20",
    fontFamily: "FontM",
    color: "#8A8888",
    fontWeight: "400",
  },
  placeImage: {
    width: "72",
    height: "72",
    borderColor: COLORS.LightGray,
    borderWidth: 1,
    borderRadius: 50,
  },
});
