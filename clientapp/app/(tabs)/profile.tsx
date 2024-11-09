import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import { useAuth0 } from "react-native-auth0";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";

export default function Tab() {
  const [userdata, setUserdata] = useState(null);
  const { user, error } = useAuth0();
  const { onLogout, onLogin, verifyUser } = useAuth();
  const handleLogout = () => {
    onLogout();
  };

  // instead of this, use authcontext for fetching the data
  useEffect(() => {
    const getUserdata = async () => {
      const storedUserdata = await AsyncStorage.getItem("userdata");
      setUserdata(JSON.parse(storedUserdata));
    };
    getUserdata();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        height={50}
        width={50}
        style={{ borderRadius: 1000 }}
        source={{
          uri: user?.picture,
        }}
      />
      <Text variant="bodyLarge">Employee Email:{userdata?.name} </Text>
      <Text variant="titleMedium">UserId:{userdata?._id}</Text>
      <Button title="Login" onPress={onLogin}></Button>
      <TouchableOpacity onPress={handleLogout} style={styles.logout_button}>
        <Text style={styles.logout_button_text}>Log Out</Text>
      </TouchableOpacity>
      {user && <Text>Logged in as {user.name}</Text>}
      {!user && <Text>Not logged in</Text>}
      {error && <Text>{error.message}</Text>}
      <Button
        icon="camera"
        mode="contained"
        onPress={() => verifyUser(user?.email)}
      >
        Press me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logout_button: {
    backgroundColor: "#1971C2",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  logout_button_text: {
    fontSize: 20,
    color: "white",
  },
});
