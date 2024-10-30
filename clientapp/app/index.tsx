import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth0 } from "react-native-auth0";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const { getCredentials } = useAuth0();

  const verifyUserWithServer = async () => {
    try {
      const response = await getCredentials();
      if (response?.accessToken) {
        await AsyncStorage.setItem("accessToken", response.accessToken);
      }
    } catch (error) {
      console.log(error, "Error fetching data");
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const result = await AsyncStorage.getItem("accessToken");
      if (!result) {
        await verifyUserWithServer();
      }
    };
    initialize();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Login page</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
  },
});
export default Login;
