import React, { useState } from 'react';
import styled from 'styled-components/native';
import { CommentIcon, HeartActiveIcon, HeartInActiveIcon, ProfileIcon } from '../../utils/icons';
import { COLORS } from '../../theme/color';
import { Pressable } from 'react-native';
import { getTimeDifference } from '../../hooks';
// import * as Notifications from 'expo-notifications';

const NewsList = ({ item }) => {
    const [isHearted, setIsHearted] = useState(false);

    const toggleHeart = async () => {
        setIsHearted(!isHearted);

        if (!isHearted) {
            await sendLikeNotification();
        }
    };

    return (
        <NewsListContainer>
            <NewsListInnerContainer>
                <NewsTopContainer>
                    <TopLeftContainer>
                        <LeftTopArea>
                            <NameText>{item.title}</NameText>
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
                <NewsBottomContainer>
                    <HeartArea>
                        <Pressable onPress={toggleHeart}>
                            {isHearted ? <HeartActiveIcon /> : <HeartInActiveIcon />}
                        </Pressable>
                        {/* <CountText isHearted={isHearted}>{item.heart}</CountText> */}
                        <CountText isHearted={isHearted}>{item.likeCount}</CountText>
                    </HeartArea>
                    <CommentArea>
                        <CommentIcon />
                        {/* <CountText>{item.comment}</CountText> */}
                        <CountText>{item.commentCount}</CountText>
                    </CommentArea>
                </NewsBottomContainer>
            </NewsListInnerContainer>
        </NewsListContainer>
    )
}

async function sendLikeNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "웃음 한 스푼 😊",
            body: "희소식에 새로운 좋아요를 받았어요! 🙂",
            sound: 'default',
            badge: 1,
        },
        trigger: null, // 즉시 발송
    });

    Alert.alert("푸시 알림 전송됨", "좋아요 알림이 전송되었습니다!");
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