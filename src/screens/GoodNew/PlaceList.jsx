import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../theme/color";
import PropTypes from "prop-types";

const PlaceList = ({ placeList }) => {
  return (
    <View style={styles.container}>
      {placeList.map((place, idx) => (
        <View style={styles.placeContainer} key={idx}>
          <View>
            <Text style={styles.placeTitle}>{place.title}</Text>
            <Text style={styles.placeContent}>{place.content}</Text>
            <LikeComponent likeCount={place.likeCount} liked={place.liked} />
          </View>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.placeImage}
          />
        </View>
      ))}
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

LikeComponent.propTypes = {
  likeCount: PropTypes.number,
  liked: PropTypes.bool,
  onPress: PropTypes.func,
};

export default PlaceList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "24",
    gap: "22",
  },
  placeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "17",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: "1",
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
    fontWeight: "400",
    lineHeight: "22",
    letterSpacing: "-0.408",
  },
});
