import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const useNotificationSetup = () => {
    const [expoPushToken, setExpoPushToken] = useState(null);
    const [notification, setNotification] = useState(null);
    const notificationListener = useRef();
    const responseListener = useRef();
    const navigation = useNavigation();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // ✅ 알림 수신 리스너
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // ✅ 알림 클릭 리스너 (클릭 시 홈으로 이동)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("알림 클릭됨:", response);
            navigation.navigate('Home'); 
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return { expoPushToken, notification };
};

// ✅ 푸시 알림 권한 요청 및 Expo Push Token 가져오기
async function registerForPushNotificationsAsync() {
    let token;

    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('푸시 알림 권한이 거부되었습니다.');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Expo Push Token:', token);
    } else {
        console.log("에뮬레이터에서는 푸시 토큰이 필요 없음");
    }

    return token;
}

export default useNotificationSetup;
