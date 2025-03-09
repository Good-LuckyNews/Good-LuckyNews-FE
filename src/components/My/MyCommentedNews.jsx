import React, { useState } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native';
import NewsList from './NewsList';

const MyCommentedNews = () => {
  const [news, setNews] = useState([]);

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
        ListEmptyComponent={
          <EmptyContainer>
            <EmptyText>답글 단 소식이 없습니다.</EmptyText>
          </EmptyContainer>
        }
      />
    </Container>
  )
}

const Container = styled.View`
    flex: 1;
    padding: 10px 20px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #8A8888;
  font-family: ${(props) => props.theme.fonts.medium};
`;

export default MyCommentedNews