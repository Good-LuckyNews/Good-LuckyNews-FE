import React, { useState } from 'react';
import styled from 'styled-components/native';
import { CommentIcon, HeartActiveIcon, HeartInActiveIcon } from '../../utils/icons';
import { COLORS } from '../../theme/color';
import { Pressable } from 'react-native';
import { getTimeDifference } from '../../hooks';
import * as Notifications from 'expo-notifications';
import { useNotification } from '../../contexts';
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const NewsList = ({ item }) => {
    const navigation = useNavigation();
    const [isHearted, setIsHearted] = useState(false);
    const { addNotification } = useNotification();

    const toggleHeart = async () => {
        setIsHearted(!isHearted);

        if (!isHearted) {
            await sendPushNotification(addNotification, "웃음 한 스푼", "희소식에 새로운 좋아요를 받았어요 :)", "like");
        }
    };

    return (
        <NewsListContainer>
            <NewsListInnerContainer>
                <Pressable onPress={() => navigation.navigate("GoodNewsDetail", {id: item.placeId})}>
                    <NewsTopContainer>
                        <TopLeftContainer>
                            <LeftTopArea>
                                <NameText>{item.placeName}</NameText>
                                <DateText>{getTimeDifference(item.updatedAt)}</DateText>
                            </LeftTopArea>
                            <LeftContentArea>
                                <ContentText>{item.content}</ContentText>
                            </LeftContentArea>
                        </TopLeftContainer>
                        <TopRightContainer>
                            {item.image ? <ProfileImage source={{ uri: item.image }} /> : <ProfileImage source={require("../../../assets/images/logo/logo.png")} />}
                        </TopRightContainer>
                    </NewsTopContainer>
                </Pressable>
                <NewsBottomContainer>
                    <HeartArea>
                        <Pressable onPress={toggleHeart}>
                            {isHearted ? <HeartActiveIcon /> : <HeartInActiveIcon />}
                        </Pressable>
                        <CountText isHearted={isHearted}>{item.likeCount}</CountText>
                    </HeartArea>
                    <CommentArea>
                        <Pressable onPress={() =>
                            navigation.navigate("SeeCommentDetail")
                        }>
                            <CommentIcon />
                        </Pressable>
                        <CountText>{item.commentCount}</CountText>
                    </CommentArea>
                </NewsBottomContainer>
            </NewsListInnerContainer>
        </NewsListContainer>
    )
}

async function sendPushNotification(addNotification, title, body, imageType) {
    await Notifications.scheduleNotificationAsync({
        content: { title, body, sound: 'default', badge: 1, data: { imageType } },
        trigger: null,
    });

    addNotification(title, body, imageType);
}

const NewsListContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const NewsListInnerContainer = styled.View`
    width: 95%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 24px 0 10px 0;
    border-bottom-width: 1px;
    border-bottom-color: rgba(217, 217, 217, 0.50);
`;

const NewsTopContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TopLeftContainer = styled.View`
    width: 77%;
    padding: 0 8px;
`;

const TopRightContainer = styled.View`
    width: 23%;
    padding: 0 8px;
    justify-content: flex-end;
    align-items: center;
`;

const ProfileImage = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 50px;
    border: 1px solid #D9D9D9;
`;

const LeftTopArea = styled.View`
    width: 100%;
    justify-self: flex-start;
    flex-direction: row;
    gap: 8;
`;

const NameText = styled.Text`
    font-size: 16px;
    font-family: ${(props) => props.theme.fonts.bold};
`;

const DateText = styled.Text`
    color: #8A8888;
    font-size: 11px;
    font-family: ${(props) => props.theme.fonts.medium};
    align-self: flex-end;
`;

const LeftContentArea = styled.View`
    width: 95%;
    padding: 6px 0;
`;

const ContentText = styled.Text`
    font-size: 13px;
    font-family: ${(props) => props.theme.fonts.light};
`;

const NewsBottomContainer = styled.View`
    width: 95%;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 15px;
    padding-right: 8px;
`;

const HeartArea = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 3;
`;

const CommentArea = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 3;
`;

const CountText = styled.Text`
    font-size: 11px;
    font-family: ${(props) => props.theme.fonts.medium};
    color: ${(props) => (props.isHearted ? COLORS.MainYellow : '#8A8888')};
`;

export default NewsList