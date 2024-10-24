import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const Chatcard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={require("../assets/images/home.png")}
        style={styles.chat_image}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.chat_header}>
          <Text style={styles.chat_header_title}>Company Name</Text>
          <Text style={styles.chat_last_message_time}>12:30 PM</Text>
        </View>
        <Text style={styles.chat_last_message}>
          Due to the management switch we will cutting of the salary of those
          developers
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
