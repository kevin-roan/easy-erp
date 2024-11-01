import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Alert, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth0 } from "react-native-auth0";
import * as AuthSession from "expo-auth-session";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDataFromStorage } from "@/redux/reducers/employeeSlice";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// todo
// expo browser is installed, should use native browser instead of thrid party one

const Login = () => {
  const { getCredentials, authorize, user } = useAuth0();

  // console.log("check user", user);
  // after user authentication, check if the user match with the server, (email). if yes,
  // then store the secure acceestoken inside secure store.
  // the access token should sent to the server for matching the user.

  const ludan = async () => {
    const result = await getCredentials();
    console.log("result", result);
  };
  ludan();

  const verifyUserWithServer = async (accessToken) => {
    console.log(accessToken);
    if (accessToken) {
      await SecureStore.setItemAsync("accessToken", accessToken);

      try {
        const result = await axios.get("http://192.168.0.198:8000/validate", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("response", result);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }; //
  // useEffect(() => {
  //   fetchUserDataFromStorage();
  //   const initialize = async () => {
  //     const result = await AsyncStorage.getItem("accessToken");
  //     if (!result) {
  //       await verifyUserWithServer();
  //     }
  //   };
  //   initialize();
  // }, []);
  //
  const handleSignIn = async () => {
    try {
      const authResult = await AuthSession.startAsync({
        authUrl:
          `https://YOUR_AUTH0_DOMAIN/authorize?` +
          `client_id=YOUR_CLIENT_ID` +
          `&response_type=token` +
          `&redirect_uri=${AuthSession.makeRedirectUri({ useProxy: true })}` +
          `&audience=YOUR_API_IDENTIFIER` + // <- Specify your API identifier here
          `&scope=openid profile email`, // <- Include other scopes you need
      });

      if (authResult?.params?.access_token) {
        verifyUserWithServer(authResult.params.access_token);
      }
    } catch (error) {
      console.error("Error during authorization", error);
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
