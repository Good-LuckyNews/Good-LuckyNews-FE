import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS } from "../../theme/color";
import { CustomAlert } from "../../components";
import api from "../../utils/common";
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import { useNotification } from "../../contexts";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const navigation = useNavigation();
  const { addNotification } = useNotification();

  const handleLogin = () => {
    if (!email && !password) {
      setAlert("이메일과 비밀번호를 정확히 입력해주세요!");
    } else {
      async function loginAxios() {
        try {
          console.log({ email, password });
          const response = await api.post(
            `/api/member/login`,
            { email, password },
            { headers: { "Content-Type": "application/json" } }
          );
          console.log("로그인 완료");
          const token = response.data.result;
          SecureStore.setItemAsync('userToken', token, { keychainAccessible: SecureStore.WHEN_UNLOCKED });
          navigation.replace('Main');
          scheduleDailyNotification(addNotification);
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
            console.error("Error message:", error.message);
          }
          setAlert("로그인에 실패하였습니다.");
        }
      }
      loginAxios();
    }
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        message={alert}
        visible={!!alert}
        backgroundColor={COLORS.MainYellow}
        onHide={() => setAlert("")}
      />

      <View style={{ marginTop: -30, alignItems: "center" }}>
        <Image
          source={require("../../../assets/images/logo/logo.png")}
          style={styles.logoImage}
        />
        <Image
          source={require("../../../assets/images/logo/logo_text.png")}
          style={styles.logoText}
        />
        <TextInput
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCompleteType="off"
          style={[styles.inputText, styles.emailInputText]}
        />
        <TextInput
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCompleteType="off"
          style={[styles.inputText, styles.passwordInputText]}
          secureTextEntry={true}
        />
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>

        <View style={{ flexDirection: "row", gap: 2 }}>
          <Text style={styles.signUpPromptText}>아직 회원이 아니신가요?</Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUpButton}>회원가입하기</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

async function scheduleDailyNotification(addNotification) {
  const trigger = new Date();
  trigger.setHours(8);
  trigger.setMinutes(0);
  trigger.setSeconds(0);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "희소식",
      body: "지금 지치셨다면, 잠깐 오늘의 따뜻한 뉴스를 확인해 보세요!",
      sound: 'default',
      badge: 1,
    },
    trigger: {
      hour: trigger.getHours(),
      minute: trigger.getMinutes(),
      repeats: true,
    },
  });

  addNotification("희소식", "지금 지치셨다면, 잠깐 오늘의 따뜻한 뉴스를 확인해 보세요!", "logo");
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 55,
  },
  logoImage: {
    width: 90,
    height: 65,
  },
  logoText: {
    width: 209,
    height: 77,
  },

  inputText: {
    width: 271,
    height: 44,
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: COLORS.MainYellow,
    fontFamily: "FontM",
    fontSize: 14,
  },
  emailInputText: {
    marginTop: 37,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  passwordInputText: {
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  loginButton: {
    width: 271,
    height: 38,
    marginTop: 26,
    marginBottom: 15.5,
    backgroundColor: COLORS.MainYellow,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#FBFEFD",
    fontFamily: "FontB",
    fontSize: 17,
    fontWeight: 400,
  },

  signUpPromptText: {
    color: COLORS.Gray,
    fontFamily: "FontM",
    fontSize: 12,
    fontWeight: 400,
  },
  signUpButton: {
    borderBottomWidth: 1,
    borderColor: "#7B7979",
    color: "#7B7979",
    fontFamily: "FontB",
    fontSize: 12,
    fontWeight: 400,
  },
});
