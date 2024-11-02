import { useAuth0, Auth0Provider } from "react-native-auth0";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { useEffect } from "react";

const customScheme = "com.kevinroan.erpsoftware.auth0";

const Home = () => {
  const { authorize, clearSession, user, error, getCredentials } = useAuth0();

  useEffect(() => {
    const storeAccessToken = async () => {
      const credentials = await getCredentials();
      const accessToken = credentials?.accessToken;

      // Store the access token only if it exists
      if (accessToken) {
        await SecureStore.setItemAsync("accessToken", accessToken);
      }
    };

    if (user) {
      storeAccessToken();
    }
  }, [user]);

  const onLogin = async () => {
    try {
      await authorize(
        {
          scope: "openid profile email",
          audience: "http://easyerp.com/api/v1/tasks",
        },
        {
          customScheme: customScheme,
        },
      );
    } catch (e) {
      throw Error(
        "There was an issue authenticating the user. Please try again.",
      );
    }
  };

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    try {
      await clearSession({ customScheme: customScheme });
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  const onCallAPI = async () => {
    const accessToken = (await getCredentials()).accessToken;
    console.log("accesstoken", accessToken);
    const apiResponse = await fetch(`http://192.168.0.198:8000/api/v1/tasks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    Alert.alert(await apiResponse.text());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Auth0 React Native - Login </Text>
      {user && <Text>You are logged in as {user.name}</Text>}
      {!user && <Text>You are not logged in</Text>}
      {error && <Text>{error.message}</Text>}

      {user && <Button title="Call API" onPress={onCallAPI} />}

      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? "Log Out" : "Log In"}
      />
    </View>
  );
};

export default function App() {
  return (
    <Auth0Provider
      domain={"dev-e7uxuudwsqqup47u.us.auth0.com"}
      clientId={"m4NE30FRU13LzkYeC4XpFyZxnH6PJH1r"}
    >
      <Home />
    </Auth0Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
