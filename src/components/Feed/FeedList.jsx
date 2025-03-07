import React from 'react';
import { Image, Pressable } from 'react-native';
import styled from 'styled-components/native';
import CategoryButton from '../CategoryButton/CategoryButton';
import ScrapButton from '../ScrapButton/ScrapButton';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useScrap } from '../../contexts';
import api from '../../utils/common';
import he from 'he';

const FeedList = ({ item, showToast, onScrapChange }) => {
    const navigation = useNavigation();
    const { scrapStatus, toggleScrap } = useScrap();
    const isScrapped = scrapStatus[item?.id] ?? (item?.bookmarked);

    const originalDomain = item?.originalLink ? new URL(item.originalLink).origin : '';
    const imageUrl = item.image.startsWith('https') ? item.image : `${originalDomain}${item.image}`;

    const handleScrap = async () => {
        try {
            const token = await SecureStore.getItemAsync('userToken');
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await api.post(`/article/${item?.id}/like`, {}, {
                headers: {
                    'Authorization': `${token}`,
                },
            });

            if (response.data.isSuccess) {
                const updatedBookmarked = response.data.result.bookmarked;

                toggleScrap(item?.id, updatedBookmarked);

                showToast(updatedBookmarked ? "긍정 피드를 스크랩했어요!" : "긍정 피드 스크랩을 취소했어요!");

                if (onScrapChange) {
                    onScrapChange();
                }
            } else {
                console.error(`스크랩 요청 실패:`, response.data.message);
            }
        } catch (error) {
            console.error("Error handling scrap:", error);
        }
    };

    return (
        <FeedListContainer>
            <FeedListInnerContainer>
                {imageUrl &&
                    <Pressable onPress={() => navigation.navigate("GoodFeedDetail", { id: item.id })} style={{ width: '100%', display: 'flex' }}>
                        <Image source={{ uri: imageUrl }} style={{ width: '100%', height: 180, borderRadius: 20 }} />
                    </Pressable>
                }
                <CategoryArea>
                    <CategoryButton disabled={true} category={item?.keywords} />
                    <ScrapButton isScrapped={isScrapped} onPress={handleScrap} />
                </CategoryArea>
                <Pressable onPress={() => navigation.navigate("GoodFeedDetail", { id: item.id })} style={{ width: '100%', display: 'flex' }}>
                    <FeedListTitle>{he.decode(item.title)}</FeedListTitle>
                    <FeedListDate>{item.date}</FeedListDate>
                </Pressable>
            </FeedListInnerContainer>
        </FeedListContainer>
    )
}

const FeedListContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const FeedListInnerContainer = styled.View`
    width: 95%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 24px 0 14px 0;
    border-bottom-width: 1px;
    border-bottom-color: rgba(217, 217, 217, 0.50);
`;

const CategoryArea = styled.View`
    width: 100%;
    padding: 10px 5px 8px 5px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const FeedListTitle = styled.Text`
    align-self: flex-start;
    font-size: 16px;
    font-family: ${(props) => props.theme.fonts.medium};
    padding: 0 12px;
`;

const FeedListDate = styled.Text`
    align-self: flex-start;
    font-size: 13px;
    font-family: ${(props) => props.theme.fonts.light};
    padding: 8px 12px 0 12px;
    color: #5B5B5B;
`;

export default FeedList