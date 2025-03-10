import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { GoodFeed, GoodFeedDetail, Notification } from '../../screens';
import { Image, Pressable, View } from 'react-native';
import { AlarmActiveIcon, AlarmInActiveIcon, SearchActiveIcon, SearchInActiveIcon } from '../../utils/icons';
import { COLORS } from '../../theme/color';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNotification } from '../../contexts';

const Stack = createStackNavigator();

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
                // onPress={() => navigation.navigate('SearchScreen')}
                style={{ marginRight: 7 }}
            >
                {isSearchScreen ? <SearchActiveIcon /> : <SearchInActiveIcon />}
            </Pressable>

            {/* 알림 버튼 */}
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

const GoodFeedStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: COLORS.Black,
                cardStyle: { backgroundColor: COLORS.White },
                headerBackTitle: "",
                headerTitle: () => (
                    <Image
                        source={require('../../../assets/images/logo/logo_top.png')}
                        style={{ width: 98, height: 34, resizeMode: 'contain' }}
                    />
                ),
                headerRight: () => (
                    <HeaderRight />
                ),
                headerLeftContainerStyle: {
                    paddingLeft: 10,
                },
                headerRightContainerStyle: {
                    paddingRight: 26,
                }
            }}
        >
            <Stack.Screen name="GoodFeed" component={GoodFeed} />
            <Stack.Screen name="GoodFeedDetail" component={GoodFeedDetail} />
            <Stack.Screen name='Notification' component={Notification} />
        </Stack.Navigator>
    );
};

export default GoodFeedStack;
