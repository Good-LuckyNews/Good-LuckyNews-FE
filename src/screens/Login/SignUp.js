import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { COLORS } from "../../theme/color";
import Alert from "../../components/Alert/Alert";
import { NextStepButton } from "../../components";
import TermsAgree from "./TermsAgree";
import { useNavigation } from "@react-navigation/native";

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
  const allChecked = termsAgree.every((term) => term.checked);

  const handleNextButton = () => {
    if (!username && !email && !password && !passwordCheck) {
      setAlert("필수 입력 항목을 모두 작성해주세요!");
    }
    navigation.navigate("SignUpPreference");
  };

  return (
    <View>
      <Alert
        message={alert}
        visible={!!alert}
        backgroundColor={COLORS.MainYellow}
        onHide={() => setAlert("")}
      />

      <View style={styles.container}>
        <Pressable
          style={styles.uploadImageContainer}
          onPress={() => console.log("object")}
        >
          <Image
            source={require("../../../assets/images/uploadImage/default_profile_image.png")}
            style={styles.uploadImagePreview}
          />
          <Image
            source={require("../../../assets/images/uploadImage/upload_image_button.png")}
            style={styles.uploadImageButton}
          />
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

        <NextStepButton width={339} text="다음" onPress={handleNextButton} />
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
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 27,
  },

  uploadImageContainer: { width: 77, alignSelf: "center", marginBottom: 30 },
  uploadImagePreview: { width: 77, height: 77 },
  uploadImageButton: {
    width: 17,
    height: 17,
    position: "absolute",
    bottom: 4.8,
    right: 2.4,
  },
});
