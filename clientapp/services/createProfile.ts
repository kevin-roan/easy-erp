import axios from "axios";
import { store } from "@/redux/store/store";
import { router } from "expo-router";
import { Alert } from "react-native";

const createNewProfile = async () => {
  const state = store.getState();
  const profileData = state.form.formData.profileFormData;

  try {
    const response = await axios.post(
      "http://192.168.0.198:8000/api/v1/user",
      profileData,
    );
    if (response.status) {
      Alert.alert("Created User Successfully");
      router.push("/screens/onboarding/create_workspace");
    } else {
      console.log("created workspace and user", response.data);
      Alert.alert(response.data);
    }
    if (response.status === 201) {
      // exists
      router.replace("/screens/onboarding/create_workspace");
    }
  } catch (error) {
    console.error("Error creating a profile", error);
    Alert.alert("Error creating Profile, Try Again Later");
  }
};

export { createNewProfile };
