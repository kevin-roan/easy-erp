import { SafeAreaView } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setTeamFormData } from "@/redux/reducers/formSlice";
import React from "react";

const create_team = () => {
  const dispatch = useDispatch();
  const handleTextChange = (text) => {
    dispatch(
      setTeamFormData({
        teamName: text,
      }),
    );
  };
  const handleSubmit = () => {};
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", gap: 50, margin: 20 }}
    >
      <Text variant="titleLarge">Create Team</Text>
      <TextInput
        placeholder="Team Name"
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

export default create_team;
