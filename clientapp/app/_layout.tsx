import { Stack } from "expo-router/stack";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
// font configurations
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";

import { store, persistor } from "../redux/store/store.js";
import { useEffect } from "react";
import { Auth0Provider } from "react-native-auth0";

import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider, useAuth } from "./context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PlayWrite: require("../assets/fonts/PlaywriteGBS-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && error) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <Auth0Provider
          domain={process.env.EXPO_PUBLIC_AUTH_DOMAIN}
          clientId={process.env.EXPO_PUBLIC_API_KEY}
        >
          <PersistGate loading={null} persistor={persistor}>
            <StatusBar style="light" backgroundColor="red" />
            <AuthProvider>
              <RootLayout />
            </AuthProvider>
          </PersistGate>
        </Auth0Provider>
      </Provider>
    </>
  );
}

const RootLayout = () => {
  const { authState } = useAuth();
  console.log("auth state,", authState);

  const headerStyles = {
    headerShown: false,
    statusBarStyle: "dark",
    statusBarTranslucent: true,
    statusBarAnimation: "fade",
    statusBarColor: "#F2F4F8",
  };

  return (
    <>
      {authState?.authenticated ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={headerStyles} />
          <Stack.Screen
            name="screens/view_notifications"
            options={{
              headerShown: true,
              statusBarTranslucent: headerStyles.statusBarTranslucent,
              statusBarAnimation: "slide",
              statusBarColor: "#F7F7F7",
              headerBackground: () => (
                <BlurView
                  tint="light"
                  intensity={100}
                  style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: "#F2F2F6" },
                  ]}
                />
              ),
              statusBarStyle: headerStyles.statusBarStyle,
              headerTitleAlign: "center",
              headerTitle: () => (
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Notifications
                </Text>
              ),
            }}
          />
        </Stack>
      ) : (
        <Stack>
          <Stack.Screen name="login" options={headerStyles} />
        </Stack>
      )}
    </>
  );
};
