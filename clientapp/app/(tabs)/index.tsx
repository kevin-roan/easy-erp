import Header from "@/components/header";
import ProgressCard from "@/components/progresscard";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

export default function Tab() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ProgressCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F8",
  },
});
