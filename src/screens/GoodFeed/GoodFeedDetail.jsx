import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Feed } from '../../components';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../../theme/color';

const GoodFeedDetail = () => {
  const route = useRoute();
  const { id } = route.params;
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    setText(`펫푸드 전문회사 우리와는 지난 7일 유기동물 보호 단체 동물학대방지연합(동학방)과 협력해 유기동물 복지 향상을 위한 사료 600㎏을 지원했다고 10일 밝혔다.

이번에 전달한 사료는 겨울철 영양 관리가 더욱 중요한 1세 이하와 임신 또는 출산 후 수유기의 반려견에게 도움을 줄 수 있는 제품으로 구성했다.

보호 단체에 전달된 사료는 우리와의 자체 생산 시설인 우리와 펫푸드 키친에서 최신 설비와 엄격한 품질 관리를 통해 생산되고 있다.

우리와 관계자는 “유기동물들이 어디서든 건강하고 행복한 삶을 살아가길 바라는 마음으로 올해도 꾸준히 유기동물 보호 단체 지원 활동을 이어 나갈 예정”이라며

“신선하고 안전함은 물론 맛과 영양면에서도 우수한 먹거리를 제공할 수 있도록 더 고민하고 연구하겠다”라고 전했다.`);
  }, []);

  const handleShowToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  return (
    <Container>
      <Alert
        message={toastMessage}
        visible={toastVisible}
        backgroundColor={COLORS.MainYellow}
        duration={1500}
        onHide={() => setToastVisible(false)}
      />
      <Feed
        text={text}
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