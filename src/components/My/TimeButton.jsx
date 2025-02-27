import React from 'react'
import styled from 'styled-components/native'
import { theme } from '../../theme/theme';
import { COLORS } from '../../theme/color';

const TimeButton = ({ number, clicked, onPress }) => {
    return (
        <ButtonContainer clicked={clicked} onPress={onPress}>
            <ButtonText clicked={clicked}>{number}</ButtonText>
        </ButtonContainer>
    )
}

const ButtonContainer = styled.Pressable`
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center;
    border-radius: 13px;
    background-color: ${({ clicked }) => (clicked ? COLORS.MainYellow : "#F8F8F8")};
`;

const ButtonText = styled.Text`
    font-size: 15px;
    font-family: ${(props) => props.theme.fonts.medium};
    color: ${({ clicked }) => (clicked ? COLORS.Black : COLORS.Gray)};
`;

export default TimeButton