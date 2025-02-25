import { useNavigation } from "@react-navigation/native";
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
import Alert from "../../components/Alert/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email && !password) {
      setAlert(true);
      return;
    }
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Alert
        message="이메일과 비밀번호를 정확히 입력해주세요!"
        visible={alert}
        backgroundColor={COLORS.MainYellow}
        onHide={() => setAlert(false)}
      />
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
        style={[styles.inputText, styles.emailInputText]}
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
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
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
