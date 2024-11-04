import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";

const NotificationCard = () => {
  const height = useSharedValue(80);

  useEffect(() => {
    height.value = withSpring(height.value + 20);
  }, []);

  return (
    <Animated.View style={[styles.container, { height }]}>
      <Image
        source={require("../assets/images/home.png")}
        style={styles.notification_image}
      />
      <View>
        <View style={styles.card_header}>
          <Text style={styles.header_title}>NotificaionCard</Text>
          <Text style={styles.header_date}>20 Oct 2024</Text>
        </View>
        <Text style={styles.card_desc} numberOfLines={2}>
          Due to the management switch we will cutting down the salary.. Due to
          the management switch we will cutting down the salary.. the management
          switch we will cutting down the salary..
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F3F3",
    flexDirection: "row",
    margin: 10,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    gap: 13,
  },
  header_title: {
    fontSize: 20,
    fontWeight: "500",
  },
  card_desc: {
    fontSize: 17,
    flexShrink: 1,
    marginRight: 20,
  },
  card_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header_date: {
    fontSize: 15,
    marginRight: 29,
  },
  notification_image: {
    height: 20,
    width: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
});

export default NotificationCard;
