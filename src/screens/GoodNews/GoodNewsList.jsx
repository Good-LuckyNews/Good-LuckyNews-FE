import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CommentComponent, LikeComponent } from "../../components";
import { COLORS } from "../../theme/color";
import MakePlaceButton from "./MakePlaceButton";

const GoodNewsList = ({
  timeline,
  selectedCommentId,
  setSelectedCommentId,
}) => {
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

const GoodNewsComponent = ({
  username,
  time,
  content,
  image,
  likeCount,
  liked,
  commentCount,
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

export default GoodNewsList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 70,
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
