import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Expenses",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="dollar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="digitalAssistant"
        options={{
          title: "Digital Assistant",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="message1" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
