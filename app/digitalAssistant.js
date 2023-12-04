/*
Citation: 
GPT API: https://medium.com/@vibinreji123/integrating-chatgpt-3-5-into-your-react-native-application-a5a6f691b061
imessage bubble styling: https://www.freecodecamp.org/news/design-imessage-like-chat-bubble-react-native/
*/



import { StatusBar } from "expo-status-bar";
import React, { useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect } from "react";
import axios from 'axios';

import MapView from "react-native-maps";
const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
import { KeyboardAvoidingView, Platform, FlatList, Pressable, Image } from 'react-native';
import MessageItem from '../utils/MessageItem';

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';


export default function App() {
  const [text, setText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sentMessages, setSentMessages] = useState([{
    'role': 'system',
    'content': `You are PennyPal, a digital financial advisor dedicated to empowering individuals and small businesses to achieve financial wellness.
     Your expertise lies in providing personalized advice to help users reduce their debt and enhance their net cash flow.
      When responding to queries, focus on delivering actionable strategies and practical tips tailored to the user's unique financial situation.
       Conclude each interaction by encouraging users to utilize the PennyPal app for effective expense tracking and to make well-informed financial decisions.
        Highlight the app's ability to assist in their journey towards financial stability.
         Emphasize that PennyPal is always here to help and that users are welcome to return with more questions to further their financial health.
         STRICTLY STICK TO FINANCIAL ADVICE and BE RESPECTFUL`
  },
  {
    'role': 'assistant',
    'content': `👋 Welcome to PennyPal - your personal digital financial advisor! I\'m here to help you navigate your finances, find ways to reduce debt, and increase your savings. Let\'s get your financial well-being on track. To start, tell me about your financial goals or ask me a question about managing your finances. And remember, you can always use the PennyPal app to monitor your expenses and make informed decisions. Let\'s achieve financial success together`
  }])
  
  const fetchChatGPTResponse = async () => {
    console.log('This is the prompt: ', sentMessages);
    try {
      const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
        { 
          model: 'gpt-3.5-turbo',
          messages: [...sentMessages, {  'role': 'user', 'content': text }],
        },
        {
          headers: {
            'Authorization': `Bearer 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`,
          }
        }
      );
    console.log('THIS WAS USER MESSAGE!!!!', text);
    // not sure why this works?
    setSentMessages(prevMessages => [
      ...prevMessages, { 'role': 'assistant', 'content': response.data.choices[0].message.content }
    ]);
    return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
    }
    return 'failed to generate a response';
  };


  const generateText = async () => {
    setSentMessages(prevMessages => [
      ...prevMessages,
      { 'role': 'user', 'content': text }]);
    setText('');
    setIsLoading(true);
    const response = await fetchChatGPTResponse();
    setResponseText(response);
    setIsLoading(false);
  };
  const renderMessageItem = ({ item }) => (
    <MessageItem
      role={item.role}
      content={item.content}
    />
  );
  const clearChat = () => {
    setSentMessages([{
      'role': 'system',
      'content': `You are PennyPal, a digital financial advisor dedicated to empowering individuals and small businesses to achieve financial wellness.
      Your expertise lies in providing personalized advice to help users reduce their debt and enhance their net cash flow.
       When responding to queries, focus on delivering actionable strategies and practical tips tailored to the user's unique financial situation.
        Conclude each interaction by encouraging users to utilize the PennyPal app for effective expense tracking and to make well-informed financial decisions.
         Highlight the app's ability to assist in their journey towards financial stability.
          Emphasize that PennyPal is always here to help and that users are welcome to return with more questions to further their financial health.
          STRICTLY STICK TO FINANCIAL ADVICE and BE RESPECTFUL`
    },
  {
    'role': 'assistant',
    'content': `👋 Welcome to PennyPal - your personal digital financial advisor! 
    I\'m here to help you navigate your finances, find ways to reduce debt, and increase your savings. 
    Let\'s get your financial well-being on track. To start, tell me about your financial goals or ask me a question about managing your finances. 
    And remember, you can always use the PennyPal app to monitor your expenses and make informed decisions. 
    Let\'s achieve financial success together`
  }]);
  };
  const flatListRef = useRef();
  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };
  function SendButton({disabled}) {
    if (disabled) {
      return (
        <Image source={require('../assets/LoadingArrow.png')} style={{aspectRatio: 1, height: windowHeight * 0.034, borderRadius: '50%'}}/>
      );
    } else {
      return (
        <Image source={require('../assets/blue-arrow.png')} style={{aspectRatio: 1, height: windowHeight * 0.034, borderRadius: '50%'}}/>
      )
    }
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <FlatList
            ref={flatListRef}
            data={sentMessages} // the array of data that the FlatList displays
            renderItem={(item) => renderMessageItem(item)} // function that renders each item
            keyExtractor={(item) => item.content } // unique key for each item
            style={styles.messagesContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
            scrollToEnd={{animated: true}}
            onContentSizeChange={scrollToBottom}
        />
      </View>
      <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"} // to not hide text input below keyboard in ios and android
    keyboardVerticalOffset={Platform.OS === "ios" ? windowHeight * 0.12 : 0}
  >
      <View style={styles.question}>
      <Pressable hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} style={styles.click} disabled={isLoading} onPress={() => clearChat()}>
          <Image source={require('../assets/reload.png')} style={{aspectRatio: 1, height: windowHeight * 0.034, borderRadius: '50%'}}/>
        </Pressable>
        <AutoGrowingTextInput value={text} style={styles.textInput} placeholder={'Ask PennyPal...'} onChangeText={text => {
              setText(text);
          }}/>
          <Pressable hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} disabled={isLoading} onPress={() => generateText()}>
            <Image source={require('../assets/blue-arrow.png')} style={{aspectRatio: 1, height: windowHeight * 0.034, borderRadius: '50%'}}/>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <MapView style={styles.map} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
// remove borders
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    gap: windowHeight * 0.005,
    borderWidth: 4,
    borderColor: 'transparent',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    gap: windowHeight * 0.005,
    borderWidth: 4,
    borderColor: 'transparent',
  },
  arrow: {
    height: 50,
  },
  question: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'left',
    alignItems: 'center',
    width: windowWidth * 0.95,
    borderWidth: 4,
    borderColor: 'transparent',
    gap: windowWidth * 0.015

  },
  messagesContainer: {
    borderWidth: 4,
    borderColor: 'transparent',
    width: windowWidth * 0.95,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#5A5A5A',
    width: windowWidth * 0.75,
    borderRadius: 20,
    padding: 5,

  },

});
