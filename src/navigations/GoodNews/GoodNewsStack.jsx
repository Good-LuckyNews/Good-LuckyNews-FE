import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, Pressable, View } from "react-native";
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
  Notification,
  Search,
  SeeCommentDetail,
  WriteGoodNews,
} from "../../screens";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNotification } from "../../contexts";

const Stack = createStackNavigator();

const HeaderRight = () => {
  const navigation = useNavigation();
  const { notificationList } = useNotification();
  const unreadCount = notificationList.filter((item) => !item.read).length;
  const route = useRoute();
  const isNotificationScreen = route.name === "Notification";
  const isSearchScreen = route.name === "Search";

  return (
    <React.Fragment>
      <Pressable
        onPress={() => navigation.navigate("Search")}
        style={{ marginRight: 7 }}
      >
        {isSearchScreen ? <SearchActiveIcon /> : <SearchInActiveIcon />}
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Notification')}
      >
        {isNotificationScreen ? <AlarmActiveIcon /> : <AlarmInActiveIcon />}
        {unreadCount > 0 && (
          <View
            style={{
              position: "absolute",
              right: 1.2,
              top: 2.2,
              backgroundColor: "#FF5B5B",
              width: 5,
              height: 5,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        )}
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
        headerRight: () => <HeaderRight />,
        headerLeftContainerStyle: {
          paddingLeft: 10,
        },
        headerRightContainerStyle: {
          paddingRight: 26,
        },
      }}
    >
      <Stack.Screen name='Notification' component={Notification} />
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
      <Stack.Screen
        name="SeeCommentDetail"
        component={SeeCommentDetail}
        options={({ route }) => ({
          headerTitle: route.params?.title || "댓글 보기",
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default GoodNewsStack;
