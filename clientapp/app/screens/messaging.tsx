import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    { uid: "1", message: "Hello there!", displayName: "John", id: 1 },
    { uid: "2", message: "Hi, how are you?", displayName: "Alice", id: 2 },
    {
      uid: "1",
      message: "I'm good, thanks! What about you?",
      displayName: "John",
      id: 3,
    },
  ]);
  const scrollViewRef = useRef();

  const uid = "1"; // Mock user ID

  const sendMessage = () => {
    if (message.trim()) {
      setChats([
        ...chats,
        { uid, message, displayName: "You", id: Date.now() },
      ]);
      setMessage("");
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <SafeAreaView style={styles.chatroom}>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <ScrollView
          style={styles.messageContainer}
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
            paddingBottom: 10,
          }}
        >
          {chats.map((chat) =>
            chat.uid === uid ? (
              <ChatBubbleRight key={chat.id} message={chat.message} />
            ) : (
              <ChatBubbleLeft
                key={chat.id}
                message={chat.message}
                username={chat.displayName}
              />
            ),
          )}
        </ScrollView>
        <InputMessageBox
          setMessage={setMessage}
          message={message}
          sendMessage={sendMessage}
        />
      </View>
    </SafeAreaView>
  );
};

const Header = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const InputMessageBox = ({ setMessage, message, sendMessage }) => (
  <View style={styles.inputmessagebox}>
    <TextInput
      placeholder="Enter Message..."
      style={styles.inputmessageboxTitle}
      value={message}
      onChangeText={(value) => setMessage(value)}
    />
    <Pressable
      onPress={sendMessage}
      disabled={!message.trim()}
      style={!message.trim() ? { opacity: 0.4 } : {}}
    >
      <MaterialIcons name="send" />
    </Pressable>
  </View>
);

const ChatBubbleLeft = ({ message, username }) => (
  <>
    <Text style={styles.usernameleft}>{username}</Text>
    <View style={styles.userdp_message_wrapper}>
      <View style={styles.chatbubbleleft}>
        <Text style={styles.chatbubbleleftText}>{message}</Text>
      </View>
    </View>
  </>
);

const ChatBubbleRight = ({ message }) => (
  <View style={styles.chatbubbleright}>
    <Text style={styles.chatbubblerightText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  chatroom: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 15,
    backgroundColor: "#9061F9",
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  chatbubbleright: {
    alignSelf: "flex-end",
    borderRadius: 10,
    borderTopRightRadius: 19,
    width: "80%",
    backgroundColor: "#F5F5F5",
    padding: 20,
    margin: 10,
    borderWidth: 0.4,
    borderColor: "#9061F9",
  },
  chatbubbleleft: {
    alignSelf: "flex-start",
    borderRadius: 10,
    borderTopLeftRadius: 19,
    width: "80%",
    backgroundColor: "#9061F9",
    padding: 20,
    margin: 10,
  },
  chatbubbleleftText: {
    color: "#fff",
    fontSize: 15,
  },
  chatbubblerightText: {
    color: "#000",
  },
  messageContainer: {
    flex: 1,
  },
  inputmessagebox: {
    borderWidth: 0.4,
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    margin: 20,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputmessageboxTitle: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 10,
  },
  sendButton: {
    width: 30,
    height: 30,
  },
  usernameleft: {
    color: "#B1ABAB",
    marginLeft: 20,
  },
  useravatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  userdp_message_wrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});

export default ChatRoom;
