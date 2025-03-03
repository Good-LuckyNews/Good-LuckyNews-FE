import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS } from "../../theme/color";
import { NextStepButton } from "../../components";

const MakePlace = () => {
  const [placeName, setPlaceName] = useState("");
  const [placeIntro, setPlaceIntro] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>플레이스 만들기</Text>

      <View style={{ paddingHorizontal: 12 }}>
        <View style={styles.uploadImageContainer}>
          <Image
            source={require("../../../assets/images/uploadImage/default_place_image.png")}
            style={styles.imagePreview}
          />
          <Pressable onPress={() => console.log("upload image")}>
            <Image
              source={require("../../../assets/images/uploadImage/upload_image_button.png")}
              style={styles.uploadImageButton}
            />
          </Pressable>
        </View>
        <RequiredText style={{ alignSelf: "center", marginBottom: 43 }} />

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>플레이스명</Text>
          <RequiredText />
        </View>
        <TextInput
          placeholder="플레이스명을 작성해주세요."
          value={placeName}
          onChangeText={setPlaceName}
          style={[styles.textInputCommon, styles.textInputSmall]}
          placeholderTextColor="#ADADAD"
        />

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>플레이스 소개</Text>
          <RequiredText />
        </View>
        <TextInput
          placeholder="간략한 소개를 200자 이내로 작성해주세요."
          multiline
          numberOfLines={3}
          value={placeIntro}
          onChangeText={setPlaceIntro}
          style={[styles.textInputCommon, styles.textInputLarge]}
          placeholderTextColor="#ADADAD"
        />
      </View>

      <NextStepButton
        width={339}
        text="플레이스 만들기"
        style={{ position: "absolute", bottom: 113, marginHorizontal: "27" }}
      />
    </View>
  );
};

const RequiredText = ({ style }) => {
  return (
    <Text
      style={[
        {
          fontFamily: "FontM",
          fontSize: 10,
          fontWeight: 400,
          color: COLORS.Gray,
        },
        style,
      ]}
    >
      * 필수 입력 항목입니다.
    </Text>
  );
};

export default MakePlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 18,
    backgroundColor: COLORS.LightGray,
  },
  mainTitle: {
    fontFamily: "FontM",
    fontSize: 22,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.408,
  },

  uploadImageContainer: {
    width: 91,
    height: 91,
    position: "relative",
    alignSelf: "center",
    marginTop: 43,
    marginBottom: 13,
  },
  imagePreview: {
    width: 91,
    height: 91,
  },
  uploadImageButton: {
    width: 19,
    height: 19,
    position: "absolute",
    bottom: 0,
    right: 0,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    marginBottom: 11,
  },
  titleText: {
    fontFamily: "FontM",
    fontSize: 19,
    fontWeight: 400,
  },
  textInputCommon: {
    width: 334,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: COLORS.White,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontFamily: "FontM",
    fontWeight: 400,
  },
  textInputSmall: {
    height: 44,
    marginBottom: 40,
  },
  textInputLarge: {
    height: 99,
    marginBottom: 99,
  },
});
