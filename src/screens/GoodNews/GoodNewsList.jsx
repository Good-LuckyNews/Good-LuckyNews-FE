import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../theme/color";
import MakePlaceButton from "./MakePlaceButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GoodNewsComponent } from "../../components";
import DeleteModal from "../../components/News/DeleteModal";
import api from "../../utils/common";
import * as SecureStore from "expo-secure-store";

const GoodNewsList = ({
  timeline = [],
  selectedCommentId,
  setSelectedCommentId,
  placeName,
  placeId,
  fetchPostData,
}) => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);

  const [commentsByPost, setCommentsByPost] = useState({});

  const handleDelete = (id) => setSelectedCommentId(id);

  const deleteGoodNews = async (id) => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }
      await api.delete(`/api/posts/${id}`, {
        headers: { Authorization: token },
      });
      alert("삭제 성공");
      setRefresh((prev) => !prev);
    } catch (e) {
      if (e?.status === 403) {
        alert("권한이 없습니다.");
      }
    } finally {
      setSelectedCommentId(null);
    }
  };

  const fetchComments = async (postId) => {
    if (!postId) return;
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }
      const response = await api.get(`/api/posts/${postId}/comments`, {
        headers: { Authorization: token },
        params: { page: 0, size: 10 },
      });

      const list = Array.isArray(response.data?.result)
        ? response.data.result
        : [];

      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: list,
      }));
    } catch (error) {
      console.error("댓글 가져오기 실패:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPostData?.();
    }, [])
  );

  useEffect(() => {
    fetchPostData?.();
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    if (!Array.isArray(timeline)) return;
    timeline.forEach((item) => {
      const postId = item?.postId;
      if (!postId) return;
      if (item.commentCount > 0 && !commentsByPost[postId]) {
        fetchComments(postId);
      }
    });
  }, [timeline]);

  return (
    <View style={{ flex: 1 }}>
      <DeleteModal
        visible={!!selectedCommentId}
        text="희소식을 삭제하시겠습니까?"
        onCancel={() => setSelectedCommentId(null)}
        onDelete={() => deleteGoodNews(selectedCommentId)}
      />

      <View style={styles.container}>
        <FlatList
          data={Array.isArray(timeline) ? timeline : []}
          keyExtractor={(item, idx) => String(item?.postId ?? idx)}
          ListHeaderComponent={
            <MakePlaceButton
              type="희소식"
              style={{ marginVertical: 30, marginBottom: 7 }}
              title={placeName}
              placeId={placeId}
            />
          }
          renderItem={({ item }) => {
            if (!item) return null;

            const postId = item.postId;
            const comments = commentsByPost[postId] || [];
            const showComments = (item.commentCount ?? 0) > 0;

            return (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#D9D9D9",
                  position: "relative",
                }}
              >
                <Pressable
                  style={styles.goodNewsContainer}
                  onPress={() =>
                    navigation.navigate("SeeCommentDetail", {
                      title: placeName,
                      postInfo: item,
                      postId: postId,
                    })
                  }
                  onLongPress={(e) => {
                    e.stopPropagation();
                    handleDelete(postId);
                  }}
                  delayLongPress={500}
                >
                  <GoodNewsComponent
                    id={postId}
                    username={item?.writer?.name ?? ""}
                    profileImage={item?.writer?.profileImage}
                    time={
                      item?.createdAt
                        ? item.createdAt.split("T")[0].replace(/-/g, ".")
                        : ""
                    }
                    content={item?.content ?? ""}
                    imageSrc={item?.image ?? null}
                    likeCount={item?.likeCount ?? 0}
                    liked={item?.liked ?? false}
                    commentCount={item?.commentCount ?? 0}
                    setRefresh={setRefresh}
                  />
                </Pressable>

                {showComments && (
                  <CommentList
                    postId={postId}
                    comments={comments}
                    selectedCommentId={selectedCommentId}
                    handleDelete={handleDelete}
                    fetchComments={fetchComments}
                    placeName={placeName}
                    postItem={item}
                  />
                )}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const CommentList = ({
  postId,
  comments = [],
  selectedCommentId,
  handleDelete,
  placeName,
  postItem, 
}) => {
  const navigation = useNavigation();

  const list = Array.isArray(comments) ? comments : [];
  const count = list.length;
  if (count === 0) return null;

  const last = list[count - 1];
  const showSeeAllButton = count > 1;

  return (
    <>
      {showSeeAllButton && (
        <Pressable
          style={styles.seeAllCommentsContainer}
          onPress={() =>
            navigation.navigate("SeeCommentDetail", {
              title: placeName,
              postInfo: postItem,
              postId,
            })
          }
        >
          <Text style={styles.seeAllCommentsText}>전체보기</Text>
        </Pressable>
      )}

      {/* 리스트는 그대로: 댓글 1개만 미리 보여주기 */}
      <Pressable
        style={selectedCommentId === last?.id ? styles.selectedItem : undefined}
        onLongPress={(e) => {
          e.stopPropagation();
          if (last?.id) handleDelete(last.id);
        }}
        delayLongPress={500}
      >
        <GoodNewsComponent
          type="comment"
          username={last?.writer?.name ?? ""}
          profileImage={last?.writer?.profileImage ?? ""}
          time={last?.time ?? ""}
          content={last?.content ?? ""}
          image={last?.image ?? null}
          likeCount={last?.likeCount ?? 0}
          liked={last?.liked ?? false}
          commentCount={last?.commentCount ?? 0}
          style={{ marginTop: 28, marginBottom: 22 }}
        />
      </Pressable>
    </>
  );
};

export default GoodNewsList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 90,
    marginHorizontal: 12,
    position: "relative",
  },
  goodNewsContainer: {
    backgroundColor: COLORS.White,
    paddingTop: 22,
    paddingHorizontal: 10,
    paddingBottom: 9,
  },
  seeAllCommentsContainer: {
    marginTop: 15,
    marginLeft: 42,
  },
  seeAllCommentsText: {
    color: "#8A8888",
    fontFamily: "FontM",
    fontSize: 13,
    fontWeight: "400",
  },
  selectedItem: {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
});
