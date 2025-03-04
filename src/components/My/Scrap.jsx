import React, { useState } from 'react'
import { FlatList, Text } from 'react-native'
import FeedList from '../Feed/FeedList';
import styled from 'styled-components/native';

const Scrap = () => {
  const [posts, setPosts] = useState([]);

  const renderItem = ({ item }) => (
    <FeedList item={item} />
  );

  return (
    <Container>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, }}
      />
    </Container>
  )
}

const Container = styled.View`
    flex: 1;
    padding: 10px 20px;
`;

export default Scrap