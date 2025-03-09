import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native';
import NewsList from './NewsList';
import api from '../../utils/common';
import * as SecureStore from 'expo-secure-store';

const MyNews = () => {
  const [news, setNews] = useState([]);

  const renderItem = ({ item }) => (
    <NewsList item={item} />
  );

  useEffect(() => {
    const fetchMyNews = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          const response = await api.get(`/api/posts/mypage`, {
            headers: {
              'Authorization': `${token}`
            },
          });
          setNews(response.data);
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyNews();
  }, [])


  return (
    <Container>
      <FlatList
        data={news}
        keyExtractor={(item) => item.postId}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, }}
        ListEmptyComponent={
          <EmptyContainer>
            <EmptyText>작성한 소식이 없습니다.</EmptyText>
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

export default MyNews