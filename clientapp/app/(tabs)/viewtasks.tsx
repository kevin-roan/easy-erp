import AcceptTaskCard from "@/components/accept_task_card";
import { ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Tab() {
  const [tasks, setTasks] = useState([]);
  // this will fetch all the docs
  useEffect(() => {
    axios
      .get("http://192.168.0.198:8000/api/v1/tasks")
      .then((response) => {
        setTasks(response.data.result);
      })
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  // this will update the document,
  // for these business logics, i need to create redux reducers seperatly
  const handleAccept = (id) => {
    axios
      .patch(`http://192.168.0.198:8000/api/v1/tasks/${id}`, {
        isAccepted: true,
      })
      .then((response) => {
        console.log("response handleaccept");
      })
      .catch((error) => console.error("failed to accept task", error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.container_heading}>Upcoming Tasks</Text>
      <ScrollView style={styles.cards_wrapper}>
        {tasks.map((task) => (
          <AcceptTaskCard
            title={task.taskName}
            desc={task.taskDesc}
            id={task._id}
            handleAccept={handleAccept}
          />
        ))}
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
