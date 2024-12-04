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
  const workspace_id = authState.userInfo.userData.workspace_id;

  const tasks = useSelector((state) => state.tasks.value); // Access the tasks array from the state
  const filteredTasks = useSelector((state) =>
    state.tasks.value.filter((task) => !task.isAccepted),
  );
  const status = useSelector((state) => state.tasks.status); // Access the status (loading, succeeded, etc.)
  const error = useSelector((state) => state.tasks.error); // Access any error messages

  useEffect(() => {
    // this will trigger the thunk m_iddleware for fetching the taks from api
    dispatch(fetchTasksAll(workspace_id));
  }, [workspace_id]);

  const [testTasks, setTestTasks] = useState([
    {
      title: "Market Analysis",
      name: "Conduct a detailed analysis of market trends",
      isAccepted: true,
      _id: 1,
      date: "15 Jan 2024",
      priority: "High",
      message_count: 12,
      people: [
        { name: "John Doe", role: "Analyst" },
        { name: "Jane Smith", role: "Project Manager" },
      ],
    },
    {
      title: "Product Development",
      name: "Develop a prototype for the new product research findings.",
      isAccepted: false,
      _id: 2,
      date: "20 Jan 2024",
      message_count: 8,
      priority: "Low",
      people: [
        { name: "Alice Johnson", role: "Developer" },
        { name: "Robert Brown", role: "Designer" },
      ],
    },
    {
      title: "Client Feedback",
      name: "Gather feedback from key clients on the findings.",
      isAccepted: true,
      _id: 3,
      date: "25 Jan 2024",
      message_count: 5,
      priority: "Medium",
      people: [
        { name: "Emily Davis", role: "Client Relations" },
        { name: "Michael Wilson", role: "Consultant" },
      ],
    },
    {
      title: "Budget Planning",
      name: "Prepare a budget estimate for the next phase of the project.",
      isAccepted: false,
      _id: 4,
      date: "30 Jan 2024",
      priority: "High",
      message_count: 3,
      people: [
        { name: "Sophie Lee", role: "Finance Manager" },
        { name: "Thomas King", role: "Accountant" },
      ],
    },
    {
      title: "Research and Development",
      name: "This is a long description of the task.",
      isAccepted: false,
      _id: 5,
      date: "12 Jan 2024",
      priority: "Low",
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
        {/* 
                
        {status == "succeeded" &&
          filteredTasks?.map((task) => (
            <AcceptTaskCard
              key={task._id}
              title={task.name}
              desc={task.desc}
              id={task._id}
            />
          ))}
 */}
        {testTasks &&
          testTasks?.map((task) => (
            <AcceptTaskCard
              key={task._id}
              title={task.name}
              id={task._id}
              date={task.date}
              priority={task.priority}
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
