import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { COLORS } from "../theme/color";
import {
  AlarmActiveIcon,
  AlarmInActiveIcon,
  GoodFeedActiveIcon,
  GoodFeedInActiveIcon,
  GoodNewsActiveIcon,
  GoodNewsInActiveIcon,
  HomeActiveIcon,
  HomeInActiveIcon,
  MyActiveIcon,
  MyInActiveIcon,
  SearchActiveIcon,
  SearchInActiveIcon,
} from "../utils/icons";
import GoodNewsStack from "./GoodNews/GoodNewsStack";
import GoodFeedStack from "./GoodFeed/GoodFeedStack";
import { Image, Pressable, View } from "react-native";
import { theme } from "../theme/theme";
import MyPageStack from "./MyPage/MyPageStack";
import { useNavigation, useRoute } from "@react-navigation/native";
import HomeStack from "./Home/HomeStack";
import { useNotification } from "../contexts";

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, ActiveIcon, InactiveIcon }) => {
  return focused ? <ActiveIcon /> : <InactiveIcon />;
};

const HeaderRight = ({ focused }) => {
  const navigation = useNavigation();
  const { notificationList } = useNotification();
  const unreadCount = notificationList.filter((item) => !item.read).length;
  const route = useRoute();
  const isNotificationScreen = route.name === "Notification";
  const isSearchScreen = route.name === "Search";

  return (
    <React.Fragment>
      {/* 검색 버튼 */}
      <Pressable
        onPress={() => navigation.navigate("Search")}
        style={{ marginRight: 7 }}
      >
        {isSearchScreen ? <SearchActiveIcon /> : <SearchInActiveIcon />}
      </Pressable>

      {/* 알림 버튼 */}
      <Pressable onPress={() => navigation.navigate("Notification")}>
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

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: COLORS.MainYellow,
        tabBarInactiveTintColor: COLORS.Gray,
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderWidth: 1,
          borderColor: "rgba(200, 200, 200, 0.38)",
          shadowColor: "rgba(0, 0, 0)",
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 4,
          elevation: 4,
          position: "absolute",
        },
        tabBarLabelStyle: {
          marginTop: 5,
          fontSize: 15,
          fontFamily: theme.fonts.medium,
        },
        headerTintColor: COLORS.Black,
        cardStyle: { backgroundColor: COLORS.White },
        headerBackTitle: "",
        headerTitle: () => (
          <Image
            source={require("../../assets/images/logo/logo_top.png")}
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
      <Tab.Screen
        name="홈"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              ActiveIcon={HomeActiveIcon}
              InactiveIcon={HomeInActiveIcon}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="긍정 피드"
        component={GoodFeedStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              ActiveIcon={GoodFeedActiveIcon}
              InactiveIcon={GoodFeedInActiveIcon}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="희소식"
        component={GoodNewsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              ActiveIcon={GoodNewsActiveIcon}
              InactiveIcon={GoodNewsInActiveIcon}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MY"
        component={MyPageStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              ActiveIcon={MyActiveIcon}
              InactiveIcon={MyInActiveIcon}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
