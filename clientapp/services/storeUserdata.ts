import AsyncStorage from "@react-native-async-storage/async-storage";

const storeUserData = async (data) => {
  await AsyncStorage.setItem("userdata", JSON.stringify(data))
    .then(() => {
      console.log("stored in local storage");
      setTimeout(async () => {
        const result = await AsyncStorage.getItem("userdata");
        if (result) {
          console.log("data from locatstore", result);
        }
      }, 4000);
    })
    .catch((error) => {
      console.error("Error storing user informations", error);
    });
};

export { storeUserData };
