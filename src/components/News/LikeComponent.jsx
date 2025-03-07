import { Image, Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../../theme/color";
import PropTypes from "prop-types";

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

export default LikeComponent;

const styles = StyleSheet.create({
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
});
