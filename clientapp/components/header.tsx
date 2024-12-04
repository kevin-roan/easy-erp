import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Vibration,
} from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { router, useNavigation } from "expo-router";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState("user");
  const { authState } = useAuth();
  useEffect(() => {
    if (authState.userInfo) {
      const username = authState?.userInfo.name;
      setUsername(username);
    }
  }, []);

  const handleNavigation = () => {
    router.push("/screens/viewNotifications");
    Vibration.vibrate(50);
  };
  return (
    <View style={styles.container}>
      <View style={styles.greetingcontainer}>
        <Image
          alt="user image"
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
          }}
          height={30}
          width={30}
          style={styles.userAvatar}
        />
        <Text style={styles.heading_text}>
          Hi there! <Text style={styles.username}> {username},</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={handleNavigation}>
        <SimpleLineIcons size={20} name="bell" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 20,
    shadowColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userAvatar: {
    height: 30,
    width: 30,
    borderRadius: 300,
  },
  heading_text: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
    color: "#010101",
    fontFamily: "Poppins",
  },

  greetingcontainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontFamily: "PlayWrite",
  },
});
