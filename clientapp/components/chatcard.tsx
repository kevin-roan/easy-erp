import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const Chatcard = () => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push("/screens/messaging")}
    >
      <Image
        source={require("../assets/images/home.png")}
        style={styles.chat_image}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.chat_header}>
          <Text style={styles.chat_header_title}>DropDev Pvt.LTP</Text>
          <Text style={styles.chat_last_message_time}>12:30 PM</Text>
        </View>
        <Text style={styles.chat_last_message}>
          This is a test message from DropDev Pvt.Ltd.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    alignItems: "center",
  },
  chat_image: {
    height: 40,
    width: 40,
  },
  chat_header_title: {
    fontSize: 20,
    fontWeight: "400",
  },
  chat_last_message: {
    color: "#939393",
    fontSize: 15,
  },
  chat_last_message_time: {
    color: "#939393",
  },
  chat_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Chatcard;
