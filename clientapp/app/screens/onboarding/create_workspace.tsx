import { setWorkspaceFormData } from "@/redux/reducers/formSlice";
import React from "react";
import { TextInput } from "react-native-paper";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { createNewProfile } from "@/services/createProfile";

const create_workspace = () => {
  const dispatch = useDispatch();
  const handleTextChange = (text: string) => {
    dispatch(setWorkspaceFormData({ workspaceName: text }));
  };
  const handleSubmit = () => {
    createNewProfile();
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
