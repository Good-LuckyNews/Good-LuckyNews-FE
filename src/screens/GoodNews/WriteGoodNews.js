import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const WriteGoodNews = () => {
  const [text, setText] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);

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
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setImageSrc(imageUri); // 이미지 URI 상태에 저장
        console.log("Image URI:", imageUri);

        // 서버로 이미지 전송
        // await uploadImage(imageUri);
      } else {
        console.log("failure");
      }
    } else {
      alert("권한이 필요합니다!"); // 권한이 없는 경우
    }
  };

  // 이미지 업로드 함수
  const uploadImage = async (uri) => {
    const fileName = uri.split("/").pop(); // 파일 이름 추출
    const formData = new FormData();

    formData.append("image", {
      uri,
      name: fileName,
      type: "image/jpeg", // 이미지 MIME 타입 (필요에 따라 변경)
    });

    try {
      const response = await fetch("YOUR_SERVER_URL", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log("Upload response: ", responseData);
    } catch (error) {
      console.error("Upload error: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 31, marginVertical: 26 }}>
            <TextInput
              placeholder="플레이스에 공유하고 싶은 희소식을 작성해보세요!"
              value={text}
              onChangeText={setText}
              multiline={true}
              style={styles.textInput}
            />
          </View>

          {/* 선택된 이미지 표시 */}
          {imageSrc && (
            <View style={styles.uploadedImageContainer}>
              <Image
                source={{ uri: imageSrc }}
                style={[styles.uploadedImage]}
              />
              <Pressable
                style={styles.deleteButton}
                onPress={() => setImageSrc(null)}
              >
                <Image
                  source={require("../../../assets/images/uploadImage/delete_button.png")}
                  style={{ width: 18, height: 18 }}
                />
              </Pressable>
            </View>
          )}

          {/* 이미지 업로드 부분 */}
          <View style={styles.uploadImageContainer}>
            <Pressable onPress={pickImage}>
              <Image
                source={require("../../../assets/images/uploadImage/upload_goodnews_image.png")}
                style={{ width: 34, height: 32 }}
              />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default WriteGoodNews;

const styles = StyleSheet.create({
  container: { flex: 1 },
  textInput: {
    width: "100%",
    fontFamily: "FontL",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  deleteButton: { position: "absolute", top: -6, right: -5 },
  uploadImageContainer: {
    width: 406,
    height: 49,
    position: "absolute",
    bottom: 80,
    justifyContent: "center",
    alignItems: "flex-end",
    alignSelf: "center",
    paddingRight: 28,
    borderColor: "#ECECEC",
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  uploadedImageContainer: {
    position: "relative",
    width: 163,
    height: 88,
    marginTop: 26,
    marginHorizontal: 31,
  },
  uploadedImage: {
    width: 163,
    height: 88,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
