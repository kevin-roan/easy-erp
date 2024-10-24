import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Vibration,
} from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useNavigation } from "expo-router";

export default function Header() {
  const username = "Kevin Roan";
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("screens/view_notifications");
    Vibration.vibrate(50);
  };
  return (
    <View style={styles.container}>
      <View style={styles.greetingcontainer}>
        <Image
          alt="user image"
          source={{
            uri: "https://wallpapers.com/images/hd/anime-profile-picture-jioug7q8n43yhlwn.jpg",
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
