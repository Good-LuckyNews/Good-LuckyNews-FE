import React, { useState, useEffect } from "react";
import { View, Pressable, Animated } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../theme/color";
import { theme } from "../../theme/theme";

const tabs = ["이번 주", "지난 달", "최근 6개월", "전체"];
const barWidth = 30;
const graphHeight = 130;

const Graph = () => {
    const [selectedTab, setSelectedTab] = useState("이번 주");

    const emotionData = {
        "이번 주": [10, 30, 50, 40, 60, 20, 70],
        "지난 달": [20, 40, 60, 30, 80, 50, 90],
        "최근 6개월": [80, 50, 40, 90, 60, 20, 70],
        "전체": [100, 70, 50, 60, 90, 40, 80],
    };

    const [animatedHeights, setAnimatedHeights] = useState(
        emotionData[selectedTab].map((value) => new Animated.Value(value))
    );

    useEffect(() => {
        const newHeights = emotionData[selectedTab];

        Animated.parallel(
            newHeights.map((value, index) =>
                Animated.timing(animatedHeights[index], {
                    toValue: value + 30,
                    duration: 500,
                    useNativeDriver: false,
                })
            )
        ).start();
    }, [selectedTab]);

    return (
        <GraphContainer>
            <GraphYellowContainer>
                <GraphTextArea>
                    <TitleText>나의 감정 그래프</TitleText>
                    <DateText>2025.02.09 ~ 2025.02.15</DateText>
                </GraphTextArea>
                <GraphArea>
                    {animatedHeights.map((animatedValue, index) => (
                        <View key={index} style={{ alignItems: "center" }}>
                            <BarContainer>
                                <Animated.View style={{ height: animatedValue }}>
                                    <Bar />
                                </Animated.View>
                            </BarContainer>
                            <CircleIndicator />
                        </View>
                    ))}
                </GraphArea>
            </GraphYellowContainer>
            <GraphTabArea>
                {tabs.map((tab, index) => (
                    <Pressable key={index} onPress={() => setSelectedTab(tab)}>
                        <TabText
                            selected={selectedTab === tab}
                            style={{
                                borderRightWidth: index === tabs.length - 1 ? 0 : 1,
                            }}
                        >{tab}</TabText>
                    </Pressable>
                ))}
            </GraphTabArea>
        </GraphContainer>
    );
};

const GraphContainer = styled.View`
    width: 100%;
    padding: 30px 15px;
`;

const GraphYellowContainer = styled.View.attrs({
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
})`
    width: 100%;
    height: 200px;
    padding: 15px 20px 25px 20px;
    background-color: ${COLORS.MainYellow};
    border-radius: 25px;
`;

const GraphTextArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TitleText = styled.Text`
    font-size: 19px;
    color: ${COLORS.White};
    font-family: ${(props) => props.theme.fonts.bold};
`;

const DateText = styled.Text`
    font-size: 13px;
    color: ${COLORS.White};
    font-family: ${(props) => props.theme.fonts.medium};
`;

const GraphArea = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
    height: ${graphHeight}px;
    margin-top: 10px;
`;

const BarContainer = styled.View`
    width: ${barWidth}px;
    height: ${graphHeight}px;
    justify-content: flex-end;
    align-items: center;
`;

const Bar = styled(LinearGradient).attrs({
    colors: ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)"],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
})`
    width: ${barWidth}px;
    height: 100%;
    border-radius: 50px;
`;

const CircleIndicator = styled.View`
    width: ${barWidth}px;
    height: ${barWidth}px;
    background-color: white;
    border-radius: ${barWidth / 2}px;
    position: absolute;
    bottom: 0;
`;

const GraphTabArea = styled.View`
    width: 100%;
    padding-top: 13px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const TabText = styled.Text`
    font-size: 17px;
    padding: 0 16px;
    color: ${(props) => (props.selected ? COLORS.MainYellow : "#8A8888")};
    border-right-color: #8a8888;
    font-family: ${(props) => props.theme.fonts.medium};
`;

export default Graph;
