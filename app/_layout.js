import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="secondPage"
        options={{
          tabBarLabel: "Expenses",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="dollar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="thirdPage"
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="message1" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fourthPage"
        options={{
          tabBarLabel: "Stocks",
          tabBarIcon: ({ size, color }) => (
            <Fontisto name="money-symbol" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
