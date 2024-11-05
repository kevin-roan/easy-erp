import React from "react";
import { Text } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import { useRoute } from "@react-navigation/native";

const CreateProfile = () => {
  const { user } = useAuth0();
  // this shoudl get the email of the user

  const handleCreateProfile = (text) => {
    console.log(text);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 30,
        margin: 20,
      }}
    >
      <Text variant="displaySmall">Create Profile</Text>
      <Text variant="displaySmall">{user.email}</Text>
      <TextInput
        placeholder="full name"
        onChangeText={(text) => handleCreateProfile(text)}
      ></TextInput>
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
