import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GoodNewsComponent from "../../components/News/GoodNewsComponent";
import { COLORS } from "../../theme/color";

const commentList = [
  {
    id: 4,
    profileImage: "",
    username: "김소식",
    time: "3일 전",
    content:
      "오늘 도시락을 열었더니 엄마가 제가 좋아하는 반찬을 챙겨주셨더라고요. 바쁜 하루였지만 도시락을 열었을 때 엄마의 마음이 느껴져셔 따뜻한 하루였어요.",
    image: null,
    likeCount: 2,
    liked: false,
    commentCount: 3,
  },
  {
    id: 5,
    profileImage: "",
    username: "미소1",
    time: "1일 전",
    content: "1도시락 속 따뜻한 마음이라니, 저도 미소가 나는 것 같아요~",
    image: null,
    likeCount: 0,
    liked: false,
    commentCount: 2,
  },
  {
    id: 6,
    profileImage: "",
    username: "미소2",
    time: "1일 전",
    content: "2도시락 속 따뜻한 마음이라니, 저도 미소가 나는 것 같아요~",
    image: null,
    likeCount: 0,
    liked: false,
    commentCount: 1,
  },
  {
    id: 7,
    profileImage: "",
    username: "미소3",
    time: "1일 전",
    content: "3도시락 속 따뜻한 마음이라니, 저도 미소가 나는 것 같아요~",
    image: null,
    likeCount: 0,
    liked: false,
    commentCount: 0,
  },
];

const SeeCommentDetail = () => {
  const route = useRoute();
  //   const commentId = route.params?.commentId || 0;
  const commentId = 5;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          paddingTop: 26,
          paddingHorizontal: 28,
          paddingBottom: 27,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          backgroundColor: COLORS.LightGray,
        }}
      >
        {/* prevComment 있는 버전 */}
        <PrevComment
          username={commentList[0].username}
          content={commentList[0].content}
          image="" // 프사용
        />

        <GoodNewsComponent
          username={commentList[1].username}
          time={commentList[1].time}
          content={commentList[1].content}
          image=""
          likeCount={commentList[1].likeCount}
          liked={commentList[1].liked}
          commentCount={commentList[1].commentCount}
          type="comment"
          style={{ marginLeft: -12 }}
        />

        {/* 이거만 있으면 prevComment 없는 버전
        <GoodNewsComponent
          username={commentList[1].username}
          time={commentList[1].time}
          content={commentList[1].content}
          image=""
          likeCount={commentList[1].likeCount}
          liked={commentList[1].liked}
          commentCount={commentList[1].commentCount}
        /> */}
      </View>

      {/* 밑에 댓글 하나도 없으면 밑에 띄우지 말고 이거만 띄워
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>가장 먼저 답글을 남겨보세요</Text>
        <Image
          style={{ width: "20", height: "14" }}
          source={require("../../../assets/icon.png")}
        />
      </View> */}

      <View style={{ marginLeft: 25, marginRight: 28, marginTop: 19, gap: 23 }}>
        {commentList.length > 2 &&
          commentList.slice(2).map((comment, idx) => (
            <Pressable
              key={comment.id}
              style={
                commentList.length === 3 && {
                  borderBottomWidth: 1,
                  borderColor: "#D9D9D9",
                  paddingBottom: 15,
                }
              }
            >
              <GoodNewsComponent
                username={comment.username}
                time={comment.time}
                content={comment.content}
                image=""
                likeCount={comment.likeCount}
                liked={comment.liked}
                commentCount={comment.commentCount}
                type={idx >= 1 ? "comment" : null}
              />
            </Pressable>
          ))}
      </View>

      <SendComment />
    </View>
  );
};

const PrevComment = ({ username, content, image, style }) => {
  return (
    <Pressable
      style={[
        {
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
          marginBottom: 17,
        },
        style,
      ]}
    >
      <Image
        source={require("../../../assets/images/uploadImage/default_profile_image.png")}
        style={{ width: 25, height: 25, borderRadius: "100%" }}
      />
      <Text style={styles.prevText}>{username}</Text>
      <Text
        style={[styles.prevText, { width: 260, color: "#8A8888" }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {content}
      </Text>
    </Pressable>
  );
};

const SendComment = () => {
  const [comment, setComment] = useState("");

  const sendComment = () => {
    if (!comment) return;
    // axios 연동
  };

  return (
    <View style={styles.sendCommentContainer}>
      <TextInput
        placeholder="답글을 남겨보세요!"
        placeholderTextColor="#888"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.commentTextInput}
        value={comment}
        onChangeText={setComment}
      />
      <Pressable
        style={{ position: "absolute", right: 21 }}
        onPress={sendComment}
      >
        <Image
          source={require("../../../assets/images/news/send_comment.png")}
          style={{ width: 23, height: 23 }}
        />
      </Pressable>
    </View>
  );
};

export default SeeCommentDetail;

const styles = StyleSheet.create({
  prevText: {
    fontFamily: "FontM",
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: -0.41,
  },
  emptyContainer: {
    marginTop: 42,
    justifyContent: "center",
    flexDirection: "row",
    gap: 2,
  },
  emptyText: {
    fontFamily: "FontL",
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.408,
  },

  sendCommentContainer: {
    width: 406,
    height: 72,
    position: "absolute",
    bottom: 80,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 19,

    borderColor: "#ECECEC",
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  commentTextInput: {
    width: 369,
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 35,
    paddingVertical: 9,

    fontFamily: "FontM",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: -0.408,
  },
});
