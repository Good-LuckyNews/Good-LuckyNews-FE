import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RoundButton from "../../components/RoundButton";
import { LikeComponent, ScrapButton } from "../../components";
import { useNavigation } from "@react-navigation/native";

const feedtest = [
  {
    id: 1,
    category: "기부",
    title: "펫푸드 기업 ‘우리와’, 유기동물 보호단체에 사료 기부",
    date: "2025.02.10",
    bookmarked: true,
  },
  {
    id: 2,
    category: "기부",
    title: "이웃돕기 후원금 300만원 익명 기부",
    date: "2025.02.10",
    bookmarked: false,
  },
  {
    id: 3,
    category: "기부",
    title: "자녀들이 준 용돈 모아 1천만원 기부한 90대 할머니",
    date: "2025.02.06",
    bookmarked: false,
  },
  {
    id: 4,
    category: "기부",
    title: "자녀들이 준 용돈 모아 1천만원 기부한 90대 할머니",
    date: "2025.02.06",
    bookmarked: false,
  },
];

const newstest = [
  {
    id: 1,
    placeName: "기부 발자국",
    placeInfo: "작은 나눔이 큰 변화를 만들어요 :)",
    likeCount: 7,
    liked: true,
    imageSrc: "",
  },
  {
    id: 2,
    placeName: "기부 발자국",
    placeInfo: "작은 나눔이 큰 변화를 만들어요 :)",
    likeCount: 7,
    liked: true,
    imageSrc: "",
  },
];

const Search = () => {
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);
  const [feedResult, setResult] = useState(feedtest);
  const [newsResult, setNewsResult] = useState(newstest);
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!text) return;
    setSearched(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.textInputContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/images/search/back_button.png")}
            style={{ width: 27, height: 27, marginRight: 17 }}
          />
        </Pressable>
        <TextInput
          placeholder="관심 있는 긍정 키워드를 검색해 보세요!"
          value={text}
          onChangeText={setText}
          style={styles.textInputStyle}
          autoComplete="off"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
      </View>

      {searched && (
        <ScrollView style={styles.mainContainer}>
          <View style={{ marginBottom: 40 }}>
            <Text style={styles.titleText}>긍정 피드</Text>
            <FeedListComponent feedResult={feedResult} />
          </View>

          <View>
            <Text style={styles.titleText}>희소식</Text>
            <GoodNewsComponent newsResult={newsResult} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Search;

const NoResultComponent = () => {
  return (
    <View style={styles.noResultContainer}>
      <Text style={styles.noResultText}>검색 결과가 없습니다</Text>
      <Image
        source={require("../../../assets/images/search/icon_gray.png")}
        style={{ width: 20, height: 14.7 }}
      />
    </View>
  );
};

const FeedListComponent = ({ feedResult }) => {
  const [seeMore, setSeeMore] = useState(false);
  const list = seeMore ? feedResult : feedResult.slice(0, 3);
  const lastIdx = list.length - 1;

  return (
    <>
      {feedResult.length !== 0 ? (
        <View style={{ gap: 14 }}>
          {list.map((feed, idx) => (
            <View
              key={feed.id}
              style={{
                paddingBottom: 14,
                borderBottomWidth: idx !== lastIdx && 1,
                borderColor: "#D9D9D9",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <RoundButton
                  text={feed.category}
                  style={{ paddingHorizontal: 22, alignSelf: "flex-start" }}
                />
                <ScrapButton isScrapped={feed.bookmarked} onPress={() => {}} />
              </View>
              <Text style={styles.feedTitle}>{feed.title}</Text>
              <Text style={styles.feedDate}>{feed.date}</Text>
            </View>
          ))}
          {!seeMore && (
            <Pressable
              onPress={() => setSeeMore(true)}
              style={styles.seeMoreComponent}
            >
              <Text
                style={{
                  color: "#8A8888",
                  fontFamily: "FontM",
                  fontSize: 15,
                  fontWeight: 400,
                }}
              >
                더보기
              </Text>
            </Pressable>
          )}
        </View>
      ) : (
        <NoResultComponent />
      )}
    </>
  );
};

const GoodNewsComponent = ({ newsResult }) => {
  const lastIdx = newsResult.length - 1;

  return (
    <>
      {newsResult.length !== 0 ? (
        <View style={{ gap: 14 }}>
          {newsResult.map((news, idx) => (
            <View
              key={news.id}
              style={{
                position: "relative",
                paddingBottom: 14,
                borderBottomWidth: idx !== lastIdx && 1,
                borderColor: "#D9D9D9",
              }}
            >
              <Text style={styles.newsName}>{news.placeName}</Text>
              <Text style={styles.newsInfo}>{news.placeInfo}</Text>
              <LikeComponent
                likeCount={news.likeCount}
                liked={news.liked}
                onPress={() => {}}
              />
              <Image
                source={require("../../../assets/images/uploadImage/default_goodNews_image.png")}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "100%",
                  position: "absolute",
                  right: 6.5,
                }}
              />
            </View>
          ))}
        </View>
      ) : (
        <NoResultComponent />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: { marginHorizontal: 18, marginVertical: 24, marginBottom: 60 },
  textInputContainer: {
    height: 63,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 27,
    borderBottomWidth: 1,
    borderColor: "rgba(138, 136, 136, 0.38)",
  },
  textInputStyle: {
    backgroundColor: "#F5F5F5",
    width: 294,
    height: 40,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 13,
    fontFamily: "FontM",
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: -0.408,
  },
  titleText: {
    marginBottom: 25,
    fontFamily: "FontM",
    fontSize: 22,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.408,
  },

  noResultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    marginTop: 13,
  },
  noResultText: {
    color: "#ADADAD",
    fontFamily: "FontM",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.408,
  },

  feedTitle: {
    marginTop: 6,
    marginBottom: 5,
    marginLeft: 9,
    fontFamily: "FontM",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  feedDate: {
    marginLeft: 9,
    color: "#5B5B5B",
    fontSize: 13,
    fontWeight: 400,
    fontFamily: "FontL",
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  seeMoreComponent: {
    width: 358,
    height: 37,
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: "#F5F5F5",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  newsName: {
    fontFamily: "FontB",
    fontSize: 16,
    fontWeight: 400,
  },
  newsInfo: {
    marginTop: 6,
    marginBottom: 18,
    color: "#8A8888",
    fontFamily: "FontM",
    fontSize: 13,
    fontWeight: 400,
    overflow: "hidden",
  },
});
