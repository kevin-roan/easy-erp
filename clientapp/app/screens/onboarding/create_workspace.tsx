import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";

const create_workspace = () => {
  return (
    <View>
      <TextInput placeholder="workspace name" />
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        Next
      </Button>
      <Text>Invite Team Members:</Text>
    </View>
  );
};

export default create_workspace;
