import PropTypes from "prop-types";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const DeleteModal = ({ visible, text, onCancel, onDelete }) => {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.queryText}>{text}</Text>
          <View
            style={{
              width: 270,
              flexDirection: "row",
              borderColor: "#3C3C432E",
              borderTopWidth: 0.5,
            }}
          >
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => [
                styles.buttonStyle,
                {
                  backgroundColor: pressed ? "#D7D7D7" : "transparent",
                  borderBottomLeftRadius: 14,
                },
              ]}
            >
              <Text style={{ color: "#007AFF" }}>취소</Text>
            </Pressable>

            <Pressable
              onPress={onDelete}
              style={({ pressed }) => [
                styles.buttonStyle,
                {
                  borderLeftWidth: 0.5,
                  borderColor: "#3C3C432E",
                  backgroundColor: pressed ? "#D7D7D7" : "transparent",
                  borderBottomRightRadius: 14,
                },
              ]}
            >
              <Text style={{ color: "#FF5B5B" }}>삭제</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

DeleteModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 270,
    backgroundColor: "#E2E2E2",
    borderRadius: 14,
    alignItems: "center",
  },
  queryText: {
    padding: 16,
    color: "#424242",
    fontFamily: "FontM",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 18,
    letterSpacing: -0.078,
  },
  buttonStyle: {
    width: 135,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    color: "#007AFF",
    fontFamily: "FontM",
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
});
