import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform, Alert, FlatList, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/color';

// 알림 핸들러 설정
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function Notification() {
    const navigation = useNavigation();
    const [expoPushToken, setExpoPushToken] = useState(null);
    const [notificationList, setNotificationList] = useState([]);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();

    // 푸시 알림 권한 요청 및 Expo Push Token 가져오기
    useEffect(() => {
        scheduleDailyNotification();

        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("알림 클릭됨:", response);
            navigation.navigate('Home'); // 홈 화면으로 이동
        });

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // 알림 리스너 설정
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotificationList(prevList => [
                {
                    id: Date.now().toString(),
                    title: notification.request.content.title,
                    body: notification.request.content.body
                },
                ...prevList
            ]);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
            Notifications.removeNotificationSubscription(subscription);
        };
    }, []);

    return (
        <View style={{flex:1, paddingBottom: 80}}>
            <FlatList
                data={notificationList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <AlarmContainer>
                        <Image 
                        source={require('../../../assets/icon.png')}
                        style={{
                            backgroundColor: COLORS.White,
                            borderRadius: 50,
                            width: 40,
                            height: 40,
                            marginRight: 10,
                        }}
                         />
                        <View>
                            <AlarmTitle>{item.title}</AlarmTitle>
                            <AlarmText>{item.body}</AlarmText>
                        </View>
                    </AlarmContainer>
                )}
            />

            <Button
                title="푸시 알림 테스트"
                onPress={() => sendPushNotification("테스트 알림", "이것은 테스트 푸시 알림입니다.")}
            />
        </View>
    );
}

// ✅ 알림 권한 요청 및 Expo Push Token 가져오기
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
        // ⚠️ 에뮬레이터에서는 푸시 토큰을 가져올 수 없음
        console.log("에뮬레이터에서는 푸시 토큰이 필요 없음");
    }

    return token;
}

async function sendPushNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
        content: { title, body, sound: 'default', badge: 1 },
        trigger: null, // 즉시 발송
    });
}

// ✅ 푸시 알림 보내기 (로컬 테스트)
async function scheduleDailyNotification() {
    const trigger = new Date();
    trigger.setHours(8); // 오전 8시
    trigger.setMinutes(0);
    trigger.setSeconds(0);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "희소식",
            body: "지금 지치셨다면, 잠깐 오늘의 따뜻한 뉴스를 확인해 보세요!",
            sound: 'default',
            badge: 1,
        },
        trigger: {
            hour: trigger.getHours(),
            minute: trigger.getMinutes(),
            repeats: true, // 🔄 매일 반복
        },
    });

    Alert.alert("푸시 알림 설정 완료", "매일 오전 8시에 알림이 발송됩니다.");
}

const AlarmContainer = styled.View`
    width: 100%;
    background-color: rgba(245, 245, 245, 0.50);
    padding: 15px 10px;
    flex-direction: row;
    align-items: center;
`;

const AlarmTitle = styled.Text`
    font-size: 15px;
    font-family: ${(props) => props.theme.fonts.bold};
`;

const AlarmText = styled.Text`
    font-size: 13px;
    font-family: ${(props) => props.theme.fonts.medium};
`;