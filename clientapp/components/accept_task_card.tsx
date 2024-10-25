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

const AcceptTaskCard = ({ title, desc, id }) => {
  const paddingBottom = useSharedValue(10);

  useEffect(() => {
    paddingBottom.value = withSpring(paddingBottom.value + 10);
  }, []);

  return (
    <Animated.View style={[styles.container, { paddingBottom }]} key={id}>
      <View style={{ flexDirection: "row", alignItems: "stretch", gap: 20 }}>
        <Image
          source={require("../assets/images/dashboard.png")}
          style={{ height: 40, width: 40, marginTop: 5 }}
        />
        <View>
          <Text style={styles.taskheading}>{title}</Text>
          <Text style={styles.taskdesc}>{desc}</Text>
        </View>
      </View>
      <View style={styles.buttoncontainer}>
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
        dispatch(updateTaskById(id));
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
    padding: 17,
    backgroundColor: "#ECF4FD",
    margin: 10,
    borderRadius: 20,
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
    justifyContent: "flex-end",
  },
  taskheading: {
    color: "#646e73",
    fontSize: 20,
  },
  taskdesc: {
    color: "#5E5E5E",
    fontSize: 17,
    paddingVertical: 10,
  },
});

export default AcceptTaskCard;
