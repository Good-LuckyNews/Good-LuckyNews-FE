import React, { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/color';
import { Graph, MyCustomTopTabs } from '../../components';
import { Text } from 'react-native';
import { ProfileIcon } from '../../utils/icons';
import { theme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const MyPage = () => {
    const navigation = useNavigation();
    const [isEditPressed, setIsEditPressed] = useState(false);
    const [isLogoutPressed, setIsLogoutPressed] = useState(false);
    const removeToken = async () => {
        await SecureStore.deleteItemAsync('userToken');
        navigation.replace('LoginStack');
    };

    const profile = {
        name: '김소식',
        email: 'example@example.com',
        imageUri: 'https://s3-alpha-sig.figma.com/img/343e/3803/87084a97e1c341102db218412fd35710?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WMhVKf6AXTRsFfO2mWh5qWkzEaFgtIJ9I8RzH8mSLq6lN2ljMow0k9LI6gjYK7SMgZccrCRCCaG4y7e0wTbbMTloU9yBbEn9HqcxoK61HDwB3xfs~XvJ~sCz~XqaT4i0Xwg1EjYC09b4enmGZhgpsh5QmNxARqm8cRl-NvxQ~PFOW3NoP5LrGKF7ArautSxu6KLC7IxxMtDwoWqYiQw8eOSm73tr9dRCoSUeDnGkP9UHAOlzf0lhi80IORUJSx~-v~uVuVNPZCPDjb5StKtuLzpBhfaMSdJdG55WATF9S-fxK0ebDZ~Mmjm5TvucVkKOLvCHLAHoZoVoDNEZ2vUSZw__',
    }

    return (
        <Container>
            <InnerTopContainer>
                <ProfileContainer>
                    <ProfileInnerContainer>
                        <ProfileLeftArea>
                            <ProfileName>{profile.name}</ProfileName>
                            <ProfileEmail>{profile.email}</ProfileEmail>
                            <ProfileEditButton
                                onPressIn={() => setIsEditPressed(true)}
                                onPressOut={() => setIsEditPressed(false)}
                                onPress={() => navigation.navigate("ProfileEdit")}
                                pressed={isEditPressed}
                            >
                                <Text
                                    style={{
                                        fontFamily: theme.fonts.bold,
                                        fontSize: 15,
                                        color: isEditPressed ? COLORS.White : '#8A8888',
                                    }}
                                >프로필 편집</Text>
                            </ProfileEditButton>
                        </ProfileLeftArea>
                        <ProfileRightArea>
                            {profile.imageUri ? <ProfileImage source={profile.imageUri && { uri: profile.imageUri }} /> : <ProfileIcon size={70} />}
                            <LogoutButton
                                onPressIn={() => setIsLogoutPressed(true)}
                                onPressOut={() => setIsLogoutPressed(false)}
                                pressed={isLogoutPressed}
                                onPress = {() => removeToken()}
                            >
                                <Text
                                    style={{
                                        fontFamily: theme.fonts.medium,
                                        fontSize: 13,
                                        color: isLogoutPressed ? COLORS.MainYellow : '#8A8888'
                                    }}
                                >로그아웃</Text>
                            </LogoutButton>
                        </ProfileRightArea>
                    </ProfileInnerContainer>
                </ProfileContainer>
                <Graph />
            </InnerTopContainer>
            <MyCustomTopTabs />
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.White};
`;

const InnerTopContainer = styled.View`
    background-color: #F8F8F8;
    width: 100%;
    height: 425px;
`;

const ProfileContainer = styled.View`
    flex: 1;
    width: 100%;
`;

const ProfileInnerContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-top: 30px;
`;

const ProfileLeftArea = styled.View`
    align-items: flex-start;
`;

const ProfileRightArea = styled.View`
    align-items: center;
`;

const ProfileName = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: 22px;
    padding-bottom: 10px;
`;

const ProfileEmail = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: 16px;
    padding-bottom: 10px;
    color: #8A8888;
`;

const ProfileEditButton = styled.Pressable`
    border-radius: 5px;
    border: 0.7px solid ${(props) => (props.pressed ? COLORS.MainYellow : "#8A8888")};
    background-color: ${(props) => (props.pressed ? COLORS.MainYellow : COLORS.White)};
    width: 110px;
    height: 25px;
    justify-content: center;
    align-items: center;
`;

const LogoutButton = styled.Pressable`
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => (props.pressed ? COLORS.MainYellow : "#8A8888")};
    width: 45px;
    margin-top: 15px;
`;

const ProfileImage = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 50px;
`;

export default MyPage