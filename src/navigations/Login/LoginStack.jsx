import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, Pressable } from "react-native";
import {
  AlarmActiveIcon,
  AlarmInActiveIcon,
  SearchActiveIcon,
  SearchInActiveIcon,
} from "../../utils/icons";
import { COLORS } from "../../theme/color";
import Login from "../../screens/Login/Login";
import { SignUp } from "../../screens";

const Stack = createStackNavigator();

const HeaderRight = ({ focused }) => {
  // const navigation = useNavigation();

  return (
    <React.Fragment>
      {/* 검색 버튼 */}
      <Pressable
        // onPress={() => navigation.navigate('SearchScreen')}
        style={{ marginRight: 7 }}
      >
        {focused ? <SearchActiveIcon /> : <SearchInActiveIcon />}
      </Pressable>

      {/* 알림 버튼 */}
      <Pressable
      // onPress={() => navigation.navigate('NotificationScreen')}
      // style={{ marginRight: 27 }}
      >
        {focused ? <AlarmActiveIcon /> : <AlarmInActiveIcon />}
      </Pressable>
    </React.Fragment>
  );
};

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
    </Stack.Navigator>
  );
};

export default LoginStack;
