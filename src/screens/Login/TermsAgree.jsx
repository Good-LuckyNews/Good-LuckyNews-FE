import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../theme/color";

const TermsAgree = ({ termsAgree, setTermsAgree, allChecked }) => {
  const navigation = useNavigation();

  const checkImage = (checked) => {
    if (checked === "all" && !allChecked)
      return require("../../../assets/images/termsAgree/not-agree-all-terms.png");
    else {
      return checked
        ? require("../../../assets/images/termsAgree/agree-term.png")
        : require("../../../assets/images/termsAgree/not-agree-term.png");
    }
  };

  const handleAgree = (idx) =>
    setTermsAgree((prev) =>
      prev.map((item) =>
        item.idx === idx ? { ...item, checked: !item.checked } : item
      )
    );

  const handleAllAgree = () => {
    setTermsAgree((prev) =>
      prev.map((term) => ({ ...term, checked: !allChecked }))
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.agreeAllContainer}>
        <Pressable onPress={handleAllAgree}>
          <Image source={checkImage("all")} style={{ width: 17, height: 17 }} />
        </Pressable>
        <Pressable onPress={handleAllAgree}>
          <Text style={styles.agreeAllText}>약관 전체 동의 </Text>
        </Pressable>
      </View>

      <View style={{ gap: 8 }}>
        {termsAgree.map((term, key) => (
          <View style={styles.termContainer} key={key}>
            <Pressable onPress={() => handleAgree(term.idx)}>
              <Image
                source={checkImage(term.checked)}
                style={styles.termCheckbox}
              />
            </Pressable>
            <Pressable onPress={() => handleAgree(term.idx)}>
              <Text style={styles.termTitle}>
                {term.required ? "[필수]" : "[선택]"} {term.title}
              </Text>
            </Pressable>
            {term.detail && (
              <Pressable onPress={() => {}} style={styles.detailButton}>
                <Text style={styles.detailText}>보기</Text>
              </Pressable>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default TermsAgree;

const styles = StyleSheet.create({
  container: {
    width: 339,
    marginTop: 35,
    marginBottom: 30,
  },

  agreeAllContainer: {
    flexDirection: "row",
    gap: 9.3,
    borderColor: COLORS.MainYellow,
    borderBottomWidth: 1,
    paddingLeft: 4,
    paddingBottom: 7,
    marginBottom: 9,
  },
  agreeAllText: {
    fontFamily: "FontM",
    fontSize: 17,
    fontWeight: 400,
    letterSpacing: -0.408,
  },

  termContainer: {
    width: 339,
    flexDirection: "row",
    alignItems: "center",
  },

  termCheckbox: { width: 13, height: 13, marginLeft: 7, marginRight: 11 },
  termTitle: {
    color: "#8A8888",
    fontFamily: "FontM",
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: -0.408,
  },
  detailButton: {
    marginLeft: "auto",
    marginRight: 2,
    borderColor: "#8A8888",
    borderBottomWidth: 0.5,
  },
  detailText: {
    color: "#8A8888",
    fontFamily: "FontM",
    fontSize: 10,
    fontWeight: 400,
  },
});
