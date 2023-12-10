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
          title: "PennyPal",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#eeeeee",
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            padding: 10,
            fontSize: 20,
            
          },
          headerTitleAlign: 'left',
          tabBarStyle: { backgroundColor: "#eeeeee" },
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Expenses",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="dollar" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#eeeeee",
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            padding: 10,
            fontSize: 22,
            
          },
          headerTitleAlign: 'left',
          tabBarStyle: { backgroundColor: "#eeeeee" },
        }}
      />
      <Tabs.Screen
        name="digitalAssistant"
        options={{
          title: "Digital Assistant",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="message1" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#eeeeee",
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            padding: 10,
            fontSize: 20,
            
          },
          headerTitleAlign: 'left',
          tabBarStyle: { backgroundColor: "#eeeeee" },
        }}
      />
    </Tabs>
  );
}
