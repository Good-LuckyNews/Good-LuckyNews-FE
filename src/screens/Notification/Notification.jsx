import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform, Alert, FlatList, Image, Pressable } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/color';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotification } from '../../contexts';

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
    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    const { notificationList, markAsRead, clearNotifications, addNotification } = useNotification();

    const imageMap = {
        "comment": require("../../../assets/images/news/comment_logo.png"),
        "like": require("../../../assets/images/likeButton/unlike.png"),
        "logo": require("../../../assets/icon.png"),
    }

    useEffect(() => {
        scheduleDailyNotification(addNotification);
    }, []);

    return (
        <View style={{ flex: 1, paddingBottom: 80 }}>
            <FlatList
                data={notificationList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => markAsRead(item.id)}>
                        <AlarmContainer read={item.read}>
                            <Image
                                source={imageMap[item.imageType] || imageMap.logo}
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
                    </Pressable>
                )}
            />

            <Button
                title="답글 알림 테스트"
                onPress={() => sendPushNotification(addNotification, "소확행", "희소식에 새로운 답글이 달렸어요 :)", "comment")}
            />
            <Button
                title="플레이스 알림 테스트"
                onPress={() => sendPushNotification(addNotification, "웃음 한 스푼", "플레이스에 새로운 좋아요를 받았어요 :)", "like")}
            />
            <Button
                title="희소식 알림 테스트"
                onPress={() => sendPushNotification(addNotification, "웃음 한 스푼", "희소식에 새로운 좋아요를 받았어요 :)", "like")}
            />
            <Button title="알림 기록 삭제" onPress={clearNotifications} />
        </View>
    );
}

async function sendPushNotification(addNotification, title, body, imageType) {
    await Notifications.scheduleNotificationAsync({
        content: { title, body, sound: 'default', badge: 1, data: { imageType } },
        trigger: null, // 즉시 발송
    });

    addNotification(title, body, imageType);
}

// ✅ 푸시 알림 보내기 (로컬 테스트)
async function scheduleDailyNotification(addNotification) {
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

    addNotification("희소식", "지금 지치셨다면, 잠깐 오늘의 따뜻한 뉴스를 확인해 보세요!", "logo");
    Alert.alert("푸시 알림 설정 완료", "매일 오전 8시에 알림이 발송됩니다.");
}

const AlarmContainer = styled.View`
    width: 100%;
    background-color: ${({ read }) => (read ? "rgba(245, 245, 245, 0.50)" : "#FFFFFF")};
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