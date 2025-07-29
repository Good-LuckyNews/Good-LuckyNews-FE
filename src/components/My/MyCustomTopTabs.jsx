import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/color';
import Scrap from './Scrap';
import MyNews from './MyNews';
import MyCommentedNews from './MyCommentedNews';

const shadowStyle = StyleSheet.create({
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.38)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
});

const Container = styled.View`
    flex-direction: row;
    background-color: ${COLORS.White};
`;

const CustomTabButton = styled.Pressable`
    flex: 1;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: ${({ selected }) => (selected ? COLORS.MainYellow : COLORS.Gray)};
`;

const tabs = ["스크랩", "작성한 소식", "답글 단 소식"];

const MyCustomTopTabs = ({ handleShowToast }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const renderComponent = () => {
        switch (selectedTab) {
            case 0: return <Scrap handleShowToast={handleShowToast} />;
            case 1: return <MyNews />;
            case 2: return <MyCommentedNews />;
            default: return null;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Container style={shadowStyle.shadow}>
                {tabs.map((tab, index) => (
                    <CustomTabButton
                        key={index}
                        onPress={() => setSelectedTab(index)}
                        selected={selectedTab === index}
                    >
                        <Text style={{ color: selectedTab === index ? "#FFC738" : COLORS.Gray, fontWeight: 400 }}>
                            {tab}
                        </Text>
                    </CustomTabButton>
                ))}
            </Container>
            <View style={{ flex: 1 }}>
                {renderComponent()}
            </View>
        </View>
    )
}

export default MyCustomTopTabs