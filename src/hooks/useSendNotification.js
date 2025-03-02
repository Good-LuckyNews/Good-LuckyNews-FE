import { useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

const useSendNotification = () => {
    const sendPushNotification = useCallback(async (title, body) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: 'default',
                badge: 1,
            },
            trigger: null, // 즉시 발송
        });

        Alert.alert("푸시 알림 전송됨", `${title} - ${body}`);
    }, []);

    return { sendPushNotification };
};

export default useSendNotification;
