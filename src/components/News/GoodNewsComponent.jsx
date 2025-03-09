import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import CommentComponent from "./CommentComponent";
import LikeComponent from "./LikeComponent";
import { COLORS } from "../../theme/color";
import PropTypes from "prop-types";

const GoodNewsComponent = ({
  username,
  time,
  content,
  image,
  likeCount,
  liked = false,
  commentCount = 0,
  style,
  type = "",
}) => {
  return (
    <View style={[{ width: 340, flexDirection: "row" }, style]}>
      {type === "comment" && (
        <Image
          source={require("../../../assets/images/news/comment_line.png")}
          style={{
            width: 15,
            height: 14,
            marginTop: 5,
            marginLeft: 22,
            marginBottom: 18,
            marginRight: 12,
          }}
        />
      )}
      <Image
        style={[
          styles.profileImage,
          type === "comment" && { width: 37, height: 37 },
        ]}
        source={require("../../../assets/images/uploadImage/default_profile_image.png")}
      />
      <View style={{ marginLeft: 12 }}>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Text
            style={[
              styles.usernameText,
              type === "comment" && { fontSize: 14 },
            ]}
          >
            {username}
          </Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <Text
          style={[
            styles.contentText,
            type === "comment" && { fontSize: 11, width: 242 },
          ]}
        >
          {content}
        </Text>
        {!!image && <StyledImage />}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <LikeComponent likeCount={likeCount} liked={liked} />
          <CommentComponent count={commentCount} />
        </View>
      </View>
    </View>
  );
};

GoodNewsComponent.propTypes = {
  username: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string,
  likeCount: PropTypes.number,
  liked: PropTypes.bool,
  commentCount: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
};

const StyledImage = () => {
  return (
    <Pressable>
      <Image
        source={require("../../../assets/images/uploadImage/default_goodNews_image.png")}
        style={{
          width: 280,
          height: 151,
          resizeMode: "cover",
          borderRadius: 10,
          marginTop: 10,
        }}
      />
    </Pressable>
  );
};

export default GoodNewsComponent;

const styles = StyleSheet.create({
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: "100%",
  },
  usernameText: {
    fontFamily: "FontM",
    fontSize: 16,
    fontWeight: 400,
  },
  timeText: {
    color: "#8A8888",
    fontFamily: "FontM",
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  contentText: {
    width: 280,
    overflow: "hidden",
    color: COLORS.Black,
    fontFamily: "FontL",
    fontSize: 13,
    fontWeight: 400,
  },
});
