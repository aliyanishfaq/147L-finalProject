import React from "react";
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Card, Text, Title, Paragraph, Button } from "react-native-paper";
import MapView from "react-native-maps";
import { Link } from "expo-router";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function App() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Tabs.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container}>
        <Card style={styles.header} mode="contained" theme={{ roundness: 0 }}>
          <Text style={styles.title}>PennyPal</Text>
        </Card>
        <Paragraph style={styles.descriptionTagline}>
          The optimal way to manage money.
        </Paragraph>
        <Card style={styles.descriptionBox} mode="elevated">
          <Card.Content>
            <Paragraph style={styles.introParagraph}>
              Designed to empower small-scale enterprises, our app offers a
              seamless, cross-platform solution for tracking expenses across
              various categories and delivering tailored financial advice to
              maximize profits.
            </Paragraph>
          </Card.Content>
        </Card>
        <Title style={styles.descriptionTagline2}>Current Clients:</Title>
        <Card
          style={styles.logosCard}
          mode="contained"
          theme={{ roundness: 0 }}
        >
          <ScrollView
            horizontal={true}
            style={styles.carousel}
            showsHorizontalScrollIndicator={false}
          >
            <Image
              source={require("../assets/blinkist.png")}
              style={styles.companyLogo}
            />
            <Image
              source={require("../assets/babbel.png")}
              style={styles.companyLogo}
            />
            <Image
              source={require("../assets/webacy.png")}
              style={styles.companyLogo}
            />
            <Image
              source={require("../assets/gopuff.png")}
              style={styles.companyLogo}
            />
            <Image
              source={require("../assets/instacartLogo.png")}
              style={styles.companyLogo}
            />
            <Image
              source={require("../assets/peopleAI.png")}
              style={styles.companyLogo}
            />
            <Image
              source={require("../assets/linguix.png")}
              style={styles.companyLogo}
            />
            <Image
              source={require("../assets/flyfin.png")}
              style={styles.companyLogo}
            />
          </ScrollView>
        </Card>
        <Title style={styles.descriptionTagline3}>See App in Action:</Title>
        <ScrollView horizontal={true} style={styles.carousel2}>
          <View style={styles.imagesWithSubtitlesContainer}>
            <Card style={[styles.imageContainer, styles.cardSpacing1]}>
              <Card.Cover
                source={require("../assets/expenses.png")}
                style={styles.image}
              />
              <Card.Actions>
                <Link href="/expenses" style={styles.linkStyle}>
                  <Button
                    mode="contained"
                    labelStyle={styles.buttonLabelStyle}
                    style={[styles.button, { backgroundColor: "#ADD8E6" }]}
                  >
                    <Text style={styles.linkText}>Expenses</Text>
                  </Button>
                </Link>
              </Card.Actions>
            </Card>

            <Card style={[styles.imageContainer, styles.cardSpacing2]}>
              <Card.Cover
                source={require("../assets/chatbot.png")}
                style={styles.image}
              />
              <Card.Actions>
                <Link href="/digitalAssistant" style={styles.linkStyle}>
                  <Button
                    mode="contained"
                    labelStyle={styles.buttonLabelStyle}
                    style={[styles.button, { backgroundColor: "#ADD8E6" }]}
                  >
                    <Text style={styles.linkText}>AI Chatbot</Text>
                  </Button>
                </Link>
              </Card.Actions>
            </Card>
          </View>
        </ScrollView>
        <MapView style={styles.map} />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    width: windowWidth,
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
    borderColor: "#eeeeee",
    borderWidth: 3,
    marginTop: 10,
    padding: windowWidth * 0.1,
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 52,
    fontWeight: "bold",
    fontFamily: "Helvetica Neue",
    color: "#001861",
  },
  introParagraph: {
    fontSize: 14,
    fontFamily: "Helvetica Neue",
    color: "black",
  },
  descriptionTagline: {
    fontSize: windowHeight * 0.02,
    textAlign: "center",
    paddingHorizontal: 10,
    marginTop: 30,
    fontFamily: "Helvetica Neue",
    color: "#001861",
    fontWeight: "bold",
  },
  descriptionTagline2: {
    fontSize: 18,
    textAlign: "left",
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 20,
    fontFamily: "Helvetica Neue",
    color: "#001861",
    fontWeight: "bold",
  },
  descriptionTagline3: {
    fontSize: 18,
    textAlign: "left",
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 20,
    fontFamily: "Helvetica Neue",
    color: "#001861",
    fontWeight: "bold",
  },
  descriptionBox: {
    paddingHorizontal: 0,
    marginTop: 20,
    marginHorizontal: 10,
    borderColor: "#ADD8E6",
    borderWidth: 3,
    backgroundColor: "#ADD8E6",
    height: windowHeight * 0.21,
    alignItems: "center",
    justifyContent: "center",
  },
  logosCard: {
    backgroundColor: "white",
    overflow: "hidden",
  },
  appInfo: {
    fontSize: 12,
    color: "white",
  },
  companyLogo: {
    width: windowWidth * 0.13,
    height: 100,
    resizeMode: "contain",
    marginHorizontal: windowWidth * 0.1,
  },
  carousel: {
    marginTop: 10,
    height: 100,
    width: windowWidth,
    backgroundColor: "white",
  },
  imagesWithSubtitlesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    width: windowWidth * 0.5,
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#ADD8E6",
    borderWidth: 1,
  },
  cardSpacing1: {
    marginLeft: 15,
    marginRight: 10,
  },
  button: {
    width: 150,
    height: 40,
    marginRight: 20,
  },
  image: {
    width: windowWidth * 0.42,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  linkText: {
    fontSize: 14,
    marginTop: 8,
    color: "black",
    fontFamily: "Helvetica Neue",
  },
  linkStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
