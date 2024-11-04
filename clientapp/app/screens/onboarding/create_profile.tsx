import React from "react";
import { Text } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { router } from "expo-router";

const CreateProfile = () => {
  return (
    <SafeAreaView>
      <Text variant="displaySmall">Create Profile</Text>
      <TextInput placeholder="full name"></TextInput>
      <Button
        mode="contained"
        onPress={() => router.replace("/screens/onboarding/create_workspace")}
      >
        Next
      </Button>
    </SafeAreaView>
  );
};

export default CreateProfile;
