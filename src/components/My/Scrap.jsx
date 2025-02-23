import React, { useState } from 'react'
import { FlatList, Text } from 'react-native'
import FeedList from '../Feed/FeedList';
import styled from 'styled-components/native';

const Scrap = () => {
  const [posts, setPosts] = useState([
    { id: "1", tag: "기부", title: "펫푸드 기업 ‘우리와’, 유기동물 보호단체에 사료 기부", date: "2025.02.10" },
    { id: "4", tag: "감동적", title: "길에서 쓰러진 노인을 구한 택시기사", date: "2025.02.05" },
    { id: "5", tag: "행복", title: "어린이 환자들에게 장난감 100개 기부한 배우", date: "2025.02.03" },
  ]);

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
    padding: 0 20px;
`;

export default Scrap