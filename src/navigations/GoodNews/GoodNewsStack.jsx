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
import {
  GoodNews,
  GoodNewsDetail,
  MakePlace,
  WriteGoodNews,
} from "../../screens";

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

const GoodNewsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: COLORS.Black,
        cardStyle: { backgroundColor: COLORS.White },
        headerBackTitle: "",
        headerTitle: () => (
          <Image
            source={require("../../../assets/images/logo/logo_top.png")}
            style={{ width: 98, height: 34, resizeMode: "contain" }}
          />
        ),
        headerRight: ({ focused }) => <HeaderRight focused={focused} />,
        headerLeftContainerStyle: {
          paddingLeft: 10,
        },
        headerRightContainerStyle: {
          paddingRight: 26,
        },
      }}
    >
      <Stack.Screen name="GoodNews" component={GoodNews} />
      <Stack.Screen name="MakePlace" component={MakePlace} />
      <Stack.Screen name="GoodNewsDetail" component={GoodNewsDetail} />
      <Stack.Screen
        name="WriteGoodNews"
        component={WriteGoodNews}
        options={({ route }) => ({
          headerTitle: route.params?.title || "희소식 작성하기",
        })}
      />
    </Stack.Navigator>
  );
};

export default GoodNewsStack;
