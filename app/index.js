import React from "react";
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph, Button, Text } from "react-native-paper";
import MapView from "react-native-maps";
import { Link } from "expo-router";

const windowWidth = Dimensions.get("window").width;

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Tabs.Screen
                options={{headerShown: false}}
              />
      <Card style={styles.header}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.title}>Expenses Tracker</Text>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>
      </Card>
      <Paragraph style={styles.descriptionTagline}>
        The optimal way to manage money.
      </Paragraph>
      <Card style={styles.descriptionBox}>
        <Card.Content>
          <Paragraph style={styles.introParagraph}>
            Designed to empower large-scale enterprises, our app offers a
            seamless, cross-platform solution for tracking expenses across
            various categories and delivering tailored financial advice to
            maximize profits.
          </Paragraph>
        </Card.Content>
      </Card>
      <Title style={styles.descriptionTagline2}>Current Clients:</Title>
      <Card style={styles.logosCard}>
        <ScrollView horizontal={true} style={styles.carousel}>
          <Image
            source={require("../assets/amazonLogo.png")}
            style={styles.companyLogo}
          />
          <Image
            source={require("../assets/chatGptLogo.png")}
            style={styles.companyLogo}
          />
          <Image
            source={require("../assets/cocaCola.png")}
            style={styles.companyLogo}
          />
          <Image
            source={require("../assets/coinbaseLogo.png")}
            style={styles.companyLogo}
          />
          <Image
            source={require("../assets/instacartLogo.png")}
            style={styles.companyLogo}
          />
          <Image
            source={require("../assets/microsoftLogo.png")}
            style={styles.companyLogo}
          />
          <Image
            source={require("../assets/Bcg.png")}
            style={styles.companyLogo}
          />
          <Image
            source={require("../assets/apple.png")}
            style={styles.companyLogo}
          />
        </ScrollView>
      </Card>
      <Title style={styles.descriptionTagline3}>See App in Action:</Title>
      <ScrollView horizontal={true} style={styles.carousel2}>
        <View style={styles.imagesWithSubtitlesContainer}>
          <Card style={[styles.imageContainer, styles.cardSpacing1]}>
            <Card.Cover
              source={require("../assets/coinbaseLogo.png")} // replace with picture of expenses list page
              style={styles.image}
            />
            <Card.Actions>
              <Link href="/secondPage" style={styles.linkStyle}>
                <Button
                  mode="contained"
                  labelStyle={styles.buttonLabelStyle}
                  style={[styles.button, { backgroundColor: "#003366" }]}
                >
                  <Text style={styles.linkText}>Expenses</Text>
                </Button>
              </Link>
            </Card.Actions>
          </Card>

          <Card style={[styles.imageContainer, styles.cardSpacing2]}>
            <Card.Cover
              source={require("../assets/coinbaseLogo.png")} // replace with picture of chatGPT page
              style={styles.image}
            />
            <Card.Actions>
              <Link href="/thirdPage" style={styles.linkStyle}>
                <Button
                  mode="contained"
                  labelStyle={styles.buttonLabelStyle}
                  style={[styles.button, { backgroundColor: "#003366" }]}
                >
                  <Text style={styles.linkText}>AI Chatbot</Text>
                </Button>
              </Link>
            </Card.Actions>
          </Card>
          <Card style={styles.imageContainer}>
            <Card.Cover
              source={require("../assets/coinbaseLogo.png")} // replace with picture of stock exchange page
              style={styles.image}
            />
            <Card.Actions>
              <Link href="/fourthPage" style={styles.linkStyle}>
                <Button
                  mode="contained"
                  labelStyle={styles.buttonLabelStyle}
                  style={[styles.button, { backgroundColor: "#003366" }]}
                >
                  <Text style={styles.linkText}>Stock Watch</Text>
                </Button>
              </Link>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
      <MapView style={styles.map} />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Helvetica Neue",
  },
  introParagraph: {
    fontSize: 14,
    fontFamily: "Helvetica Neue",
  },
  descriptionTagline: {
    fontSize: 20,
    textAlign: "left",
    paddingHorizontal: 10,
    marginTop: 30,
    fontFamily: "Helvetica Neue",
  },
  descriptionTagline2: {
    fontSize: 20,
    textAlign: "left",
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 20,
    fontFamily: "Helvetica Neue",
  },
  descriptionTagline3: {
    fontSize: 20,
    textAlign: "left",
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 20,
    fontFamily: "Helvetica Neue",
  },
  descriptionBox: {
    paddingHorizontal: 0,
    marginTop: 20,
    marginHorizontal: 10,
  },
  logosCard: {
    marginHorizontal: 10,
  },
  appInfo: {
    fontSize: 12,
  },
  companyLogo: {
    width: windowWidth * 0.13,
    height: 100, // Make this smaller if the logos are still too big
    resizeMode: "contain", // Ensures the logo fits within the dimensions without distorting
    marginHorizontal: windowWidth * 0.1, // Centers the logo in the view if it's smaller than the screen width: {
  },
  carousel: {
    marginTop: 10,
    height: 100, // Set the height you want for the logos carousel
    width: windowWidth,
  },
  imagesWithSubtitlesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    width: windowWidth * 0.45, // Set a fixed width for both cards
    height: 200, // Set a fixed height for both cards
    // You can add margin or padding if needed for spacing
    marginVertical: 10, // Adds vertical space around the cards
  },
  cardSpacing1: {
    marginRight: 15,
  },
  cardSpacing2: {
    marginRight: 15,
  },
  button: {
    width: 150,
    height: 40,
    marginRight: 20,
  },
  image: {
    width: "100%", // The image container width
    height: 150, // Adjust the height as necessary
    resizeMode: "contain", // To fit the image within the given dimensions
  },
  linkText: {
    fontSize: 14, // Adjust the font size as necessary
    marginTop: 8, // Space between image and subtitle
    color: "white",
    fontFamily: "Helvetica Neue",
  },
  linkStyle: {
    flex: 1, // Take up the full width of the container
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
  },
  // Add styles for the rest of your components
});
