import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import ScrapButton from "../ScrapButton/ScrapButton";
import {
  Animated,
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinkIcon } from "../../utils/icons";
import Slider from '@react-native-community/slider';
import { COLORS } from "../../theme/color";
import { useFocusEffect } from "@react-navigation/native";
import { theme } from "../../theme/theme";
import CategoryButton from "../CategoryButton/CategoryButton";
import * as SecureStore from 'expo-secure-store';
import { useEditing, useScrap } from "../../contexts";
import api from "../../utils/common";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 40;
const MAX_VALUE = 100;
const MIN_VALUE = 0;

const Feed = ({ article, showToast, paddingTop }) => {
  const { scrapStatus, toggleScrap } = useScrap();
  const isScrapped = scrapStatus[article?.id] ?? (article?.likeCount === 1);
  const [currentScore, setCurrentScore] = useState(score);
  const [showIndicator, setShowIndicator] = useState(false);
  const { editingStatus, toggleEditing, scoreStatus, updateScore } = useEditing();
  const isEditing = editingStatus[article?.id] ?? (article?.degree ? false : true);
  const score = scoreStatus[article?.id] ?? (article?.degree ? article.degree : 50);

  const thumbPosition = useRef(
    new Animated.Value((score / MAX_VALUE) * SLIDER_WIDTH)
  ).current;
  const scrollRef = useRef(null);

  const handleComplete = async  () => {
    try {

      const token = await SecureStore.getItemAsync('userToken');
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await api.post(
        `/article/${article?.id}/completed`,
        { degree: score },
        {
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        showToast("긍정 평가를 저장했어요!");
        toggleEditing(article?.id, false);
      } else {
        console.error("API 요청 실패:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending degree:", error);
    }
  };

  const handleEdit = () => {
    toggleEditing(article?.id, true);
  };

  const handleScrap = async  () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (!token) {
        console.error("No token found");
        return;
      }
  
      const url = `/article/${article?.id}/like`;
  
      if (isScrapped) {
        const response = await api.delete(url, {
          headers: {
            'Authorization': `${token}`,
          },
        });
  
        if (response.data.isSuccess) {
          showToast("긍정 피드 스크랩을 취소했어요!");
          toggleScrap(article?.id, false);
        } else {
          console.error("스크랩 취소 실패:", response.data.message);
        }
      } else {
        const response = await api.post(url, {}, {
          headers: {
            'Authorization': `${token}`,
          },
        });
  
        if (response.data.isSuccess) {
          showToast("긍정 피드를 스크랩했어요!");
          toggleScrap(article?.id, true);
        } else {
          console.error("스크랩 추가 실패:", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error handling scrap:", error);
    }
  };

  const handleLink = () => {
    Linking.openURL(`${article.originalLink}`); // 원하는 링크 입력
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
    };
  }, [article]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, []);

  const formattedDate = article?.originalDate?.split('T')[0].replaceAll('-', '.');
  const originalDomain = article?.originalLink ? new URL(article.originalLink).origin : '';
  const imageUrl = article?.image?.startsWith('https') ? article.image : `${originalDomain}${article.image}`;

  return (
    <YellowContent
      keyboardShouldPersistTaps="handled"
      ref={scrollRef}
      paddingTop={paddingTop}
    >
      <YellowInnerContainer>
        <CategoryButton clicked={true} disabled={true} category={article.keywords} />
        <YellowInnerContent>
          <BoldText>
            {article.title}
          </BoldText>
          <ScrapButton isScrapped={isScrapped} onPress={handleScrap} />
        </YellowInnerContent>
      </YellowInnerContainer>
      <YellowContentContainer>
        {article.image &&
          <ImageContainer>
            <Image
              source={{
                uri: imageUrl,
              }}
              resizeMode="contain" // cover는 이미지가 많이 잘리지 않을까..
              style={{ width: "100%", height: "100%" }}
            />
          </ImageContainer>
        }
        <YellowTextContainer>
          {article?.longContent?.split("\n").map((line, index) => (
            <StyledText key={index}>{line}</StyledText>
          ))}
          <TextFooter>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <LinkIcon />
              <Pressable onPress={handleLink}>
                <FooterText>출처</FooterText>
              </Pressable>
            </View>
            <FooterText>{formattedDate}</FooterText>
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
                updateScore(article?.id, value);
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
