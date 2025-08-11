import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import CommentComponent from "./CommentComponent";
import LikeComponent from "./LikeComponent";
import { COLORS } from "../../theme/color";
import PropTypes from "prop-types";
import * as SecureStore from "expo-secure-store";
import api from "../../utils/common";

const GoodNewsComponent = ({
  postId,
  id,
  username,
  // 수정사항: 프로필이미지 추가
  profileImage,
  time,
  content,
  imageSrc,
  likeCount,
  liked = false,
  commentCount = 0,
  style,
  type = "",
  setRefresh = () => {},
}) => {
  const toggleGoodNewsLike = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }
      const response = await api.post(`/api/posts/${id}/like`, null, {
        headers: { Authorization: token },
      });
      console.log(response.data);
      setRefresh((refresh) => !refresh);
    } catch (e) {
      console.error("좋아요 토글 실패:", e);
    }
  };

  const toggleCommentLike = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }
      await api.post(`/api/posts/${postId}/comments/${id}/like`, null, {
        headers: { Authorization: token },
      });
      setRefresh((refresh) => !refresh);
    } catch (e) {
      console.error("댓글 좋아요 토글 실패:", e);
    }
  };

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
        // 수정사항: 조건부 렌더링 추가
        source={
          profileImage
            ? { uri: profileImage }
            : require("../../../assets/images/uploadImage/default_profile_image.png")
        }
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
        {!!imageSrc && <StyledImage imageSrc={imageSrc} />}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <LikeComponent
            likeCount={likeCount}
            liked={liked}
            onPress={
              type !== "comment" ? toggleGoodNewsLike : toggleCommentLike
            }
          />
          {type !== "comment" && <CommentComponent count={commentCount} />}
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

const StyledImage = ({ imageSrc }) => {
  return (
    <Pressable>
      <Image
        source={{ uri: imageSrc }}
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
    borderRadius: 50,
    // 수정사항: 프로필이미지 테두리 추가
    borderWidth: 1,
    borderColor: "#d9d9d9",
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
