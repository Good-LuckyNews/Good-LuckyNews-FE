import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { COLORS } from "../../theme/color";
import { Login, PrivacyConsent, SignUp, TermsOfService } from "../../screens";

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: COLORS.Black,
        cardStyle: { backgroundColor: COLORS.White },
        headerBackTitle: "",
        headerLeftContainerStyle: {
          paddingLeft: 10,
        },
        headerRightContainerStyle: {
          paddingRight: 26,
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitle: "회원가입" }}
      />
      <Stack.Screen
        name="PrivacyConsent"
        component={PrivacyConsent}
        options={{ headerTitle: "개인정보 수집/이용 동의" }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={{ headerTitle: "서비스 이용 약관" }}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
