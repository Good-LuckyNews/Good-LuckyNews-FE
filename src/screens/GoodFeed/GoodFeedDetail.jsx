import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { CustomAlert, Feed } from '../../components';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../../theme/color';
import { ActivityIndicator, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import api from '../../utils/common';

const GoodFeedDetail = () => {
  const route = useRoute();
  const { id } = route.params;
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          const response = await api.get(`/article/${id}`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setArticle(response.data.result);
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error("Error fetching article detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleShowToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  return (
    <Container>
      <CustomAlert
        message={toastMessage}
        visible={toastVisible}
        backgroundColor={COLORS.MainYellow}
        duration={1500}
        onHide={() => setToastVisible(false)}
      />
      <Feed
        article={article}
        showToast={handleShowToast}
        paddingTop={true}
      />
    </Container>
  )
}

const Container = styled.View`
    flex: 1;
    background-color: #F8F8F8;
    padding-bottom: 80px;
`;

export default GoodFeedDetail