import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import FeedList from '../Feed/FeedList';
import styled from 'styled-components/native';
import api from '../../utils/common';
import * as SecureStore from 'expo-secure-store';

const Scrap = ({handleShowToast}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
 

  const renderItem = ({ item }) => (
    <FeedList item={item} showToast={handleShowToast} onScrapChange={handleScrapChange} />
  );

  const fetchPost = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        const response = await api.get(`/user/article/likes`, {
          headers: {
            'Authorization': `${token}`
          },
          params: {
            page: 0,
            size: 10,
          }
        });
        setPosts(response.data.result);
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPost();
    setRefreshing(false);
  }, []);

  const handleScrapChange = async () => {
    await fetchPost();
  };

  return (
    <Container>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </Container>
  )
}

const Container = styled.View`
    flex: 1;
    padding: 10px 20px;
`;

export default Scrap