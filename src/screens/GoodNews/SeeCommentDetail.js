import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { COLORS } from "../../theme/color";
import DeleteModal from "../../components/News/DeleteModal";
import { GoodNewsComponent } from "../../components";
import * as SecureStore from "expo-secure-store";
import api from "../../utils/common";

const SeeCommentDetail = ({ route }) => {
  const [commentList, setCommentList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { title, postInfo, postId } = route.params;

  const fetchCommentData = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        const response = await api.get(`/api/posts/${postId}/comments`, {
          headers: {
            Authorization: token,
          },
          params: { page: 0, size: 10 },
        });
        console.log(response.data.result);
        setCommentList(response.data.result);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  const deleteComment = async (id) => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }
      await api.delete(`/api/posts/${postId}/comments/${id}`, {
        headers: { Authorization: token },
      });
      alert("삭제 성공");
      setRefresh((prev) => !prev);
    } catch (e) {
      if (e?.status === 403 || e?.status === 404) {
        alert("권한이 없습니다.");
      } else {
        console.error("댓글 삭제 실패:", e);
      }
    } finally {
      setSelectedId(null);
    }
  };

  useEffect(() => {
    fetchCommentData();
    setRefresh(false);
  }, [refresh]);

  return (
    <View style={{ flex: 1 }}>
      <DeleteModal
        visible={!!selectedId}
        text="댓글을 삭제하시겠습니까?"
        onCancel={() => setSelectedId(null)}
        onDelete={() => deleteComment(selectedId)}
      />
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
        {/* <PrevComment
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
        /> */}

        {postInfo && (
          <GoodNewsComponent
            id={postId}
            username={postInfo.writer.name}
            profileImage={postInfo.writer.profileImage}
            time={postInfo.createdAt.split("T")[0].replace(/-/g, ".")}
            content={postInfo.content}
            image={postInfo.writer.profileImage}
            likeCount={postInfo.likeCount}
            liked={postInfo.liked}
            commentCount={postInfo.commentCount}
            imageSrc={postInfo.image}
            setRefresh={setRefresh}
          />
        )}
      </View>

      <ScrollView
        style={{
          marginLeft: 25,
          marginRight: 28,
          marginTop: 19,
          marginBottom: 160,
        }}
        contentContainerStyle={{ gap: 23 }}
        showsVerticalScrollIndicator={false}
      >
        {commentList.length > 0 &&
          commentList.map((comment) => (
            <Pressable
              key={comment.commentId}
              onLongPress={() => setSelectedId(comment.commentId)}
              delayLongPress={500}
              style={
                commentList.length === 3 && {
                  borderBottomWidth: 1,
                  borderColor: "#D9D9D9",
                  paddingBottom: 15,
                }
              }
            >
              <GoodNewsComponent
                postId={postId}
                id={comment.commentId}
                username={comment.writer.name}
                profileImage={comment.writer.profileImage}
                time={comment.createdAt.split("T")[0].replace(/-/g, ".")}
                content={comment.content}
                imageSrc={comment.image}
                likeCount={comment.likeCount}
                liked={comment.liked}
                commentCount={comment.commentCount}
                type="comment"
              />
            </Pressable>
          ))}
      </ScrollView>

      <SendComment postId={postId} setRefresh={setRefresh} />
    </View>
  );
};

// const PrevComment = ({ username, content, image, style }) => {
//   return (
//     <Pressable
//       style={[
//         {
//           flexDirection: "row",
//           gap: 12,
//           alignItems: "center",
//           marginBottom: 17,
//         },
//         style,
//       ]}
//     >
//       <Image
//         source={require("../../../assets/images/uploadImage/default_profile_image.png")}
//         style={{ width: 25, height: 25, borderRadius: 50 }}
//       />
//       <Text style={styles.prevText}>{username}</Text>
//       <Text
//         style={[styles.prevText, { width: 260, color: "#8A8888" }]}
//         numberOfLines={1}
//         ellipsizeMode="tail"
//       >
//         {content}
//       </Text>
//     </Pressable>
//   );
// };

const SendComment = ({ postId, setRefresh }) => {
  const [comment, setComment] = useState("");

  const sendComment = async () => {
    if (!comment) return;
    // axios 연동

    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }
      await api.post(
        `/api/posts/${postId}/comments`,
        { content: comment },
        {
          headers: { Authorization: token },
        }
      );
      setComment("");
      setRefresh((refresh) => !refresh);
    } catch (e) {
      console.error(e);
    }
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
    backgroundColor: "white",
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
