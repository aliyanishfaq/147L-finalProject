import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import MapView from "react-native-maps";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Link href={{ pathname: '/secondPage' }}>
        <Text>Let's go to another page!!</Text>
      </Link>
      <Link href={{ pathname: '/thirdPage' }}>
        <Text>Let's go to third page!!</Text>
      </Link>
      <MapView style={styles.map} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
