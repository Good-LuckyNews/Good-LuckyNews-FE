import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { COLORS } from "../../theme/color";
import { CustomAlert, NextStepButton } from "../../components";
import TermsAgree from "./TermsAgree";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const initialTerms = [
  {
    idx: 0,
    title: "만 14세 이상 서비스 이용 동의",
    detail: false,
    required: true,
    checked: false,
  },
  {
    idx: 1,
    title: "개인정보 수집/이용 동의",
    detail: true,
    required: true,
    checked: false,
  },
  {
    idx: 2,
    title: "서비스 이용 약관",
    detail: true,
    required: true,
    checked: false,
  },
  {
    idx: 3,
    title: "PUSH 알림 동의",
    detail: false,
    required: false,
    checked: false,
  },
  {
    idx: 4,
    title: "마케팅 정보/이용 동의",
    detail: false,
    required: false,
    checked: false,
  },
];

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [alert, setAlert] = useState("");
  const [termsAgree, setTermsAgree] = useState(initialTerms);
  const [bottomButtonclicked, setButtonClicked] = useState(false);
  const allChecked = termsAgree.every((term) => term.checked);
  const [imageUri, setImageUri] = useState(null);

  const handleNextButton = () => {
    if (validateSignupInputs()) {
      setButtonClicked(true);

      navigation.navigate("SignUpPreference", {
        email,
        password,
        name: username,
        image: imageUri,
      });
    }
  };

  const validateSignupInputs = () => {
    let alertMessage = "";

    if (!username && !email && !password && !passwordCheck)
      alertMessage = "필수 입력 항목을 모두 작성해주세요!";
    else if (!email.includes("@") || !email.includes("."))
      alertMessage = "이메일 형식이 잘못되었습니다.";
    else if (password.length < 8)
      alertMessage = "비밀번호는 8~12자 이내로 작성해주시기 바랍니다.";
    else if (password !== passwordCheck)
      alertMessage = "비밀번호가 일치하지 않습니다.";

    if (alertMessage) {
      setAlert(alertMessage);
      return false;
    } else return true;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "권한 필요",
        "이미지를 선택하려면 갤러리 접근 권한이 필요합니다."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  return (
    <View>
      <CustomAlert
        message={alert}
        visible={!!alert}
        backgroundColor={COLORS.MainYellow}
        onHide={() => setAlert("")}
      />

      <View style={styles.container}>
        <Pressable style={styles.uploadImageContainer} onPress={pickImage}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.uploadImagePreview}
            />
          ) : (
            <Image
              source={require("../../../assets/images/uploadImage/default_profile_image.png")}
              style={styles.uploadImagePreview}
            />
          )}
          <Pressable onPress={pickImage}>
            <Image
              source={require("../../../assets/images/uploadImage/upload_image_button.png")}
              style={styles.uploadImageButton}
            />
          </Pressable>
        </Pressable>

        <View style={{ gap: 25 }}>
          <View>
            <QuestionText text="닉네임" />
            <StyledTextInput
              placeholder="2~16자 이내로 입력해주세요."
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View>
            <QuestionText text="이메일" />
            <StyledTextInput
              placeholder="example@example.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <QuestionText text="비밀번호" />
            <StyledTextInput
              placeholder="영문/숫자/특수문자 혼합, 8~12자"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              style={{ marginBottom: 8 }}
            />
            <StyledTextInput
              placeholder="비밀번호를 한 번 더 입력해주세요."
              secureTextEntry={true}
              value={passwordCheck}
              onChangeText={setPasswordCheck}
            />
          </View>
        </View>

        <TermsAgree
          termsAgree={termsAgree}
          setTermsAgree={setTermsAgree}
          allChecked={allChecked}
        />

        <NextStepButton
          width={339}
          text="다음"
          clicked={bottomButtonclicked}
          onPress={handleNextButton}
        />
      </View>
    </View>
  );
};

export default SignUp;

const QuestionText = ({ text }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 10,
        marginLeft: 4,
        marginBottom: 14,
      }}
    >
      <Text
        style={{
          fontFamily: "FontM",
          fontSize: 18,
          fontWeight: 400,
        }}
      >
        {text}
      </Text>
      <Text
        style={{
          fontFamily: "FontM",
          fontSize: 10,
          fontWeight: 400,
          color: COLORS.Gray,
        }}
      >
        * 필수 입력 항목입니다.
      </Text>
    </View>
  );
};

const StyledTextInput = ({
  style,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[
        {
          width: 339,
          height: 44,
          paddingHorizontal: 9,
          paddingVertical: 15,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: COLORS.MainYellow,
          fontFamily: "FontM",
          fontSize: 14,
        },
        style,
      ]}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      autoCompleteType="off"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 27,
  },

  uploadImageContainer: {
    width: 77,
    alignSelf: "center",
    marginBottom: 30,
    borderRadius: 50,
  },
  uploadImagePreview: { width: 77, height: 77, borderRadius: 50 },
  uploadImageButton: {
    width: 17,
    height: 17,
    position: "absolute",
    bottom: 4.8,
    right: 2.4,
  },
});
