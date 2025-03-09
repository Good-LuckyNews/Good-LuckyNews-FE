import React from "react";
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

const PlaceList = ({ placeList, sort }) => {
  const navigation = useNavigation();

  const moveToDetail = () => navigation.navigate("GoodNewsDetail");

  return (
    <View style={styles.container}>
      {/* <SwipeListView
        data={placeList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          sort === "my" && <MakePlaceButton type="플레이스" />
        }
        renderItem={({ item }) => (
          <Pressable style={styles.placeContainer} onPress={moveToDetail}>
            <View>
              <Text style={styles.placeTitle}>{item.title}</Text>
              <Text style={styles.placeContent}>{item.content}</Text>
              <LikeComponent likeCount={item.likeCount} liked={item.liked} />
            </View>
            <Image
              source={require("../../../assets/icon.png")}
              style={styles.placeImage}
            />
          </Pressable>
        )}
        renderHiddenItem={({ item }) => <DeleteButton idx={item.id} />}
        rightOpenValue={-82}
        stopLeftSwipe={15}
        stopRightSwipe={-100}
      /> */}
      <FlatList
        data={placeList}
        ListHeaderComponent={
          sort === "my" && <MakePlaceButton type="플레이스" />
        }
        renderItem={({ item }) => (
          <Pressable style={styles.placeContainer} onPress={moveToDetail}>
            <View>
              <Text style={styles.placeTitle}>{item.title}</Text>
              <Text style={styles.placeContent}>{item.content}</Text>
              <LikeComponent likeCount={item.likeCount} liked={item.liked} />
            </View>
            <Image
              source={require("../../../assets/icon.png")}
              style={styles.placeImage}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
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
