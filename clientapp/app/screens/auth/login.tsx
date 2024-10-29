import React from "react";
import { View, Text } from "react-native";
import { useAuth0, Auth0Provider } from "react-native-auth0";

const Login = () => {
  return (
    <View>
      <Auth0Provider
        domain={"dev-e7uxuudwsqqup47u.us.auth0.com"}
        clientId={"oW2hpDaZPHvlW0ZIMHNT13Jz7wLqtfBT"}
      >
        {/* your application */}
      </Auth0Provider>
    </View>
  );
};

export default Login;
