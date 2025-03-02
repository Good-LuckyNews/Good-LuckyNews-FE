import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { GoodFeed, GoodFeedDetail, Notification } from '../../screens';
import { Image, Pressable } from 'react-native';
import { AlarmActiveIcon, AlarmInActiveIcon, SearchActiveIcon, SearchInActiveIcon } from '../../utils/icons';
import { COLORS } from '../../theme/color';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const HeaderRight = ({ focused }) => {
    const navigation = useNavigation();

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
                onPress={() => navigation.navigate('Notification')}
            >
                {focused ? <AlarmActiveIcon /> : <AlarmInActiveIcon />}
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
                headerRight: ({ focused }) => (
                    <HeaderRight focused={focused} />
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
