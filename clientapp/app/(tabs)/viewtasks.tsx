import AcceptTaskCard from "@/components/accept_task_card";
import { ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchTasksAll, getTasks } from "@/redux/reducers/taskSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Tab() {
  const dispatch = useDispatch();

  const { authState } = useAuth();
  const workspaceId = authState.userInfo.userData.workspaceId;

  const tasks = useSelector((state) => state.tasks.value); // Access the tasks array from the state
  const filteredTasks = useSelector((state) =>
    state.tasks.value.filter((task) => !task.isAccepted),
  );
  const status = useSelector((state) => state.tasks.status); // Access the status (loading, succeeded, etc.)
  const error = useSelector((state) => state.tasks.error); // Access any error messages

  useEffect(() => {
    // this will trigger the thunk middleware for fetching the taks from api
    dispatch(fetchTasksAll(workspaceId));
  }, [workspaceId]);

  const [testTasks, setTestTasks] = useState([
    {
      title: "Market Analysis",
      taskDesc:
        "Conduct a detailed analysis of market trends and customer preferences.",
      isAccepted: true,
      id: 1,
      date: "15 Jan 2024",
      message_count: 12,
      people: [
        { name: "John Doe", role: "Analyst" },
        { name: "Jane Smith", role: "Project Manager" },
      ],
    },
    {
      title: "Product Development",
      taskDesc:
        "Develop a prototype for the new product based on the research findings.",
      isAccepted: false,
      id: 2,
      date: "20 Jan 2024",
      message_count: 8,
      people: [
        { name: "Alice Johnson", role: "Developer" },
        { name: "Robert Brown", role: "Designer" },
      ],
    },
    {
      title: "Client Feedback",
      taskDesc:
        "Gather feedback from key clients on the prototype and document findings.",
      isAccepted: true,
      id: 3,
      date: "25 Jan 2024",
      message_count: 5,
      people: [
        { name: "Emily Davis", role: "Client Relations" },
        { name: "Michael Wilson", role: "Consultant" },
      ],
    },
    {
      title: "Budget Planning",
      taskDesc: "Prepare a budget estimate for the next phase of the project.",
      isAccepted: false,
      id: 4,
      date: "30 Jan 2024",
      message_count: 3,
      people: [
        { name: "Sophie Lee", role: "Finance Manager" },
        { name: "Thomas King", role: "Accountant" },
      ],
    },
    {
      title: "Research and Development",
      taskDesc:
        "This is a long description of the research and development task.",
      isAccepted: false,
      id: 5,
      date: "12 Jan 2024",
      message_count: 15,
      people: [
        { name: "Liam Martin", role: "Researcher" },
        { name: "Olivia White", role: "Development Lead" },
      ],
    },
  ]);

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
