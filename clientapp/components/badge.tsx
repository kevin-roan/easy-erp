import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  priority: string;
};

const Badge = ({ priority }: Props) => {
  return (
    // change the background color of the badge based on priority inline

    <View
      style={[
        styles.badge,
        {
          backgroundColor:
            priority === "Low"
              ? "#13CA77"
              : priority === "Medium"
                ? "#F7C648"
                : "#FF4747",
        },
      ]}
    >
      <Text style={styles.badge_text}>{priority}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#13CA77",
    borderRadius: 30,
    paddingHorizontal: 5,
    width: "20%",
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
  },
  badge_text: {
    color: "#fff",
  },
});
export default Badge;
