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
import { GoodNewsComponent } from "../../components";
import DeleteModal from "../../components/News/DeleteModal";

const GoodNewsList = ({
  timeline,
  selectedCommentId,
  setSelectedCommentId,
  placeName,
  placeId,
}) => {
  const navigation = useNavigation();

  const handleDelete = (id) => {
    // 데이터 삭제
    setSelectedCommentId(id);
  };

  const deleteGoodNews = () => {
    // 희소식 삭제하기 axios
    setSelectedCommentId(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <DeleteModal
        visible={!!selectedCommentId}
        text="희소식을 삭제하시겠습니까?"
        onCancel={() => setSelectedCommentId(null)}
        onDelete={deleteGoodNews}
      />
      <View style={styles.container}>
        <FlatList
          data={timeline}
          keyExtractor={(item) => item.postId}
          ListHeaderComponent={
            <MakePlaceButton
              type="희소식"
              style={{ marginVertical: 30, marginBottom: 7 }}
              title={placeName}
              placeId={placeId}
            />
          }
          renderItem={({ item }) => (
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
                    commentId: item.postId,
                  })
                }
                onLongPress={(e) => {
                  e.stopPropagation();
                  handleDelete(item.postId);
                }}
                delayLongPress={500}
              >
                <GoodNewsComponent
                  username={String(item.userId)} // 수정 필요
                  time={item.createdAt.split("T")[0].replace(/-/g, ".")}
                  content={item.content}
                  image={item.image}
                  likeCount={item.likeCount}
                  liked={item.liked}
                  commentCount={item.commentCount}
                />
              </Pressable>
              {item.commentCount > 0 && (
                <CommentList
                  commentList={item.comment}
                  selectedCommentId={selectedCommentId}
                  handleDelete={handleDelete}
                />
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const CommentList = ({ commentList = [], selectedCommentId, handleDelete }) => {
  const [seeAllComment, setSeeAllComment] = useState(false);
  const commentListLength = commentList.length;
  const [seeAllButton, setSeeAllButton] = useState(commentListLength > 1);
  const lastCommentIdx = commentListLength - 1;

  return (
    <>
      <Pressable
        style={[
          styles.seeAllCommentsContainer,
          !seeAllButton && { display: "none" },
        ]}
        onPress={() => {
          setSeeAllComment(true);
          setSeeAllButton(false);
        }}
      >
        <Text style={styles.seeAllCommentsText}>전체보기</Text>
      </Pressable>
      {commentListLength > 1 && seeAllComment ? (
        commentList.map((comment) => (
          <Pressable
            key={comment.id}
            style={{ marginBottom: 22 }}
            onLongPress={(e) => {
              e.stopPropagation();
              handleDelete(comment.id);
            }}
            delayLongPress={500}
          >
            <GoodNewsComponent
              type="comment"
              key={comment.id}
              username={comment.username}
              time={comment.time}
              content={comment.content}
              image={comment.image}
              likeCount={comment.likeCount}
              liked={comment.liked}
              commentCount={comment.commentCount}
              style={{ marginTop: 28 }}
            />
          </Pressable>
        ))
      ) : (
        <Pressable
          style={
            selectedCommentId === commentList[lastCommentIdx].id &&
            styles.selectedItem
          }
          onLongPress={(e) => {
            e.stopPropagation();
            handleDelete(commentList[lastCommentIdx].id);
          }}
          delayLongPress={500}
        >
          <GoodNewsComponent
            type="comment"
            username={commentList[lastCommentIdx].username}
            time={commentList[lastCommentIdx].time}
            content={commentList[lastCommentIdx].content}
            image={commentList[lastCommentIdx].image}
            likeCount={commentList[lastCommentIdx].likeCount}
            liked={commentList[lastCommentIdx].liked}
            commentCount={commentList[lastCommentIdx].commentCount}
            style={{ marginTop: 28, marginBottom: 22 }}
          />
        </Pressable>
      )}
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
    backgroundColor: COLORS.White,
  },

  seeAllCommentsContainer: {
    marginTop: 15,
    marginLeft: 42,
  },
  seeAllCommentsText: {
    color: "#8A8888",
    fontFamily: "FontM",
    fontSize: 13,
    fontWeight: 400,
  },
});
