import React from 'react';
import { Pressable, Text } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/color';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.White};
    padding-bottom: 80px;
`;

const GoodFeed = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Text>GoodFeed</Text>
      <Pressable onPress={() => navigation.navigate('GoodFeed2')}>
        <Text>GoodFeed2</Text>
      </Pressable>
    </Container>
  )
}

export default GoodFeed