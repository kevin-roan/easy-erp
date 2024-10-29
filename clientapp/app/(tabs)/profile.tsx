import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth0 } from "react-native-auth0";

export default function Tab() {
  const { authorize } = useAuth0();

  const onPress = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Kevin Roan</Text>
      <Text>Employee Email</Text>
      <Text>EMP0033</Text>
      <Text>Full Stack Developer</Text>
      <Text>Adacode Solutions</Text>
      <Button onPress={onPress} title="Log in" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
