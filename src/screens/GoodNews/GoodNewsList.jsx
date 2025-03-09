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

const GoodNewsList = ({
  timeline,
  selectedCommentId,
  setSelectedCommentId,
  placeName,
}) => {
  const navigation = useNavigation();

  const handleDelete = (id) => {
    // 데이터 삭제
    console.log(id);
    setSelectedCommentId(id);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={timeline}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <MakePlaceButton
              type="희소식"
              style={{ marginVertical: 30, marginBottom: 7 }}
              title={placeName}
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
                style={[
                  styles.goodNewsContainer,
                  selectedCommentId === item.id && styles.selectedItem,
                ]}
                onPress={() =>
                  navigation.navigate("SeeCommentDetail", {
                    title: placeName,
                    commentId: item.id,
                  })
                }
                onLongPress={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                delayLongPress={500}
              >
                <GoodNewsComponent
                  username={item.username}
                  time={item.time}
                  content={item.content}
                  image={item.image}
                  likeCount={item.likeCount}
                  liked={item.liked}
                  commentCount={item.comment.length}
                />
              </Pressable>
              {item.comment.length > 0 && (
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

const CommentList = ({ commentList, selectedCommentId, handleDelete }) => {
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
            style={[
              { marginBottom: 22 },
              selectedCommentId === comment.id && styles.selectedItem,
            ]}
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
              commentCount={comment.comment.length}
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
            commentCount={commentList[lastCommentIdx].comment.length}
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
  selectedItem: {
    backgroundColor: "Gray",
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 1,
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
