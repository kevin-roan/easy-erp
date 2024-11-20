import axios from "axios";
import { Alert } from "react-native";
import { store } from "@/redux/store/store";
import { router } from "expo-router";

const signUp = async () => {
  const state = store.getState();
  const signUpData = state.form.formData.signup;

  try {
    const response = await axios.post(
      "http://192.168.0.198:8000/api/v1/user/sign-up",
      signUpData,
    );
    if (response.status === 201) {
      // true if user is created
      Alert.alert("Created profile successfully");
      // backend should return data (workspace, team,userprofile)
      // store it from here
      // redirect to tabs
      router.replace("/(tabs)/");
    } else {
      console.log("Error creating user", response.data.message);
      Alert.alert("Something is wrong on our end");
    }
  } catch (error) {
    console.error("Error", error);
    Alert.alert("Error creating profile try again later");
  }
};

export default signUp;
