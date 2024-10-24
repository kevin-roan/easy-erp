import { Stack } from "expo-router/stack";
import { PaperProvider } from "react-native-paper";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
// font configurations
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

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

  const headerStyles = {
    headerShown: false,
    statusBarStyle: "dark",
    statusBarTranslucent: true,
    statusBarAnimation: "fade",
    statusBarColor: "#F2F4F8",
  };
  return (
    <>
      <PaperProvider>
        <StatusBar style="light" backgroundColor="red" />
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
      </PaperProvider>
    </>
  );
}
