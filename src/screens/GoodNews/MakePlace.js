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
import { CustomAlert, NextStepButton } from "../../components";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import api from "../../utils/common";
import { useNavigation } from "@react-navigation/native";

const MakePlace = () => {
  const [placeName, setPlaceName] = useState("");
  const [placeIntro, setPlaceIntro] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [alert, setAlert] = useState("");
  const [permissionStatus, setPermissionStatus] = useState(null);
  const navigation = useNavigation();

  // 권한 요청 함수
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setPermissionStatus(status);
  };

  // 이미지 선택 함수
  const pickImage = async () => {
    if (permissionStatus === null) {
      await requestPermission(); // 권한 요청
    }

    if (permissionStatus === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setImageSrc(imageUri); // 이미지 URI 상태에 저장
        console.log("Image URI:", imageUri);
      } else {
        console.log("failure");
      }
    } else {
      alert("권한이 필요합니다!"); // 권한이 없는 경우
    }
  };

  const makePlace = async () => {
    // 조건 검사
    if (!imageSrc || !placeName || !placeIntro) {
      setAlert("필수 입력 항목을 모두 작성해주세요!");
      return;
    } else if (placeIntro.length > 200) {
      setAlert("플레이스 소개는 200자 이내로 작성해주세요.");
      return;
    }

    try {
      // 토큰 조회
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      // axios 연동
      async function makePlaceAxios() {
        try {
          const formData = new FormData();
          formData.append("image", { imageSrc });
          formData.append("placeName", placeName);
          formData.append("placeDetails", placeIntro);

          const response = await api.post(`/api/place`, formData, {
            headers: { Authorization: token },
          });
          navigation.goBack();
        } catch (error) {
          if (error.response) {
            // 서버 응답이 있는 경우
            console.error("Response error:", error.response);
            console.log("\n");
            console.error("Status code:", error.response.status);
            console.log("\n");
            console.error("Error data:", error.response.data);
          } else if (error.request) {
            // 요청은 보내졌으나 응답을 받지 못한 경우
            console.error("Request error:", error.request);
          } else {
            // 에러 메시지
            console.error("Error message:", error);
          }
          setAlert("플레이스 만들기에 실패하였습니다.");
        }
      }

      makePlaceAxios();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <CustomAlert
        message={alert}
        backgroundColor={COLORS.MainYellow}
        visible={!!alert}
        onHide={() => setAlert("")}
      />
      <View style={styles.container}>
        <Text style={styles.mainTitle}>플레이스 만들기</Text>

        <View style={{ paddingHorizontal: 12 }}>
          <Pressable style={styles.uploadImageContainer} onPress={pickImage}>
            <Image
              source={
                !!imageSrc
                  ? { uri: imageSrc }
                  : require("../../../assets/images/uploadImage/default_place_image.png")
              }
              style={styles.imagePreview}
            />
            <Image
              source={require("../../../assets/images/uploadImage/upload_image_button.png")}
              style={styles.uploadImageButton}
            />
          </Pressable>
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
          onPress={makePlace}
        />
      </View>
    </>
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
    borderRadius: "100%",
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
