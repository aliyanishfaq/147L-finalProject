import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import MapView from "react-native-maps";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        This will have an API of the stock exchange with infinite scroll
      </Text>
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
