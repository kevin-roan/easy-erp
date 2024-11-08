import AcceptTaskCard from "@/components/accept_task_card";
import { ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchTasksAll, getTasks } from "@/redux/reducers/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Tab() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.value); // Access the tasks array from the state
  const filteredTasks = useSelector((state) =>
    state.tasks.value.filter((task) => !task.isAccepted),
  );
  const status = useSelector((state) => state.tasks.status); // Access the status (loading, succeeded, etc.)
  const error = useSelector((state) => state.tasks.error); // Access any error messages

  useEffect(() => {
    // this will trigger the thunk middleware for fetching the taks from api
    dispatch(fetchTasksAll());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.container_heading}>Upcoming Tasks</Text>
      <ScrollView style={styles.cards_wrapper}>
        {status == "succeeded" &&
          filteredTasks?.map((task) => (
            <AcceptTaskCard
              key={task.id}
              title={task.name}
              desc={task.taskDesc}
              id={task._id}
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
