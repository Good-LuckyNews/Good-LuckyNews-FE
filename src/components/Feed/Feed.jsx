import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import RoundButton from "../RoundButton";
import ScrapButton from "../ScrapButton/ScrapButton";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinkIcon } from "../../utils/icons";
// import Slider from '@react-native-community/slider';
import { COLORS } from "../../theme/color";
import { useFocusEffect } from "@react-navigation/native";
import { theme } from "../../theme/theme";
import CategoryButton from "../CategoryButton/CategoryButton";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 40;
const MAX_VALUE = 100;
const MIN_VALUE = 0;

const Feed = ({ text, showToast, paddingTop }) => {
  const [isScrapped, setIsScrapped] = useState(false);
  const [score, setScore] = useState(50);
  const [savedScore, setSavedScore] = useState(null);
  const [currentScore, setCurrentScore] = useState(score);
  const [showIndicator, setShowIndicator] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const thumbPosition = useRef(
    new Animated.Value((score / MAX_VALUE) * SLIDER_WIDTH)
  ).current;
  const scrollRef = useRef(null);

  const handleComplete = () => {
    showToast("긍정 평가를 저장했어요!");
    setSavedScore(score);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleScrap = () => {
    setIsScrapped((prevState) => {
      const newState = !prevState;
      showToast(
        newState
          ? "긍정 피드를 스크랩했어요!"
          : "긍정 피드 스크랩을 취소했어요!"
      );
      return newState;
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: 0, animated: true });
      }
    }, [])
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [text]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, []);

  return (
    <YellowContent
      keyboardShouldPersistTaps="handled"
      ref={scrollRef}
      paddingTop={paddingTop}
    >
      <YellowInnerContainer>
        <CategoryButton clicked={true} disabled={true} category="기부" />
        <YellowInnerContent>
          <BoldText>
            펫푸드 기업 ‘우리와’, 유기동물 보호단체에 사료 기부
          </BoldText>
          <ScrapButton isScrapped={isScrapped} onPress={handleScrap} />
        </YellowInnerContent>
      </YellowInnerContainer>
      <YellowContentContainer>
        <ImageContainer>
          <Image
            source={{
              uri: "https://s3-alpha-sig.figma.com/img/6e43/9c59/e39a2184abfeffa39e270dc8c99c36ab?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EaxLXgW0jwDgLHR2njlZDEL7~wUi5PxA3t9PSwIf1jKBmt2uL3IAHzkhvMrFHcxuwDoP7Sw8cD-rZlS2ax3y~O3dcfZcRhGu-YIcsRFLbtp4y7cqr0fKUD0DGiwIXCj5CuVGk8BWVU1dycDXOmowIDws6no8u8FjraUnpDZ62VP6z3CZDjQZjOPq9jJ8TKmrK7Wze3StLTgC8xmn6AlpZWS5i5LGhPBMjI6KOjpskQDwIUCdXVGS0~qDBtiKJnLkPZrLvYU9SA9dltCCx~yPCTFxcC9z-A1AZA46lLoK4NfV7NuSHoIGJjVBySbAyJH3ef-LAxjGtDYM2gGG3ayhxg__",
            }}
            resizeMode="contain" // cover는 이미지가 많이 잘리지 않을까..
            style={{ width: "100%", height: "100%" }}
          />
        </ImageContainer>
        <YellowTextContainer>
          {text.split("\n").map((line, index) => (
            <StyledText key={index}>{line}</StyledText>
          ))}
          <TextFooter>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <LinkIcon />
              <FooterText>출처: 이데일리</FooterText>
            </View>
            <FooterText>2025.02.17</FooterText>
          </TextFooter>
        </YellowTextContainer>
        <YellowEvalContainer>
          <MediumFootText>
            해당 소식이 얼마나 긍정적으로 느껴지셨나요?
          </MediumFootText>
          <LightFootText>* 드래그 하여 선택해 주세요.</LightFootText>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              position: "relative",
              paddingTop: 10,
            }}
          >
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
                <Text
                  style={{ color: "black", fontWeight: "bold", fontSize: 14 }}
                >
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
                    source={require("../../../assets/images/home/customThumb.png")}
                    style={{ width: 28, height: 28, resizeMode: "contain" }}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: [{ translateX: -6 }, { translateY: -8 }],
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 11,
                    }}
                  >
                    {score}
                  </Text>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingTop: 20,
              }}
            >
              <SlideText>🙁</SlideText>
              <SlideText>25</SlideText>
              <SlideText>50</SlideText>
              <SlideText>75</SlideText>
              <SlideText>🙂</SlideText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            {!isEditing ? (
              <CompleteButton
                style={{
                  backgroundColor: COLORS.White,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
                onPress={handleEdit}
              >
                <Text
                  style={{
                    color: "#8A8888",
                    fontFamily: theme.fonts.bold,
                    fontSize: 15,
                  }}
                >
                  수정
                </Text>
              </CompleteButton>
            ) : null}
            <CompleteButton
              style={{
                backgroundColor: isEditing ? COLORS.White : COLORS.MainYellow,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleComplete}
              disabled={!isEditing}
            >
              <Text
                style={{
                  color: isEditing ? "#8A8888" : COLORS.White,
                  fontFamily: theme.fonts.bold,
                  fontSize: 15,
                }}
              >
                {isEditing ? "완료" : "저장됨"}
              </Text>
            </CompleteButton>
          </View>
        </YellowEvalContainer>
      </YellowContentContainer>
    </YellowContent>
  );
};

const YellowContent = styled(ScrollView)`
  width: 100%;
  flex: 1;
  padding: ${({ paddingTop }) =>
    paddingTop ? "25px 20px 10px 20px" : "10px 20px"};
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

const BoldText = styled.Text`
  font-size: 19px;
  font-weight: 400;
  font-family: ${(props) => props.theme.fonts.bold};
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
  color: #5b5b5b;
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
  color: #5b5b5b;
  padding-top: 8px;
  padding-bottom: 20px;
`;

const SliderTrack = styled.View`
  width: 100%;
  height: 32px;
  background-color: ${COLORS.White};
  border-radius: 20px;
  position: absolute;
  border: 1px solid #c3c2c2;
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
  border: 0.7px solid #8a8888;
`;

const SlideText = styled.Text`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 11px;
  color: #9b9898;
`;

export default Feed;
