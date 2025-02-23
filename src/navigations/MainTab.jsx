import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { COLORS } from '../theme/color';
import { AlarmActiveIcon, AlarmInActiveIcon, GoodFeedActiveIcon, GoodFeedInActiveIcon, GoodNewsActiveIcon, GoodNewsInActiveIcon, HomeActiveIcon, HomeInActiveIcon, MyActiveIcon, MyInActiveIcon, SearchActiveIcon, SearchInActiveIcon } from '../utils/icons';
import { GoodFeed, GoodNews, Home, My } from '../screens';
import GoodFeedStack from './GoodFeed/GoodFeedStack';
import { Image, Pressable } from 'react-native';
import { theme } from '../theme/theme';
import MyPage from '../screens/MyPage/MyPage';
import MyPageStack from './MyPage/MyPageStack';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, ActiveIcon, InactiveIcon }) => {
    return (
        focused ? <ActiveIcon /> : <InactiveIcon />
    )
}

const HeaderRight = ({focused}) => {
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

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                tabBarActiveTintColor: COLORS.MainYellow,
                tabBarInactiveTintColor: COLORS.Gray,
                tabBarStyle: {
                    height: 80,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderWidth: 1,
                    borderColor: 'rgba(200, 200, 200, 0.38)',
                    shadowColor: 'rgba(0, 0, 0)',
                    shadowOpacity: 0.25,
                    shadowOffset: { width: 0, height: -2 },
                    shadowRadius: 4,
                    elevation: 4,
                    position: 'absolute',
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
                        source={require('../../assets/images/logo/logo_top.png')}
                        style={{ width: 98, height: 34, resizeMode: 'contain' }}
                    />
                ),
                headerRight: ({ focused }) => (
                    <HeaderRight focused={focused} />
                ),
                headerLeftContainerStyle: {
                    paddingLeft: 10,
                },
                headerRightContainerStyle: {
                    paddingRight: 26,
                },
            }}
        >
            <Tab.Screen
                name='홈'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} ActiveIcon={HomeActiveIcon} InactiveIcon={HomeInActiveIcon} />
                    ),
                    // headerShown: false,
                }}
            />
            <Tab.Screen
                name='긍정 피드'
                component={GoodFeedStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} ActiveIcon={GoodFeedActiveIcon} InactiveIcon={GoodFeedInActiveIcon} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name='희소식'
                component={GoodNews}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} ActiveIcon={GoodNewsActiveIcon} InactiveIcon={GoodNewsInActiveIcon} />
                    )
                }}
            />
            <Tab.Screen
                name='MY'
                component={MyPageStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} ActiveIcon={MyActiveIcon} InactiveIcon={MyInActiveIcon} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTab