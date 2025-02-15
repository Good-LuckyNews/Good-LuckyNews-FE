import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { COLORS } from '../theme/color';
import { GoodFeedActiveIcon, GoodFeedInActiveIcon, GoodNewsActiveIcon, GoodNewsInActiveIcon, HomeActiveIcon, HomeInActiveIcon, MyActiveIcon, MyInActiveIcon } from '../utils/icons';
import { GoodFeed, GoodNews, Home, My } from '../screens';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, ActiveIcon, InactiveIcon }) => {
    return (
        focused ? <ActiveIcon /> : <InactiveIcon />
    )
}

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                headerTitleAlign: 'center',
                tabBarActiveTintColor: COLORS.MainYellow,
                tabBarInactiveTintColor: COLORS.Gray,
                tabBarStyle: {
                    height: 80,
                    paddingBottom: 15,
                    paddingTop: 15,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderWidth: 1,
                    borderColor: 'rgba(200, 200, 200, 0.38)',
                    shadowColor: 'rgba(0, 0, 0)',
                    shadowOpacity: 1,
                    shadowOffset: { width: 0, height: -10 },
                    shadowRadius: 4,
                    elevation: 10,
                    position: 'absolute',
                }
            }}
        >
            <Tab.Screen
                name='홈'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} ActiveIcon={HomeActiveIcon} InactiveIcon={HomeInActiveIcon} />
                    )
                }}
            />
            <Tab.Screen
                name='긍정 피드'
                component={GoodFeed}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} ActiveIcon={GoodFeedActiveIcon} InactiveIcon={GoodFeedInActiveIcon} />
                    )
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
                component={My}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} ActiveIcon={MyActiveIcon} InactiveIcon={MyInActiveIcon} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTab