import { StyleSheet, Image, Text, View } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

export default function Header() {
  const username = "Kevin Roan";
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
          Hi there! <Text style={styles.username}> {username}</Text>
        </Text>
      </View>
      <SimpleLineIcons size={20} name="bell" />
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
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 3,
    shadowRadius: 20,
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
    fontFamily: "Poppins-Black",
  },

  greetingcontainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontFamily: "Exo",
  },
});
