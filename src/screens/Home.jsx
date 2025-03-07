import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, PanResponder } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../theme/color';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CustomAlert, Feed } from '../components';
import * as SecureStore from 'expo-secure-store';
import api from '../utils/common';

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 40;
const MAX_VALUE = 100;
const MIN_VALUE = 0;

const Home = () => {
    const navigation = useNavigation();
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [article, setArticle] = useState([]);
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    useEffect(() => {
        heightAnim.setValue(0);
        setIsExpanded(false);
    }, []);

    const handleShowToast = (message) => {
        setToastMessage(message);
        setToastVisible(true);
    };

    useFocusEffect(
        useCallback(() => {
            setIsOverlayVisible(true);

            heightAnim.setValue(0);
            setIsExpanded(false);
        }, [])
    );

    useEffect(() => {
        heightAnim.setValue(0);
        setIsExpanded(false);
    }, [article]);

    const [containerHeight, setContainerHeight] = useState(0);

    const heightAnim = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                if (gesture.dy < -80) {
                    Animated.timing(heightAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: false,
                    }).start(() => setIsExpanded(true));
                } else if (gesture.dy > 80) {
                    Animated.timing(heightAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: false,
                    }).start(() => setIsExpanded(false));
                }
            },
        })
    ).current;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await SecureStore.getItemAsync('userToken');
                if (token) {
                    const response = await api.get(`/article/user`, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    });
                    setArticle(response.data.result);
                    console.log(response.data.result);
                } else {
                    console.log('No token found');
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])

    return (
        <Container onLayout={(event) => setContainerHeight(event.nativeEvent.layout.height)}>
            <TopContainer>
                <TopInnerContainer>
                    <MediumText>오늘의 한 마디</MediumText>
                    <LightText>행복은 멀리 있지 않아요. 바로 오늘, 여기!</LightText>
                </TopInnerContainer>
            </TopContainer>

            <CustomAlert
                message={toastMessage}
                visible={toastVisible}
                backgroundColor={isExpanded ? COLORS.White : COLORS.MainYellow}
                duration={1500}
                onHide={() => setToastVisible(false)}
            />

            {containerHeight > 0 && (
                <YellowContainer
                    style={{
                        height: heightAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [containerHeight * 0.81, containerHeight],
                        }),
                    }}
                >
                    <YellowHeader {...panResponder.panHandlers}>
                        <YellowBar />
                    </YellowHeader>
                    <Feed
                        article={article}
                        showToast={handleShowToast}
                    />
                </YellowContainer>
            )}

            {isOverlayVisible && (
                <OverlayContainer style={{ height: containerHeight * 0.81 }}>
                    <Image
                        source={require('../../assets/images/home/blurEffect.png')}
                        style={{ position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.95, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                        blurRadius={100}
                    />
                    <OverlayBackground />
                    <PopupBox>
                        <PopupText>오늘의 긍정 뉴스를</PopupText>
                        <PopupText>준비했어요 :)</PopupText>
                        <ConfirmButton onPress={() => setIsOverlayVisible(false)}>
                            <ConfirmText>확인하기</ConfirmText>
                        </ConfirmButton>
                    </PopupBox>
                </OverlayContainer>
            )}
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.White};
    padding-bottom: 80px;
`;

const TopContainer = styled.View`
    padding: 28px 5px;
`;

const TopInnerContainer = styled.View`
    width: 100%;
    height: 84px;
    border: 1px solid ${COLORS.MainYellow};
    border-radius: 20px;
    padding: 15px 20px;
    display: flex;
    justify-content: space-around;
`;

const MediumText = styled.Text`
    font-size: 18px;
    font-weight: 400;
    font-family: ${(props) => props.theme.fonts.medium};
`;

const LightText = styled.Text`
    font-size: 18px;
    font-weight: 400;
    font-family: ${(props) => props.theme.fonts.light};
`;

const YellowContainer = styled(Animated.View)`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #FFE4A5;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding-top: 10px;
    align-items: center;
    padding-bottom: 80px;
`;

const YellowHeader = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
`;

const YellowBar = styled.View`
    width: 20%;
    height: 4px;
    border-radius: 2px;
    background-color: ${COLORS.White};
`;

const OverlayContainer = styled.View`
    position: absolute;
    width: 100%;
    justify-content: center;
    align-items: center;
    bottom: 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`;

const OverlayBackground = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    overflow: hidden;
`;

const PopupBox = styled.View`
    width: 80%;
    height: 200px;
    background-color: ${COLORS.White};
    padding-top: 20px;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
`;

const PopupText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    font-family: ${(props) => props.theme.fonts.medium};
    margin-bottom: 3px;
`;

const ConfirmButton = styled.Pressable`
    width: 80%;
    background-color: ${COLORS.MainYellow};
    padding: 10px 20px;
    border-radius: 8px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
`;

const ConfirmText = styled.Text`
    color: ${COLORS.White};
    font-family: ${(props) => props.theme.fonts.bold};
    font-size: 20px;
`;

export default Home