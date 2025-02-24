import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";

const Login = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Login</Text>
      <Pressable onPress={() => navigation.navigate("SignUp")}>
        <Text>회원가입하기</Text>
      </Pressable>
    </View>
  );
};

export default Login;
