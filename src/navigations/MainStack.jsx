import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MainTab from "./MainTab";
import LoginStack from "./Login/LoginStack";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={MainTab} />
      <Stack.Screen name="LoginStack" component={LoginStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
