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

const AcceptTaskCard = ({ title, desc, id, handleAccept }) => {
  const height = useSharedValue(100);

  useEffect(() => {
    height.value = withSpring(height.value + 20);
  }, []);

  return (
    <Animated.View style={[styles.container, { height }]}>
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
        <CardButton id={id} handleAccept={handleAccept} />
      </View>
    </Animated.View>
  );
};

const CardButton = ({ handleAccept, id }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleTask = async () => {
    if (!isAccepted) {
      try {
        // await updateTasks(id);
        setIsAccepted(true);
        handleAccept(id);
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
