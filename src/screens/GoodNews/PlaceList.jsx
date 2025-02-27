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
import PropTypes from "prop-types";
import MakePlaceButton from "./MakePlaceButton";
import { SwipeListView } from "react-native-swipe-list-view";

const PlaceList = ({ placeList, sort }) => {
  return (
    <View style={styles.container}>
      {sort === "my" && <MakePlaceButton />}
      <SwipeListView
        data={placeList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.placeContainer}>
            <View>
              <Text style={styles.placeTitle}>{item.title}</Text>
              <Text style={styles.placeContent}>{item.content}</Text>
              <LikeComponent likeCount={item.likeCount} liked={item.liked} />
            </View>
            <Image
              source={require("../../../assets/icon.png")}
              style={styles.placeImage}
            />
          </View>
        )}
        render
        renderHiddenItem={({ item }) => <DeleteButton idx={item.id} />}
        rightOpenValue={-82}
        stopLeftSwipe={15}
        stopRightSwipe={-100}
      />
      {/* <FlatList
        data={placeList}
        ListHeaderComponent={sort === "my" && <MakePlaceButton />}
        renderItem={({ item }) => (
          <View style={styles.placeContainer}>
            <View>
              <Text style={styles.placeTitle}>{item.title}</Text>
              <Text style={styles.placeContent}>{item.content}</Text>
              <LikeComponent likeCount={item.likeCount} liked={item.liked} />
            </View>
            <Image
              source={require("../../../assets/icon.png")}
              style={styles.placeImage}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
      /> */}
    </View>
  );
};

const LikeComponent = ({
  likeCount = 0,
  liked = false,
  onPress = () => {},
}) => {
  const imageSource = liked
    ? require("../../../assets/images/likeButton/like.png")
    : require("../../../assets/images/likeButton/unlike.png");

  return (
    <Pressable style={styles.likeContainer} onPress={onPress}>
      <Image source={imageSource} style={styles.likeButton} />
      <Text style={[styles.likeCount, liked && { color: COLORS.MainYellow }]}>
        {likeCount}
      </Text>
    </Pressable>
  );
};

const DeleteButton = (idx) => {
  return (
    <Pressable style={styles.deleteContainer}>
      <Text style={styles.deleteText}>삭제</Text>
    </Pressable>
  );
};

LikeComponent.propTypes = {
  likeCount: PropTypes.number,
  liked: PropTypes.bool,
  onPress: PropTypes.func,
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
    borderBottomWidth: "1",
    backgroundColor: COLORS.White,
  },
  placeTitle: {
    marginBottom: "6",
    fontFamily: "FontB",
    fontSize: "16",
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
    borderWidth: "1",
    borderRadius: "100%",
  },

  // LikeComponent
  likeContainer: {
    width: "39",
    height: "22",
    alignItems: "center",
    flexDirection: "row",
    gap: "3",
  },
  likeButton: {
    width: "19",
    height: "19",
  },
  likeCount: {
    fontFamily: "FontM",
    color: "#8A8888",
    fontSize: "13",
    fontWeight: "400",
    lineHeight: "22",
    letterSpacing: "-0.408",
  },

  // DeleteButton 컴포넌트
  deleteContainer: {
    width: "74",
    height: 93,
    backgroundColor: "#FF5B5B",
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 5,
  },
  deleteText: {
    fontFamily: "FontM",
    color: COLORS.White,
    fontSize: "17",
    fontWeight: "400",
    lineHeight: "22",
    letterSpacing: "-0.408",
  },
});
