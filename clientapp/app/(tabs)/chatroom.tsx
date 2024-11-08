import Chatcard from "@/components/chatcard";
import createWorkspace from "@/services/createWorkspace";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search_bar}>
        <TextInput placeholder="Search" style={styles.search_bar_text} />
      </View>
      <ScrollView>
        <Chatcard />
        <Button
          onPress={() => router.push("/screens/onboarding/create_workspace")}
        >
          Create Workspace
        </Button>
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
