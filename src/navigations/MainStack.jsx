import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MainTab from './MainTab';
import { Notification } from '../screens';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Main'
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* <Stack.Screen name='Notification' component={Notification} /> */}
            <Stack.Screen name='Main' component={MainTab} />
        </Stack.Navigator >
    )
}

export default MainStack