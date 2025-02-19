import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/color';
import { theme } from '../../theme/theme';

const CategoryButton = ({ clicked, disabled, onPress, category }) => {
    return (
        <CategoryPressable clicked={clicked} disabled={disabled} onPress={onPress}>
            <CategoryText numberOfLines={1} clicked={clicked}>{category}</CategoryText>
        </CategoryPressable>
    )
}

const CategoryPressable = styled.Pressable`
    background-color: ${({ clicked }) => (clicked ? COLORS.MainYellow : "#F8F8F8")};
    padding: 5px 22px;
    border-radius: 15px;
    margin-right: 5px;
    width: auto;
    align-self: flex-start;
`;

const CategoryText = styled.Text`
    color: ${({ clicked }) => (clicked ? COLORS.Black : COLORS.Gray)};
    font-family: ${(props) => theme.fonts.medium};
    font-size: 15px;
`;

export default CategoryButton