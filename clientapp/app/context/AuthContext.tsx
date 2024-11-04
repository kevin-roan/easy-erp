import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth0 } from "react-native-auth0";

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
  }>({
    token: null,
    authenticated: null,
  });

  // auth0 stuff
  const { authorize, clearSession, user, isLoading, error } = useAuth0();

  // load the jwt token when the app mounts

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored token", token);
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

  const value = {
    onLogin: login,
    onLogout: logout,
    isLoading,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
