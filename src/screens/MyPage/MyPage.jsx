import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/color';
import { CustomAlert, Graph, MyCustomTopTabs } from '../../components';
import { ActivityIndicator, Text, View } from 'react-native';
import { ProfileIcon } from '../../utils/icons';
import { theme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import api from '../../utils/common';

const MyPage = () => {
    const navigation = useNavigation();
    const [isEditPressed, setIsEditPressed] = useState(false);
    const [isLogoutPressed, setIsLogoutPressed] = useState(false);
    const [profile, setProfile] = useState([]);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);

    const handleShowToast = (message) => {
        setToastMessage(message);
        setToastVisible(true);
    };

    const removeToken = async () => {
        await SecureStore.deleteItemAsync('userToken');
        navigation.replace('LoginStack');
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                const token = await SecureStore.getItemAsync('userToken');
                console.log(token);
                if (token) {
                    const response = await api.get(`/api/member/info`, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    });
                    setProfile(response.data.result);
                    setProfileImage(response.data.result.profileImage);
                } else {
                    console.log('No token found');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        };
        getProfile();
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Container>
            <CustomAlert
                message={toastMessage}
                visible={toastVisible}
                backgroundColor={COLORS.MainYellow}
                duration={1500}
                onHide={() => setToastVisible(false)}
            />
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
                            {profileImage !== "null" ? (
                                <ProfileImage source={{ uri: profileImage }} />
                            ) : (
                                <ProfileIcon size={70} />
                            )}
                            <LogoutButton
                                onPressIn={() => setIsLogoutPressed(true)}
                                onPressOut={() => setIsLogoutPressed(false)}
                                pressed={isLogoutPressed}
                                onPress={() => removeToken()}
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
            <MyCustomTopTabs handleShowToast={handleShowToast} />
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