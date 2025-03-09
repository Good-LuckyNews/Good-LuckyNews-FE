import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomAlert, NextStepButton, RoundButton } from "../../components";
import { COLORS } from "../../theme/color";
import api from "../../utils/common";
import { useNavigation } from "@react-navigation/native";

const keywordList = [
  { id: 1, text: "감동적", value: "감동적" },
  { id: 2, text: "선행", value: "선행" },
  { id: 3, text: "기부", value: "기부" },
  { id: 4, text: "행복", value: "행복" },
  { id: 5, text: "봉사활동", value: "봉사활동" },
  { id: 6, text: "따뜻한", value: "따뜻한" },
  { id: 7, text: "치유", value: "치유" },
  { id: 8, text: "웰빙", value: "웰빙" },
  { id: 9, text: "(선한)영향력", value: "선한 영향력" },
  { id: 10, text: "기여/이바지", value: "기여" },
  { id: 11, text: "혁신", value: "혁신" },
  { id: 12, text: "힐링", value: "힐링" },
  { id: 13, text: "성과", value: "성과" },
  { id: 14, text: "영웅", value: "영웅" },
  { id: 15, text: "향상", value: "향상" },
];

const SignUpPreference = ({ route }) => {
  const [keyword, setKeyword] = useState([]);
  const [amPm, setAmPm] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [alert, setAlert] = useState(false);
  const [bottomButtonclicked, setButtonClicked] = useState(false);
  const navigation = useNavigation();

  const handleNextButton = () => {
    const condition = keyword.length >= 2 && !!amPm && !!hour && !!minute;
    setButtonClicked(true);
    if (!condition) {
      setAlert(true);
      setButtonClicked(false);
    } else {
      // axios 연동
      async function signUpAxios() {
        try {
          const paramData = route.params;
          const keywordData = keyword
            .map((id) => {
              const keyword = keywordList.find((item) => item.id === id);
              return keyword ? keyword.text : null;
            })
            .filter((text) => text !== null)
            .join(",");
          const formData = new FormData();
          const userData = {
            ...paramData,
            amPm: amPm === "오전" ? "AM" : "PM",
            hours: parseInt(hour),
            minutes: parseInt(minute),
            keywords: keywordData,
          };
          for (let key in userData) {
            if (userData.hasOwnProperty(key)) {
              formData.append(key, userData[key]);
            }
          }
          // console.log("userData", userData);
          const response = await api.post(`/api/member/join`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          navigation.navigate("SignUpComplete");
        } catch (error) {
          setAlert(true);
          setButtonClicked(false);
          if (error.response) {
            // 서버 응답이 있는 경우
            console.error("Response error:", error.response);
            console.log("\n");
            console.error("Status code:", error.response.status);
            console.log("\n");
            console.error("Error data:", error.response.data);
          } else if (error.request) {
            // 요청은 보내졌으나 응답을 받지 못한 경우
            console.error("Request error:", error.request);
          } else {
            // 에러 메시지
            console.error("Error message:", error.message);
          }
        }
      }

      signUpAxios();
    }
  };

  return (
    <View>
      <CustomAlert
        message="필수 입력 항목을 모두 작성해주세요!"
        visible={alert}
        backgroundColor={COLORS.MainYellow}
        onHide={() => setAlert(false)}
      />
      <View style={styles.container}>
        <Text style={styles.questionText}>
          긍정적으로 느껴지는 키워드를 선택해주세요.
        </Text>
        <Text style={styles.smallQuestionText}>
          * 2~4개 키워드를 선택할 수 있어요.
        </Text>
        <KeywordButton keyword={keyword} onPress={setKeyword} />

        <Text style={styles.questionText}>
          뉴스를 가장 자주 보는 시간을 알려주세요.
        </Text>
        <Text style={styles.smallQuestionText}>
          * 희소식이 그 시간에 따뜻한 긍정 뉴스를 전해드릴게요 :)
        </Text>
        <AmPmButton amPm={amPm} onPress={setAmPm} />
        <HourMinuteButton type="hour" value={hour} onPress={setHour} />
        <HourMinuteButton type="minute" value={minute} onPress={setMinute} />

        <NextStepButton
          width={339}
          style={{ alignSelf: "center", marginTop: 61 }}
          clicked={bottomButtonclicked}
          onPress={handleNextButton}
        />
      </View>
    </View>
  );
};

const KeywordButton = ({ keyword, onPress }) => {
  const toggleKeywordButton = (id) => {
    if (keyword.includes(id)) {
      onPress((prev) => prev.filter((elt) => elt !== id));
    } else {
      if (keyword.length >= 4) return;
      onPress((prev) => [...prev, id]);
    }
  };

  return (
    <View style={styles.keywordContainer}>
      {keywordList.map((keywordObject) => (
        <RoundButton
          text={keywordObject.text}
          style={{ paddingHorizontal: 22, alignSelf: "flex-start" }}
          key={keywordObject.id}
          clicked={keyword.includes(keywordObject.id)}
          onPress={() => toggleKeywordButton(keywordObject.id)}
        />
      ))}
    </View>
  );
};

const AmPmButton = ({ amPm, onPress }) => {
  const amPmList = ["오전", "오후"];

  return (
    <View style={styles.amPmContainer}>
      {amPmList.map((text) => (
        <RoundButton
          width={142}
          text={text}
          clicked={amPm === text}
          onPress={() => onPress(text)}
          key={text}
        />
      ))}
    </View>
  );
};

const HourMinuteButton = ({ type, value, onPress }) => {
  const hourList = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minuteList = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, "0")
  );
  let timeArray = type === "hour" ? hourList : minuteList;
  timeArray = [timeArray.slice(0, 6), timeArray.slice(6, 12)];

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.hourMinuteIndex}>
        {type === "hour" ? "시" : "분"}
      </Text>
      {timeArray.map((array, idx) => (
        <View style={styles.hourMinuteContainer} key={idx}>
          {array.map((time, key) => (
            <RoundButton
              width={32}
              text={time}
              key={key}
              clicked={time === value}
              onPress={() => onPress(time)}
              style={styles.buttonStyle}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default SignUpPreference;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    marginHorizontal: 25,
  },

  questionText: {
    marginBottom: 8,
    fontFamily: "FontM",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  smallQuestionText: {
    marginBottom: 20,
    fontFamily: "FontM",
    fontSize: 11,
    fontWeight: 400,
    color: COLORS.Gray,
  },

  keywordContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // 줄 바꿈 허용
    width: "100%",
    gap: 12,
    marginBottom: 49,
  },

  amPmContainer: { flexDirection: "row", gap: 22, marginLeft: 7 },

  hourMinuteContainer: {
    width: 302,
    flexDirection: "row",
    flexWrap: "wrap", // 줄 바꿈 허용
    gap: 22,
    marginTop: 8,
    marginHorizontal: 10,
  },
  hourMinuteIndex: {
    fontFamily: "FontM",
    fontSize: 11,
    fontWeight: 400,
    color: COLORS.Gray,
  },
});
