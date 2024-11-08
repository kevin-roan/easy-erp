import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth0 } from "react-native-auth0";
import { router } from "expo-router";
import { storeUserData } from "@/services/storeUserdata";

const AuthContext = createContext({});

const TOKEN_KEY = "jwt_token";
const customScheme = "com.kevinroan.erpsoftware.auth0";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    isActive: boolean | null;
  }>({
    token: null,
    authenticated: null,
    isActive: null,
  });

  // auth0 stuff
  const { authorize, clearSession, user, isLoading, error } = useAuth0();

  // load the jwt token when the app mounts

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      // console.log("stored token", token);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // check the token expiration stuff from here.
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  // login
  const login = async () => {
    try {
      const authResult = await authorize(
        {
          scope: "openid profile email",
          audience: "http://easyerp.com/api/v1/tasks",
          // fk this, hard to embed email into the acesstoken
        },
        {
          customScheme: customScheme,
        },
      );
      if (authResult?.accessToken) {
        setAuthState({
          token: authResult.accessToken,
          authenticated: true,
        });

        // send the jwt token with every axios request ( binding the token to axios header )
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${authResult?.accessToken}`;

        // store the jwt token to secure store
        await SecureStore.setItemAsync(TOKEN_KEY, authResult?.accessToken);

        // force fetch the user info from auth server
        const fetchUserInfo = async (accessToken) => {
          try {
            const response = await axios.get(
              "https://dev-e7uxuudwsqqup47u.us.auth0.com/userinfo",
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            );
            return response.data;
          } catch (error) {
            console.log("Error fetching user info:", error);
            return null;
          }
        };
        const userdata = await fetchUserInfo(authResult.accessToken);
        // verify the user with server
        if (userdata.email) {
          await verifyUser(userdata.email);
        }
      }
    } catch (error) {
      console.log(error);
      throw Error(
        "There was an issue authenticating the user. Please try again.",
      );
    }
  };

  const logout = async () => {
    // delete the jwt from secure store from here
    try {
      await clearSession({ customScheme: customScheme });
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      // reset axios default auth header
      axios.defaults.headers.common["Authorization"] = "";
      setAuthState({
        token: null,
        authenticated: null,
      });
    } catch (error) {
      console.log("Logout Cancelled");
    }
  };

  const verifyUser = async (email) => {
    console.log("Verify User email", email);
    try {
      const apiResponse = await axios.post(
        `http://192.168.0.198:8000/api/v1/user`,
        {
          email: email,
        },
      );

      const result = apiResponse.data;
      console.log("result", result);
      if (!result.isExists) {
        console.log("New User");
        router.push("/screens/onboarding/create_profile");
      } else {
        console.log("Existing user details", result);
        // store the userdata in async storage
        storeUserData(result.data);
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    isLoading,
    verifyUser,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
