import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, PanResponder, Pressable, ScrollView, Text, View } from 'react-native';
import Slider from "@react-native-community/slider";
import styled from 'styled-components/native';
import { COLORS } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import Alert from '../components/Alert/Alert';
import RoundButton from '../components/RoundButton';
import ScrapButton from '../components/ScrapButton/ScrapButton';
import { LinkIcon } from '../utils/icons';
import { theme } from '../theme/theme';

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 40;
const MAX_VALUE = 100;
const MIN_VALUE = 0;

const Home = () => {
    const navigation = useNavigation();
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isScrapped, setIsScrapped] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [tags, setTags] = useState(["긍정", "테스트", "검색"]);
    const [text, setText] = useState('');
    const [score, setScore] = useState(50);
    const [savedScore, setSavedScore] = useState(null);
    const [currentScore, setCurrentScore] = useState(score);
    const [showIndicator, setShowIndicator] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const thumbPosition = useRef(new Animated.Value((score / MAX_VALUE) * SLIDER_WIDTH)).current;

    useEffect(() => {
        setText(`펫푸드 전문회사 우리와는 지난 7일 유기동물 보호 단체 동물학대방지연합(동학방)과 협력해 유기동물 복지 향상을 위한 사료 600㎏을 지원했다고 10일 밝혔다.

이번에 전달한 사료는 겨울철 영양 관리가 더욱 중요한 1세 이하와 임신 또는 출산 후 수유기의 반려견에게 도움을 줄 수 있는 제품으로 구성했다.

보호 단체에 전달된 사료는 우리와의 자체 생산 시설인 우리와 펫푸드 키친에서 최신 설비와 엄격한 품질 관리를 통해 생산되고 있다.

우리와 관계자는 “유기동물들이 어디서든 건강하고 행복한 삶을 살아가길 바라는 마음으로 올해도 꾸준히 유기동물 보호 단체 지원 활동을 이어 나갈 예정”이라며

“신선하고 안전함은 물론 맛과 영양면에서도 우수한 먹거리를 제공할 수 있도록 더 고민하고 연구하겠다”라고 전했다.`)
    }, []);

    const handleScrap = () => {
        setIsScrapped(prevState => {
            const newState = !prevState;
            setToastMessage(newState ? "긍정 피드를 스크랩했어요!" : "긍정 피드 스크랩을 취소했어요!");
            setToastVisible(true);
            return newState;
        });
    };

    const handleComplete = () => {
        setToastMessage("긍정 평가를 저장했어요!");
        setToastVisible(true);
        setSavedScore(score);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

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

            <Alert
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
                    <YellowContent keyboardShouldPersistTaps="handled">
                        <YellowInnerContainer>
                            <RoundButton text={'기부'} width={55} clicked={false} />
                            <YellowInnerContent>
                                <BoldText>펫푸드 기업 ‘우리와’, 유기동물 보호단체에 사료 기부</BoldText>
                                <ScrapButton isScrapped={isScrapped} onPress={handleScrap} />
                            </YellowInnerContent>
                        </YellowInnerContainer>
                        <YellowContentContainer>
                            <ImageContainer>
                                <Image
                                    source={{ uri: 'https://s3-alpha-sig.figma.com/img/6e43/9c59/e39a2184abfeffa39e270dc8c99c36ab?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EaxLXgW0jwDgLHR2njlZDEL7~wUi5PxA3t9PSwIf1jKBmt2uL3IAHzkhvMrFHcxuwDoP7Sw8cD-rZlS2ax3y~O3dcfZcRhGu-YIcsRFLbtp4y7cqr0fKUD0DGiwIXCj5CuVGk8BWVU1dycDXOmowIDws6no8u8FjraUnpDZ62VP6z3CZDjQZjOPq9jJ8TKmrK7Wze3StLTgC8xmn6AlpZWS5i5LGhPBMjI6KOjpskQDwIUCdXVGS0~qDBtiKJnLkPZrLvYU9SA9dltCCx~yPCTFxcC9z-A1AZA46lLoK4NfV7NuSHoIGJjVBySbAyJH3ef-LAxjGtDYM2gGG3ayhxg__' }}
                                    resizeMode='contain' // cover는 이미지가 많이 잘리지 않을까..
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </ImageContainer>
                            <YellowTextContainer>
                                {text.split("\n").map((line, index) => (
                                    <StyledText key={index}>
                                        {line}
                                    </StyledText>
                                ))}
                                <TextFooter>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <LinkIcon />
                                        <FooterText>출처: 이데일리</FooterText>
                                    </View>
                                    <FooterText>2025.02.17</FooterText>
                                </TextFooter>
                            </YellowTextContainer>
                            <YellowEvalContainer>
                                <MediumFootText>해당 소식이 얼마나 긍정적으로 느껴지셨나요?</MediumFootText>
                                <LightFootText>* 드래그 하여 선택해 주세요.</LightFootText>
                                <View style={{ width: "100%", alignItems: "center", position: "relative", paddingTop: 10 }}>
                                    {showIndicator && (
                                        <Animated.View
                                            style={{
                                                position: "absolute",
                                                left: thumbPosition,
                                                top: -30,
                                                width: 40,
                                                height: 40,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                elevation: 0,
                                                shadowOpacity: 0,
                                            }}
                                        >
                                            <Text style={{ color: "black", fontWeight: "bold", fontSize: 14 }}>
                                                {currentScore}
                                            </Text>
                                        </Animated.View>
                                    )}
                                    <SliderTrack>
                                        <Animated.View
                                            style={{
                                                position: "absolute",
                                                left: thumbPosition,
                                                elevation: 0,
                                                shadowOpacity: 0,
                                            }}
                                            pointerEvents="none"
                                        >
                                            <ThumbContainer>
                                                <Image
                                                    source={require("../../assets/images/home/customThumb.png")}
                                                    style={{ width: 28, height: 28, resizeMode: "contain" }}
                                                />
                                                <Text style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: [{ translateX: -6 }, { translateY: -8 }],
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    fontSize: 11,
                                                }}>{score}</Text>
                                            </ThumbContainer>
                                        </Animated.View>
                                    </SliderTrack>
                                    <Slider
                                        style={{ width: "100%", height: 10, opacity: 0, paddingTop: 5 }}
                                        minimumValue={0}
                                        maximumValue={100}
                                        step={1}
                                        minimumTrackTintColor="transparent"
                                        maximumTrackTintColor="transparent"
                                        thumbTintColor="transparent"
                                        value={score}
                                        disabled={!isEditing}
                                        onSlidingStart={() => setShowIndicator(true)}
                                        onValueChange={(value) => {
                                            setCurrentScore(value);
                                            thumbPosition.setValue((value / MAX_VALUE) * SLIDER_WIDTH);
                                        }}
                                        onSlidingComplete={(value) => {
                                            setScore(value);
                                            setShowIndicator(false);
                                        }}
                                    />
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingTop: 20 }}>
                                        <SlideText>🙁</SlideText>
                                        <SlideText>25</SlideText>
                                        <SlideText>50</SlideText>
                                        <SlideText>75</SlideText>
                                        <SlideText>🙂</SlideText>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingTop: 10, paddingBottom: 10 }}>
                                    {!isEditing ? (
                                        <CompleteButton
                                            style={{ backgroundColor: COLORS.White, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                                            onPress={handleEdit}
                                        >
                                            <Text style={{ color: "#8A8888", fontFamily: theme.fonts.bold, fontSize: 15 }}>수정</Text>
                                        </CompleteButton>
                                    ) : null}
                                    <CompleteButton
                                        style={{ backgroundColor: isEditing ? COLORS.White : COLORS.MainYellow, alignItems: 'center', justifyContent: 'center' }}
                                        onPress={handleComplete}
                                        disabled={!isEditing}
                                    >
                                        <Text style={{ color: isEditing ? '#8A8888' : COLORS.White, fontFamily: theme.fonts.bold, fontSize: 15 }}>{isEditing ? "완료" : "저장됨"}</Text>
                                    </CompleteButton>
                                </View>
                            </YellowEvalContainer>
                        </YellowContentContainer>
                    </YellowContent>
                </YellowContainer>
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

const BoldText = styled.Text`
    font-size: 19px;
    font-weight: 400;
    font-family: ${(props) => props.theme.fonts.bold};
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

const YellowContent = styled(ScrollView)`
    width: 100%;
    flex: 1;
    padding: 10px 20px;
`;

const YellowInnerContainer = styled.View`
    width: 100%;
    height: 110px;
    border-bottom-width: 1px;
    border-bottom-color: rgba(138, 136, 136, 0.38);
`;

const YellowInnerContent = styled.View`
    width: 100%;
    padding-top: 10px;
    padding-bottom: 5px;
`;

const YellowContentContainer = styled.View`
    width: 100%;
    padding: 20px 0;
`;

const ImageContainer = styled.View`
    width: 100%;
    height: 190px;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${COLORS.White};
`;

const YellowTextContainer = styled.View`
    width: 100%;
    padding: 20px 0;
    border-bottom-width: 1px;
    border-bottom-color: rgba(138, 136, 136, 0.38);
`;

const StyledText = styled.Text`
    font-size: 18px;
    font-weight: 400;
    font-family: ${(props) => props.theme.fonts.light};
    color: ${COLORS.Black};
    line-height: 24px;
`;

const TextFooter = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
`;

const FooterText = styled.Text`
  font-size: 13px;
  font-weight: 400;
  font-family: ${(props) => props.theme.fonts.light};
  color: #5B5B5B;
  line-height: 24px;
  padding-left: 5px;
`;

const YellowEvalContainer = styled.View`
    width: 100%;
    padding-top: 20px;
`;

const MediumFootText = styled.Text`
    font-size: 16px;
    font-weight: 400;
    font-family: ${(props) => props.theme.fonts.medium};
`;

const LightFootText = styled.Text`
    font-size: 11px;
    font-weight: 400;
    font-family: ${(props) => props.theme.fonts.light};
    color: #5B5B5B;
    padding-top: 8px;
    padding-bottom: 20px;
`;

const SliderTrack = styled.View`
    width: 100%;
    height: 32px;
    background-color: ${COLORS.White};
    border-radius: 20px;
    position: absolute;
    border: 1px solid #C3C2C2;
`;

const ThumbContainer = styled.View`
    position: absolute;
    left: -13px;
    align-items: center;
    justify-content: center;
`;

const CompleteButton = styled.Pressable`
    width: 70px;
    height: 23px;
    border-radius: 5px;
    border: 0.7px solid #8A8888;
`;

const SlideText = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: 11px;
    color: #9B9898;
`;

export default Home