import NotificationCard from "@/components/notification_card";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const ViewNotifications = () => {
  const [state, setState] = useState([5, 5, 5, 5]);
  const translateX = useSharedValue<number>(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value * 2) }],
  }));

  const handlePress = () => {
    translateX.value += 400;
    setTimeout(() => {
      setState([]);
    }, 100);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        {state.map((item, index) => (
          <Animated.View style={[animatedStyles]}>
            <NotificationCard />
          </Animated.View>
        ))}
        {state.length > 0 ? (
          <ClearAll handlePress={handlePress} />
        ) : (
          <View style={styles.no_notifications}>
            <Text style={styles.no_noti_text}>No notifications yet</Text>
            <Text style={styles.no_noti_desc}>
              Your notifications will appear here once you've received them
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.legal_wrapper}>
        <Text style={styles.legal}>Missing Push Notifications ?</Text>
        <TouchableOpacity>
          <Text style={styles.legal_link}>Go to settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ClearAll = ({ handlePress }) => {
  return (
    <TouchableOpacity style={styles.clearall} onPress={handlePress}>
      <MaterialIcons name="clear-all" size={22} />
      <Text>Clear all</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  legal_wrapper: {
    alignSelf: "center",
    marginBottom: 20,
  },
  legal: {
    fontSize: 20,
    textAlign: "center",
  },
  legal_link: {
    fontSize: 20,
    textAlign: "center",
    color: "#266DD9",
  },
  clearall: {
    flexDirection: "row",
    gap: 4,
    backgroundColor: "#F3F3F3",
    borderRadius: 22,
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 8,
    paddingVertical: 5,
    margin: 10,
  },
  no_noti_text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  no_noti_desc: {
    fontSize: 20,
    textAlign: "center",
  },
  no_notifications: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ViewNotifications;
