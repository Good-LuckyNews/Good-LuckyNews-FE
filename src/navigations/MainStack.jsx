import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import MainTab from "./MainTab";
import LoginStack from "./Login/LoginStack";
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();

const MainStack = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Error fetching token", error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    isAuthenticated ?
      (
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Main" component={MainTab} />
          <Stack.Screen name="LoginStack" component={LoginStack} />
        </Stack.Navigator>
      )
      :
      (
        <Stack.Navigator
          initialRouteName="LoginStack"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Main" component={MainTab} />
          <Stack.Screen name="LoginStack" component={LoginStack} />
        </Stack.Navigator>
      )

  );
};

export default MainStack;
