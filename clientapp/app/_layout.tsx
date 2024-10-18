import { Stack } from "expo-router/stack";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
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
  return (
    <>
      <PaperProvider>
        <StatusBar style="light" backgroundColor="red" />
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              statusBarStyle: "dark",
              statusBarTranslucent: true,
              statusBarAnimation: "fade",
              statusBarColor: "#F2F4F8",
            }}
          />
        </Stack>
      </PaperProvider>
    </>
  );
}
