import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { useState, useEffect } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { updateTaskById } from "@/redux/reducers/taskSlice";
import { Ionicons } from "@expo/vector-icons";
import Badge from "./badge";

const AcceptTaskCard = ({ title, priority, date, desc, id }) => {
  const paddingBottom = useSharedValue(10);

  useEffect(() => {
    paddingBottom.value = withSpring(paddingBottom.value + 10);
  }, []);

  return (
    <Animated.View style={[styles.container, { paddingBottom }]} key={id}>
      <View style={{ flexDirection: "row", alignItems: "stretch", gap: 20 }}>
        <View>
          <Text style={styles.taskheading}>{title}</Text>
          <Text style={styles.taskdesc}>{desc}</Text>
        </View>
      </View>
      <Badge priority={priority} />
      <View style={styles.buttoncontainer}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Ionicons name="calendar-clear-outline" />
          <Text style={styles.date}>{date}</Text>
        </View>
        <CardButton id={id} />
      </View>
    </Animated.View>
  );
};

const CardButton = ({ id }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const dispatch = useDispatch();

  const handleTask = async () => {
    if (!isAccepted) {
      try {
        setIsAccepted(true);
        // dispatch(updateTaskById(id));
        Vibration.vibrate(50);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handleTask}
      style={
        ([styles.cardbutton],
        {
          backgroundColor: "#6461F9",
          borderRadius: 30,
          padding: 6,
          width: "40%",
        })
      }
    >
      {isAccepted ? (
        <Text style={styles.cardbuttontext}>Accepted</Text>
      ) : (
        <Text style={styles.cardbuttontext}>Accept</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 8,
    borderWidth: 0.2,
    shadowColor: "#535657",
  },
  cardbutton: {
    borderRadius: 10,
    padding: 4,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardbuttontext: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttoncontainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  taskheading: {
    color: "#000a0a",
    fontSize: 20,
  },
  taskdesc: {
    color: "#5E5E5E",
    fontSize: 17,
  },
  date: {
    fontSize: 16,
    color: "#7F818F",
  },
});

export default AcceptTaskCard;
