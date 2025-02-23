import React, { useState } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native';
import NewsList from './NewsList';

const MyNews = () => {
  const [news, setNews] = useState([
    { id: "1", nickname: "웃음 한 스푼", content: "오늘 도시락을 열었더니 엄마가 제가 좋아하는 반찬을 챙겨주셨더라고요. 바쁜 하루였지만 도시락을 열었을 때 엄마의 마음이 느껴져셔 따뜻한 하루였어요.", date: "3일 전", heart: "2", comment: "2" },
    { id: "3", nickname: "웃음 한 스푼", content: "오늘 도시락을 열었더니 엄마가 제가 좋아하는 반찬을 챙겨주셨더라고요. 바쁜 하루였지만 도시락을 열었을 때 엄마의 마음이 느껴져셔 따뜻한 하루였어요.", date: "3일 전", heart: "2", comment: "2" },
    { id: "4", nickname: "웃음 한 스푼", content: "오늘 도시락을 열었더니 엄마가 제가 좋아하는 반찬을 챙겨주셨더라고요. 바쁜 하루였지만 도시락을 열었을 때 엄마의 마음이 느껴져셔 따뜻한 하루였어요.", date: "3일 전", heart: "2", comment: "2" },
  ]);

  const renderItem = ({ item }) => (
    <NewsList item={item} />
  );

  return (
    <Container>
      <FlatList
        data={news}
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

export default MyNews