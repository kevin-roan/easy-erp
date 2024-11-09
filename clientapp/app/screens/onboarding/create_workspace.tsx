import { setWorkspaceFormData } from "@/redux/reducers/formSlice";
import React from "react";
import { TextInput } from "react-native-paper";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { createNewProfile } from "@/services/createProfile";
import createWorkspace from "@/services/createWorkspace";
import { useAuth0 } from "react-native-auth0";
import { useAuth } from "@/app/context/AuthContext";
import { router } from "expo-router";

const create_workspace = () => {
  const { user } = useAuth0();
  const { authState } = useAuth();

  console.log("user details", user);
  const dispatch = useDispatch();
  const handleTextChange = (text: string) => {
    dispatch(
      setWorkspaceFormData({
        workspaceName: text,
        owner: {
          userName: user?.email,
          userEmail: user?.email,
        },
      }),
    );
  };
  const handleSubmit = () => {
    router.push("/screens/onboarding/create_team");
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", gap: 50, margin: 20 }}
    >
      <Text variant="titleLarge">Create Workspace</Text>
      <TextInput
        placeholder="workspace name"
        onChangeText={handleTextChange}
        autoFocus
      />
      <Button mode="contained" onPress={handleSubmit}>
        Next
      </Button>
      <Text>Invite Team Members:</Text>
    </SafeAreaView>
  );
};

export default create_workspace;
