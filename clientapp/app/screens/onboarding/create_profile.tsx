import React from "react";
import { Text } from "react-native-paper";

import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import { useDispatch } from "react-redux";
import { setSignUpformdata } from "@/redux/reducers/formSlice";

const CreateProfile = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const handleTextChange = (text: string) => {
    dispatch(setSignUpformdata({ name: text, email: user?.email }));
  };
  const handleSubmit = () => {
    router.push("/screens/onboarding/create_workspace");
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
      <Text variant="displaySmall">{user?.email}</Text>
      <TextInput
        placeholder="full name"
        autoFocus
        onChangeText={(text) => handleTextChange(text)}
      ></TextInput>
      <Button mode="contained" onPress={handleSubmit}>
        Next
      </Button>
    </SafeAreaView>
  );
};

export default CreateProfile;
