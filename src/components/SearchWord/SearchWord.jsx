import React from 'react';
import styled from 'styled-components/native';
import { RemoveIcon } from '../../utils/icons';
import { COLORS } from '../../theme/color';
import PropTypes from 'prop-types';

const TagContainer = styled.View`
    flex-direction: row;
    padding: 6px 12px;
    align-items: center;
    gap: 6px;
    border-radius: 15px;
    border: 0.7px solid #8A8888;
    background-color: ${COLORS.White};
    align-self: flex-start;
`;

const TagText = styled.Text`
    font-size: 15px;
    font-weight: 400;
`;

const SearchWord = ({ word, onRemove }) => {
    return (
        <TagContainer>
            <TagText>{word}</TagText>
            <RemoveIcon onPress={onRemove} />
        </TagContainer>
    )
}

SearchWord.propTypes = {
    word: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default SearchWord