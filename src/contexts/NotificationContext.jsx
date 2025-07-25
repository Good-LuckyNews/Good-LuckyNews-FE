import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notificationList, setNotificationList] = useState([]);

    useEffect(() => {
        loadNotifications();
        registerForPushNotificationsAsync();
    }, []);

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

    const saveNotifications = async (notifications) => {
        try {
            await AsyncStorage.setItem("notifications", JSON.stringify(notifications));
            setNotificationList(notifications);
        } catch (error) {
            console.error("알림 저장 실패:", error);
        }
    };

    const addNotification = (title, body, imageType = "logo") => {
        const newNotification = {
            id: Date.now().toString(),
            title,
            body,
            imageType,
            read: false,
        };

        // ✅ 이전 상태를 안전하게 유지하면서 새로운 알림 추가
        setNotificationList((prevNotifications) => {
            const updatedList = [newNotification, ...prevNotifications];
            saveNotifications(updatedList);
            return updatedList;
        });
    };

    const markAsRead = (id) => {
        setNotificationList((prevNotifications) => {
            const updatedList = prevNotifications.map((item) =>
                item.id === id ? { ...item, read: true } : item
            );
            saveNotifications(updatedList);
            return updatedList;
        });
    };

    const clearNotifications = async () => {
        await AsyncStorage.removeItem("notifications");
        setNotificationList([]);
    };

    async function registerForPushNotificationsAsync() {
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
