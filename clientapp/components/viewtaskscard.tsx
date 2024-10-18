import {
  View,
  StyleSheet,
  Vibration,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";

const ViewTasksCart = () => {
  const handleBackPres = () => {
    Vibration.vibrate(40);
  };
  return (
    <View style={styles.container}>
      <View style={styles.container_head}>
        <TouchableOpacity
          onPress={handleBackPres}
          style={styles.button_wrapper}
        >
          <AntDesign name="arrowleft" size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_wrapper}>
          <MaterialCommunityIcons size={22} name="dots-horizontal" />
        </TouchableOpacity>
      </View>
      <View style={styles.task_content_area}>
        <Text style={styles.task_heading}>Discussing About Project</Text>
        <Text style={styles.task_description}>
          Enage in a detailed discussion regarding the project, including scope,
          objectives etc.
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ color: "#949494" }}>Start Time</Text>
            <Text>
              <Octicons name="clock" size={13} />
              Oct 8, 8:30 Pm
            </Text>
          </View>
          <View>
            <Text style={{ color: "#949494" }}>End Time</Text>
            <Text>
              <Octicons name="clock" size={13} />
              Oct 8, 10:30 Pm
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <SubTaskCard />
        <SubTaskCard />
        <SubTaskCard />
        <SubTaskCard />
        <SubTaskCard />
      </ScrollView>
      <TouchableOpacity style={styles.bottom_button}>
        <Text style={styles.bottom_button_text}>Mark as Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

const SubTaskCard = () => {
  return (
    <View style={styles.subtaskcard}>
      <Text style={styles.subtaskcard_text}>
        Read and analyze the project brief
      </Text>
      <Text style={styles.subtaskcard_time_text}>
        <Octicons name="clock" size={13} />
        Oct 8, 8:30 Pm
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  button_wrapper: {
    backgroundColor: "#F6F6FA",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container_head: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  task_heading: {
    fontFamily: "PlayWrite",
    fontSize: 20,
    fontWeight: "300",
  },
  task_content_area: {
    marginVertical: 10,
    width: "100%",
    gap: 10,
  },
  task_description: {
    fontSize: 16,
  },
  bottom_button: {
    position: "absolute",
    bottom: 10,
    borderRadius: 40,
    backgroundColor: "#6461F9",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "100%",
  },
  bottom_button_text: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  subtaskcard: {
    backgroundColor: "#E9F5FF",
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
  },
  subtaskcard_text: {
    fontSize: 20,
    fontWeight: "600",
  },
  subtaskcard_time_text: {
    color: "#8C8E93",
  },
});

export default ViewTasksCart;
