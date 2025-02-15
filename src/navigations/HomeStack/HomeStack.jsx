import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home, Home2 } from '../../screens';
import { Image, TouchableOpacity } from 'react-native';
import { AlarmActiveIcon, AlarmInActiveIcon, SearchActiveIcon, SearchInActiveIcon } from '../../utils/icons';
import { COLORS } from '../../theme/color';

const Stack = createStackNavigator();

const HeaderRight = ({ focused }) => {
    // const navigation = useNavigation();

    return (
        <React.Fragment>
            {/* 검색 버튼 */}
            <TouchableOpacity
                // onPress={() => navigation.navigate('SearchScreen')}
                style={{ marginRight: 7 }}
            >
                {focused ? <SearchActiveIcon /> : <SearchInActiveIcon />}
            </TouchableOpacity>

            {/* 알림 버튼 */}
            <TouchableOpacity
            // onPress={() => navigation.navigate('NotificationScreen')}
            // style={{ marginRight: 27 }}
            >
                {focused ? <AlarmActiveIcon /> : <AlarmInActiveIcon />}
            </TouchableOpacity>
        </React.Fragment>
    );
};

const HomeStack = () => {
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
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Home2" component={Home2} />
        </Stack.Navigator>
    );
};

export default HomeStack;
