import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs, router } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function TabLayout() {
  const { authState } = useAuth();
  if (!authState.authenticated) {
    return <Redirect href="/login" />;
  }

  console.log("autstate", authState);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#9061F9",
        tabBarStyle: {
          borderRadius: 10,
          height: 70,
          shadowOffset: 0,
          shadowOpacity: 0,
          paddingBottom: 10,
        },
        tabBarInactiveTintColor: "#D8D8D8",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: {},
          headerTitleAlign: "center",
          title: "Current Tasks",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="stumbleupon" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="viewtasks"
        options={{
          headerShown: false,
          title: "My Tasks",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="level-up" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatroom"
        options={{
          headerShown: false,
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="wechat" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
