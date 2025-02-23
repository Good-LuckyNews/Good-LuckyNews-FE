import React, { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/color';
import { Alert, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ProfileIcon } from '../../utils/icons';
import * as ImagePicker from "expo-image-picker";
import { theme } from '../../theme/theme';
import { CategoryButton, TimeButton } from '../../components';
import RoundButton from '../../components/RoundButton';
import { useNavigation } from '@react-navigation/native';

const ProfileEdit = () => {
    const navigation = useNavigation();
    const [isCompletePressed, setIsCompletePressed] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [profile, setProfile] = useState({
        name: '김소식',
        email: 'example@example.com',
        imageUri: 'https://s3-alpha-sig.figma.com/img/343e/3803/87084a97e1c341102db218412fd35710?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WMhVKf6AXTRsFfO2mWh5qWkzEaFgtIJ9I8RzH8mSLq6lN2ljMow0k9LI6gjYK7SMgZccrCRCCaG4y7e0wTbbMTloU9yBbEn9HqcxoK61HDwB3xfs~XvJ~sCz~XqaT4i0Xwg1EjYC09b4enmGZhgpsh5QmNxARqm8cRl-NvxQ~PFOW3NoP5LrGKF7ArautSxu6KLC7IxxMtDwoWqYiQw8eOSm73tr9dRCoSUeDnGkP9UHAOlzf0lhi80IORUJSx~-v~uVuVNPZCPDjb5StKtuLzpBhfaMSdJdG55WATF9S-fxK0ebDZ~Mmjm5TvucVkKOLvCHLAHoZoVoDNEZ2vUSZw__',
    });

    const timeText = ["오전", "오후"];
    const [selectedTime, setSelectedTime] = useState("오후");
    const [selectedHour, setSelectedHour] = useState(2);
    const [selectedMinute, setSelectedMinute] = useState(0);

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

    const keywords = [
        "감동적", "선행", "기부", "행복", "봉사활동", "따뜻한",
        "치유", "웰빙", "(선한)영향력", "기여/이바지", "혁신", "힐링",
        "성과", "영웅", "향상"
    ];

    const [selectedKeywords, setSelectedKeywords] = useState(["감동적", "행복", "웰빙"]);

    const toggleKeyword = (keyword) => {
        setSelectedKeywords((prevSelected) => {
            if (prevSelected.includes(keyword)) {
                return prevSelected.filter((item) => item !== keyword);
            } else {
                if (prevSelected.length >= 4) return prevSelected;
                return [...prevSelected, keyword];
            }
        });
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("권한 필요", "이미지를 선택하려면 갤러리 접근 권한이 필요합니다.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}>
                <ImageEditContainer>
                    <ImageEditInnerArea>
                        {imageUri ? <ProfileImage source={{ uri: imageUri }} /> : <ProfileIcon size={75} />}
                        <EditButton onPress={pickImage}>
                            <Image
                                source={require("../../../assets/images/my/EditButton.png")}
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                            />
                        </EditButton>
                    </ImageEditInnerArea>
                </ImageEditContainer>
                <NameEditContainer>
                    <NameArea>
                        <TitleText>닉네임</TitleText>
                        <TitleDesc>* 필수 입력 항목입니다.</TitleDesc>
                    </NameArea>
                    <NameInput value={profile.name} onChange={(value) => setProfile({ name: value })} />
                </NameEditContainer>
                <BoxEditContainer>
                    <TitleText style={{ paddingBottom: 10 }}>긍정적으로 느껴지는 키워드를 선택해주세요.</TitleText>
                    <TitleDesc>* 2~4개 키워드를 선택할 수 있어요.</TitleDesc>
                    <KeywordArea>
                        {keywords.map((keyword, index) => (
                            <CategoryButton
                                key={index}
                                category={keyword}
                                clicked={selectedKeywords.includes(keyword)}
                                onPress={() => toggleKeyword(keyword)}
                            />
                        ))}
                    </KeywordArea>
                </BoxEditContainer>
                <BoxEditContainer>
                    <TitleText style={{ paddingBottom: 10 }}>뉴스를 가장 자주 보는 시간을 알려주세요.</TitleText>
                    <TitleDesc>* 희소식이 그 시간에 따뜻한 긍정 뉴스를 전해드릴게요 :)</TitleDesc>
                    <TimeArea>
                        {timeText.map((text, index) => (
                            <RoundButton
                                width={145}
                                key={index}
                                text={text}
                                clicked={selectedTime === text}
                                onPress={() => setSelectedTime(text)}
                            />
                        ))}
                    </TimeArea>
                    <HourArea>
                        <LabelText>시</LabelText>
                        <TimeGrid>
                            {hours.map((hour) => (
                                <TimeButton
                                    key={hour}
                                    number={String(hour)}
                                    clicked={selectedHour === hour}
                                    onPress={() => setSelectedHour(hour)}
                                />
                            ))}
                        </TimeGrid>
                    </HourArea>
                    <MinuteArea>
                        <LabelText>분</LabelText>
                        <TimeGrid>
                            {minutes.map((minute) => (
                                <TimeButton
                                    key={minute}
                                    number={minute < 10 ? `0${minute}` : String(minute)}
                                    clicked={selectedMinute === minute}
                                    onPress={() => setSelectedMinute(minute)}
                                />
                            ))}
                        </TimeGrid>
                    </MinuteArea>
                </BoxEditContainer>
                <CompleteButtonContainer>
                    <CompleteButton
                        onPressIn={() => setIsCompletePressed(true)}
                        onPressOut={() => setIsCompletePressed(false)}
                        onPress={() => navigation.navigate("MyPage")}
                        pressed={isCompletePressed}
                    >
                        <CompleteText pressed={isCompletePressed}>완료</CompleteText>
                    </CompleteButton>
                </CompleteButtonContainer>
            </Container>
        </TouchableWithoutFeedback>
    )
}

const Container = styled.ScrollView`
    background-color: ${COLORS.White};
    padding: 40px 25px;
`;

const ImageEditContainer = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const ImageEditInnerArea = styled.View`
    position: relative;
    width: 80px;
`;

const EditButton = styled.Pressable`
    position: absolute;
    top: 54px;
    left: 53px;
`;

const ProfileImage = styled.Image`
    width: 75px;
    height: 75px;
    border-radius: 50px;
`;

const NameEditContainer = styled.View`
    padding: 40px 0;
`;

const NameArea = styled.View`
    flex-direction: row;
    align-items: flex-end;
    padding-bottom: 15px;
`;

const TitleText = styled.Text`
    font-size: 18px;
    font-family: ${(props) => props.theme.fonts.medium};
    padding-right: 10px;
`;

const TitleDesc = styled.Text`
    font-size: 11px;
    font-family: ${(props) => props.theme.fonts.medium};
    color: ${COLORS.Gray};
`;

const NameInput = styled.TextInput`
    border: 1px solid ${COLORS.MainYellow};
    border-radius: 5px;
    padding: 15px;
    font-size: 14px;
    font-family: ${(props) => props.theme.fonts.medium};
`;

const BoxEditContainer = styled.View`
    padding-bottom: 40px;
`;

const KeywordArea = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    padding-top: 15px;
`;

const TimeArea = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding: 20px 0;
`;

const HourArea = styled.View`
    width: 100%;
`;

const MinuteArea = styled.View`
    width: 100%;
`;

const LabelText = styled.Text`
    font-size: 11px;
    color: ${COLORS.Gray};
    margin-bottom: 10px;
    font-family: ${(props) => props.theme.fonts.medium};
    padding-left: 10px;
`;

const TimeGrid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 22px;
    margin-bottom: 30px;
`;

const CompleteButtonContainer = styled.View`
    width: 100%;
    padding: 10px 0;
`;

const CompleteButton = styled.Pressable`
    width: 100%;
    border: 1px solid ${COLORS.MainYellow};
    border-radius: 5px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.pressed ? COLORS.MainYellow : COLORS.White)};
`;

const CompleteText = styled.Text`
    font-size: 20px;
    font-family: ${(props) => props.theme.fonts.bold};
    color: ${(props) => (props.pressed ? COLORS.White : COLORS.MainYellow)};
`;

export default ProfileEdit