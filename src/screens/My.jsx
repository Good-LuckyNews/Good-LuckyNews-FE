import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../theme/color';
import MyCustomTopTabs from '../components/My/MyCustomTopTabs';

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.White};
`;

const My = () => {
  return (
    <Container>
      <MyCustomTopTabs />
    </Container>
  )
}

export default My