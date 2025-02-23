import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, PanResponder } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../theme/color';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CustomAlert, Feed } from '../components';

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 40;
const MAX_VALUE = 100;
const MIN_VALUE = 0;

const Home = () => {
    const navigation = useNavigation();
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [text, setText] = useState('');
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);

    useEffect(() => {
        setText(`펫푸드 전문회사 우리와는 지난 7일 유기동물 보호 단체 동물학대방지연합(동학방)과 협력해 유기동물 복지 향상을 위한 사료 600㎏을 지원했다고 10일 밝혔다.

이번에 전달한 사료는 겨울철 영양 관리가 더욱 중요한 1세 이하와 임신 또는 출산 후 수유기의 반려견에게 도움을 줄 수 있는 제품으로 구성했다.

보호 단체에 전달된 사료는 우리와의 자체 생산 시설인 우리와 펫푸드 키친에서 최신 설비와 엄격한 품질 관리를 통해 생산되고 있다.

우리와 관계자는 “유기동물들이 어디서든 건강하고 행복한 삶을 살아가길 바라는 마음으로 올해도 꾸준히 유기동물 보호 단체 지원 활동을 이어 나갈 예정”이라며

“신선하고 안전함은 물론 맛과 영양면에서도 우수한 먹거리를 제공할 수 있도록 더 고민하고 연구하겠다”라고 전했다.`);
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
    }, [text]);

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
                        text={text}
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