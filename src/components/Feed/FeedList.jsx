import React, { useState } from 'react';
import { Image, Pressable } from 'react-native';
import styled from 'styled-components/native';
import CategoryButton from '../CategoryButton/CategoryButton';
import ScrapButton from '../ScrapButton/ScrapButton';
import { theme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

const FeedList = ({ item, showToast }) => {
    const navigation = useNavigation();
    const [isScrapped, setIsScrapped] = useState(false);

    const handleScrap = () => {
        setIsScrapped(prevState => {
            const newState = !prevState;
            showToast(newState ? "긍정 피드를 스크랩했어요!" : "긍정 피드 스크랩을 취소했어요!");
            return newState;
        });
    };

    return (
        <FeedListContainer>
            <FeedListInnerContainer>
                <Pressable onPress={() => navigation.navigate("GoodFeedDetail", { id: item.id })} style={{ width: '100%', display: 'flex' }}>
                    <Image source={{ uri: 'https://s3-alpha-sig.figma.com/img/6e43/9c59/e39a2184abfeffa39e270dc8c99c36ab?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EaxLXgW0jwDgLHR2njlZDEL7~wUi5PxA3t9PSwIf1jKBmt2uL3IAHzkhvMrFHcxuwDoP7Sw8cD-rZlS2ax3y~O3dcfZcRhGu-YIcsRFLbtp4y7cqr0fKUD0DGiwIXCj5CuVGk8BWVU1dycDXOmowIDws6no8u8FjraUnpDZ62VP6z3CZDjQZjOPq9jJ8TKmrK7Wze3StLTgC8xmn6AlpZWS5i5LGhPBMjI6KOjpskQDwIUCdXVGS0~qDBtiKJnLkPZrLvYU9SA9dltCCx~yPCTFxcC9z-A1AZA46lLoK4NfV7NuSHoIGJjVBySbAyJH3ef-LAxjGtDYM2gGG3ayhxg__' }} style={{ width: '100%', height: 180, borderRadius: 20 }} />
                </Pressable>
                <CategoryArea>
                    <CategoryButton disabled={true} category={item.tag} />
                    <ScrapButton isScrapped={isScrapped} onPress={handleScrap} />
                </CategoryArea>
                <Pressable onPress={() => navigation.navigate("GoodFeedDetail", { id: item.id })} style={{ width: '100%', display: 'flex' }}>
                    <FeedListTitle>{item.title}</FeedListTitle>
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