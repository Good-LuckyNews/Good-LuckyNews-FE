import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

// 1️⃣ Notification Context 생성
export const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

// 2️⃣ Provider 컴포넌트 생성
export const NotificationProvider = ({ children }) => {
    const [notificationList, setNotificationList] = useState([]);

    // ✅ 앱 실행 시 저장된 알림 불러오기
    useEffect(() => {
        loadNotifications();
        registerForPushNotificationsAsync();
    }, []);

    // ✅ AsyncStorage에서 알림 불러오기
    const loadNotifications = async () => {
        try {
            const savedNotifications = await AsyncStorage.getItem("notifications");
            if (savedNotifications) {
                setNotificationList(JSON.parse(savedNotifications));
            }
        } catch (error) {
            console.error("알림 불러오기 실패:", error);
        }
    };

    // ✅ AsyncStorage에 알림 저장
    const saveNotifications = async (notifications) => {
        try {
            await AsyncStorage.setItem("notifications", JSON.stringify(notifications));
            setNotificationList(notifications);
        } catch (error) {
            console.error("알림 저장 실패:", error);
        }
    };

    // ✅ 새로운 알림 추가 (푸시 알림이 올 때)
    const addNotification = (title, body, imageType = "logo") => {
        const newNotification = {
            id: Date.now().toString(),
            title,
            body,
            imageType,
            read: false,
        };
        const updatedList = [newNotification, ...notificationList];
        saveNotifications(updatedList);
    };

    // ✅ 알림 읽음 처리
    const markAsRead = (id) => {
        const updatedList = notificationList.map((item) =>
            item.id === id ? { ...item, read: true } : item
        );
        saveNotifications(updatedList);
    };

    // ✅ 모든 알림 삭제
    const clearNotifications = async () => {
        await AsyncStorage.removeItem("notifications");
        setNotificationList([]);
    };

    // ✅ 푸시 알림 등록 (권한 요청)
    async function registerForPushNotificationsAsync() {
        if (!Constants.isDevice) return;
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            alert("푸시 알림 권한이 거부되었습니다.");
            return;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo Push Token:", token);
    }

    return (
        <NotificationContext.Provider value={{ notificationList, addNotification, markAsRead, clearNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
