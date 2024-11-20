import { Stack } from "expo-router/stack";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
// font configurations
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { Redirect } from "expo-router";

import { store, persistor } from "../redux/store/store.js";
import { useEffect, useState } from "react";
import { Auth0Provider } from "react-native-auth0";

import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { router, useRouter } from "expo-router";
import { Slot } from "expo-router";
import Splash from "./splash";

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
    <Provider store={store}>
      <Auth0Provider
        domain={process.env.EXPO_PUBLIC_AUTH_DOMAIN}
        clientId={process.env.EXPO_PUBLIC_API_KEY}
      >
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <RootLayout />
          </AuthProvider>
        </PersistGate>
      </Auth0Provider>
    </Provider>
  );
}

const RootLayout = () => {
  const { authState, isLoading } = useAuth(); // Make sure `isLoading` is implemented in AuthContext to track auth status

  useEffect(() => {
    if (authState && !isLoading) {
      router.replace("/(tabs)");
      if (authState.userInfo === null) {
        router.replace("/screens/onboarding/create_profile");
      }
    }
  }, [authState]);

  if (isLoading) {
    // Optional: Render a loading screen while authentication state is being verified
    return <Splash />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Slot />
    </>
  );
};
