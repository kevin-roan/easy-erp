import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
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
          title: "Upcoming",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="level-up" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatroom"
        options={{
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
