import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Alert, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth0 } from "react-native-auth0";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDataFromStorage } from "@/redux/reducers/employeeSlice";
import * as SecureStore from "expo-secure-store";

const Login = () => {
  const { getCredentials, authorize, user } = useAuth0();

  // console.log("check user", user);

  const verifyUserWithServer = async () => {
    try {
      const response = await getCredentials();
      if (response?.accessToken) {
        // await AsyncStorage.setItem("accessToken", response.accessToken);
        async function save(key, value) {
          await SecureStore.setItemAsync(key, value);
        }
      }
    } catch (error) {
      Alert.alert(error);
      console.log(error, "Error fetching data");
    }
  };

  useEffect(() => {
    fetchUserDataFromStorage();
    const initialize = async () => {
      const result = await AsyncStorage.getItem("accessToken");
      if (!result) {
        await verifyUserWithServer();
      }
    };
    initialize();
  }, []);

  const handleSignIn = async () => {
    try {
      await authorize().then(() => {
        console.log("authentcation sucess");
        verifyUserWithServer();
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Login page</Text>
      <TouchableOpacity style={styles.login_button} onPress={handleSignIn}>
        <Text style={styles.login_button_text}>Login</Text>
      </TouchableOpacity>
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
  login_button: {
    backgroundColor: "#0691cc",
    paddingHorizontal: 30,
    borderRadius: 20,
    margin: 19,
    paddingVertical: 10,
  },
  login_button_text: {
    color: "white",
    fontWeight: "bold",
  },
});
export default Login;
