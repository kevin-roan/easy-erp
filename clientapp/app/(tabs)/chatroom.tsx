import Chatcard from "@/components/chatcard";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search_bar}>
        <TextInput placeholder="Search" style={styles.search_bar_text} />
      </View>
      <ScrollView>
        <Chatcard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  search_bar: {
    backgroundColor: "#F3F3F3",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
  },
  search_bar_text: {
    fontSize: 18,
  },
});
