import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, Image, Pressable } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/color';
import { useNotification } from '../../contexts';
import * as SecureStore from 'expo-secure-store';
import api from '../../utils/common';
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function Notification() {
    const navigation = useNavigation();
    const { notificationList, markAsRead, clearNotifications, addNotification } = useNotification();

    const imageMap = {
        "comment": require("../../../assets/images/news/comment_logo.png"),
        "like": require("../../../assets/images/likeButton/unlike.png"),
        "logo": require("../../../assets/icon.png"),
    }

    const fetchReplyAlarms = async () => {
        try {
            const token = await SecureStore.getItemAsync('userToken');
            if (token) {
                const response = await api.get("/api/comments/myalarm", {
                    headers: {
                        'Authorization': `${token}`
                    }
                });

                const newAlarms = response.data.result;

                if (newAlarms && Array.isArray(newAlarms) && newAlarms.length > 0) {
                    const sortedAlarms = newAlarms.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );

                    const storedAlarms = await AsyncStorage.getItem("storedAlarmIds");
                    const previousAlarmIds = storedAlarms ? JSON.parse(storedAlarms) : [];

                    const newUniqueAlarms = sortedAlarms.filter(alarm => !previousAlarmIds.includes(alarm.id));

                    if (newUniqueAlarms.length > 0) {
                        for (let i = 0; i < newUniqueAlarms.length; i++) {
                            setTimeout(() => {
                                sendPushNotification(addNotification, "소확행", "희소식에 새로운 답글이 달렸어요 :)", "comment");
                            }, i * 2000);
                        }

                        const updatedAlarmIds = [...previousAlarmIds, ...newUniqueAlarms.map(alarm => alarm.id)];
                        await AsyncStorage.setItem("storedAlarmIds", JSON.stringify(updatedAlarmIds));
                    } else {
                        console.log("새로운 대댓글 알림 없음");
                    }
                } else {
                    console.log("새로운 대댓글 알림 없음");
                }
            } else {
                console.log('No token found');
            }
        } catch (error) {
            console.error("대댓글 알림 조회 실패:", error);
        }
    };

    useEffect(() => {
        fetchReplyAlarms();
    }, []);

    const handlePress = (id) => {
        markAsRead(id);
    }

    return (
        <View style={{ flex: 1, paddingBottom: 80 }}>
            <FlatList
                data={notificationList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handlePress(item.id)}>
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

            {/* <Button
                title="답글 알림 테스트"
                onPress={() => fetchReplyAlarms()}
            />
            <Button
                title="플레이스 알림 테스트"
                onPress={() => sendPushNotification(addNotification, "웃음 한 스푼", "플레이스에 새로운 좋아요를 받았어요 :)", "like")}
            />
            <Button title="알림 기록 삭제" onPress={clearNotifications} />
            <Button title='갯수 삭제' onPress={() => AsyncStorage.removeItem("storedAlarmIds")} /> */}
        </View>
    );
}

async function sendPushNotification(addNotification, title, body, imageType) {
    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: 'default',
                badge: 1,
                priority: "max",
                data: { imageType },
            },
            trigger: null,
        });

        addNotification(title, body, imageType);
    } catch (error) {
        console.error("푸시 알림 생성 실패:", error);
    }
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