import axios from "axios";
import { store } from "@/redux/store/store";
import { router } from "expo-router";
import { Alert } from "react-native";

const createWorkspace = async () => {
  const state = store.getState();
  const workspaceData = state.form.formData.workspaceFormData;
  console.log("workspace values", workspaceData);

  try {
    const response = await axios.post(
      "http://192.168.0.198:8000/api/v1/organization",
      workspaceData,
    );
    console.log(response, "workspace response");
    if (response.status) {
      // create workspace success
      console.log("Created workspace");
    } else {
      console.error("Error creating workspace", response.message);
    }
  } catch (error) {
    console.error(error);
    Alert.alert(`Error creating workspace ${error}`);
  }
};

export default createWorkspace;
