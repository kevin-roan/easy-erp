import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import { useAuth0 } from "react-native-auth0";

export default function Tab() {
  const { user, error, getCredentials } = useAuth0();
  const { onLogout, onLogin, verifyUser } = useAuth();
  const handleLogout = () => {
    onLogout();
  };
  return (
    <View style={styles.container}>
      <Image
        height={200}
        width={200}
        source={{
          uri: user?.picture,
        }}
      />
      <Text>Employee Email:{user?.email}</Text>
      <Text>EMP0033</Text>
      <Text>Full Stack Developer</Text>
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
        onPress={() =>
          verifyUser(
            user?.email,
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFGd1RwN1FkMUFrSGZhQWJBRHFrbCJ9.eyJpc3MiOiJodHRwczovL2Rldi1lN3V4dXVkd3NxcXVwNDd1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNjgyNjE0ODEzMjY0ODAzMTc2NyIsImF1ZCI6WyJodHRwOi8vZWFzeWVycC5jb20vYXBpL3YxL3Rhc2tzIiwiaHR0cHM6Ly9kZXYtZTd1eHV1ZHdzcXF1cDQ3dS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzMwNzk2NzI2LCJleHAiOjE3MzA4ODMxMjYsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhenAiOiJtNE5FMzBGUlUxM0x6a1llQzRYcEZ5WnhuSDZQSkgxciJ9.GZbqJQpJ3zhUh6qJ_YN4tPKrIkKzrkCX3K7uScMXXKXXsK3zX5_x6Ws15rNQIJhi0yg63EfbAUxqpoh0HW_2AAbZJD9LnP6T63Bm41ICu3s_-MNQFhqaGiTvo2WBKzNikJEzpz62Hii-mAQh_Ew42C4_lma9TE5OL-2jPNR3tdPxc52OL4HyD05O2HVu37eRFYGDBxUS3dBEnY-IUCXee4uLXtSljVl14lA5jPIzGOXHWqIwhTEoGdnokNQoUnBgg47TXDmCDev4V6qRi96UNA_RRN7I1HwANPmeei7orHqfcstKlXaKZHtHV9RPsI2E25Ce2nhEC8x6WYbbGKIyyw",
          )
        }
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
