import { setWorkspaceFormData } from "@/redux/reducers/formSlice";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { TextInput } from "react-native-paper";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const create_workspace = () => {
  const dispatch = useDispatch();
  const handleTextChange = (text: GestureResponderEvent) => {
    dispatch(setWorkspaceFormData({ workspaceName: text }));
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", gap: 50, margin: 20 }}
    >
      <Text variant="titleLarge">Create Workspace</Text>
      <TextInput placeholder="workspace name" />
      <Button mode="contained" onPress={handleTextChange}>
        Next
      </Button>
      <Text>Invite Team Members:</Text>
    </SafeAreaView>
  );
};

export default create_workspace;
