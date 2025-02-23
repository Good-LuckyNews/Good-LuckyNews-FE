import React, { useState } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native';
import NewsList from './NewsList';

const MyCommentedNews = () => {
  const [news, setNews] = useState([
    { id: "1", nickname: "웃음 한 스푼", content: "오늘 아파트 엘리베이터에서 만난 할머니가 저한테 ‘오늘 하루도 힘내요~’라고 인사해주셨어요! 덕분에 하루 종일 미소가 떠나질 않네요 :)", date: "1일 전", heart: "3", comment: "1" },
    { id: "5", nickname: "웃음 한 스푼", content: "오늘 아파트 엘리베이터에서 만난 할머니가 저한테 ‘오늘 하루도 힘내요~’라고 인사해주셨어요! 덕분에 하루 종일 미소가 떠나질 않네요 :)", date: "1일 전", heart: "3", comment: "1" },
    { id: "6", nickname: "웃음 한 스푼", content: "오늘 아파트 엘리베이터에서 만난 할머니가 저한테 ‘오늘 하루도 힘내요~’라고 인사해주셨어요! 덕분에 하루 종일 미소가 떠나질 않네요 :)", date: "1일 전", heart: "3", comment: "1" },
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

export default MyCommentedNews