import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/color';
import FeedList from '../../components/Feed/FeedList';
import CategoryButton from '../../components/CategoryButton/CategoryButton';
import { theme } from '../../theme/theme';
import { Alert } from '../../components';

const GoodFeed = () => {
  const [posts, setPosts] = useState([
    { id: "1", tag: "기부", title: "펫푸드 기업 ‘우리와’, 유기동물 보호단체에 사료 기부", date: "2025.02.10" },
    { id: "2", tag: "기부", title: "이웃돕기 후원금 300만원 익명 기부", date: "2025.02.10" },
    { id: "3", tag: "기부", title: '"평생의 소원이었다"...자녀들이 준 용돈 모아 1천만원 기부한 90대 할머니', date: "2025.02.06" },
    { id: "4", tag: "감동적", title: "길에서 쓰러진 노인을 구한 택시기사", date: "2025.02.05" },
    { id: "5", tag: "행복", title: "어린이 환자들에게 장난감 100개 기부한 배우", date: "2025.02.03" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const category = ['전체', '감동적', '선행', '기부', '행복', '봉사활동', '따뜻한', '치유', '웰빙', '(선한)영향력', '기여/이바지', '혁신', '힐링', '성과', '영웅', '향상'];
  const filteredPosts = selectedCategory === "전체" ? posts : posts.filter(post => post.tag === selectedCategory);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleShowToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const renderItem = ({ item }) => (
    <FeedList item={item} showToast={handleShowToast} />
  );

  return (
    <Container>
      <Alert
        message={toastMessage}
        visible={toastVisible}
        backgroundColor={COLORS.MainYellow}
        duration={1500}
        onHide={() => setToastVisible(false)}
      />
      <InnerContainer>
        <StyledText>긍정 피드</StyledText>
        <CategoryWrapper>
          <CategoryArea
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 0 }}
          >
            {category.map((item) => (
              <CategoryButton
                key={item}
                category={item}
                clicked={selectedCategory === item}
                onPress={() => setSelectedCategory(item)}
              />
            ))}
          </CategoryArea>
        </CategoryWrapper>
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, }}
        />
      </InnerContainer>
    </Container>
  )
}

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.White};
`;

const InnerContainer = styled.View`
  flex: 1;
  padding: 25px 20px;
`;

const StyledText = styled.Text`
  font-size: 22px;
  font-family: ${(props) => theme.fonts.medium};
  padding-bottom: 20px;
`;

const CategoryWrapper = styled.View`
  height: 26px;
  margin-bottom: 10px;
`;

const CategoryArea = styled.ScrollView`
  flex-direction: row;
`;

export default GoodFeed