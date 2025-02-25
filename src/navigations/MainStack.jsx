import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MainTab from "./MainTab";
import { Login, SignUp } from "../screens";
import { COLORS } from "../theme/color";

const Stack = createStackNavigator();

const MainStack = () => {
  const signUpScreenOption = {
    headerShown: true,
    headerTitleAlign: "center",
    headerTintColor: COLORS.Black,
    cardStyle: { backgroundColor: COLORS.White },
    headerBackTitle: "",
    headerTitle: "회원가입",
    headerLeftContainerStyle: { paddingLeft: 10 },
    headerRightContainerStyle: { paddingRight: 26 },
  };

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={signUpScreenOption}
      />
      <Stack.Screen name="Main" component={MainTab} />
    </Stack.Navigator>
  );
};

export default MainStack;
