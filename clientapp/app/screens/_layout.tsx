import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { BlurView } from "expo-blur";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="screens/view_notifications"
        options={{
          headerShown: true,
          statusBarTranslucent: true,
          statusBarAnimation: "slide",
          statusBarColor: "#F7F7F7",
          headerBackground: () => (
            <BlurView
              tint="light"
              intensity={100}
              style={[StyleSheet.absoluteFill, { backgroundColor: "#F2F2F6" }]}
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
  );
};

export default _layout;
