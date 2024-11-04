import { View } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Onboarding = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
      }}
    >
      <Text variant="titleLarge">Welcome to easy erp</Text>
      <Button
        icon="arrow-right"
        mode="contained"
        onPress={() => router.push("/sign-in")}
      >
        Get Started
      </Button>
    </SafeAreaView>
  );
};

export default Onboarding;
