import AcceptTaskCard from "@/components/accept_task_card";
import { ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.container_heading}>Upcoming Tasks</Text>
      <ScrollView style={styles.cards_wrapper}>
        <AcceptTaskCard
          title={"Design Dashboard"}
          desc={"Some desdriptip"}
          id={12}
        />
        <AcceptTaskCard
          title={"Design Dashboard"}
          desc={"The first line indentify all the tasks "}
          id={12}
        />
        <AcceptTaskCard
          title={"Design Dashboard"}
          desc={"Some desdriptip"}
          id={12}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F8",
    padding: 10,
  },
  container_heading: {
    fontSize: 20,
    marginLeft: 14,
    fontWeight: "500",
  },
  cards_wrapper: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
});
