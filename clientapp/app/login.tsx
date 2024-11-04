import React from "react";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./context/AuthContext";

const Login = () => {
  const { onLogin } = useAuth();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text variant="titleLarge">Welcome to easy erp</Text>
      <Button icon="arrow-right" mode="contained" onPress={onLogin}>
        Get Started
      </Button>
    </SafeAreaView>
  );
};

export default Login;
