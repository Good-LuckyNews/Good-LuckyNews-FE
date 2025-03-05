import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import FeedList from '../Feed/FeedList';
import styled from 'styled-components/native';
import api from '../../utils/common';
import * as SecureStore from 'expo-secure-store';

const Scrap = () => {
  const [posts, setPosts] = useState([]);

  const renderItem = ({ item }) => (
    <FeedList item={item} />
  );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          const response = await api.get(`/user/article/likes`, {
            headers: {
              'Authorization': `${token}`
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
    fetchPost();
  }, []);

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