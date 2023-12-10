import { Dimensions, View, Text, StyleSheet } from "react-native";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");


export default function MessageItem({ role, content }) {
    if (role == 'user') {
        return (
            <View style={styles.sentMessage}>
                <Text style={{ fontSize: 16, color: "#fff", }} >{content}</Text>
                <View style={styles.rightArrow} />
                <View style={styles.rightArrowOverlap} />
            </View>
            
        );
        } else if (role == 'assistant' ){
            return (
            <View style={styles.receivedMessage}>
                <Text style={{ fontSize: 16, color: "#000",justifyContent:"center" }}>{content}</Text>
                <View style={styles.leftArrow} />
                <View style={styles.leftArrowOverlap} />
            </View>
            );
        }
};

const styles = StyleSheet.create({
    rightArrow: {
      position: "absolute",
      backgroundColor: '#ADD8E6',
      //backgroundColor:"red",
      width: 20,
      height: 25,
      bottom: 0,
      borderBottomLeftRadius: 25,
      right: -10
    },
    
    rightArrowOverlap: {
      position: "absolute",
      backgroundColor: "#eeeeee",
      //backgroundColor:"green",
      width: 20,
      height: 35,
      bottom: -6,
      borderBottomLeftRadius: 18,
      right: -19
    
    },
    
    /*Arrow head for recevied messages*/
    leftArrow: {
        position: "absolute",
        backgroundColor: "#dedede",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },
    
    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: "#eeeeee",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20
    
    },
    sentMessage: {
        backgroundColor: '#ADD8E6',
        padding:10,
        //marginLeft: '45%',
        borderRadius: 5,
       
        marginTop: 5,
        marginRight: "5%",
        alignSelf: 'flex-end',
        borderRadius: 20,
        maxWidth: windowWidth * 0.6,
      },
      receivedMessage: {
        backgroundColor: "#dedede",
        padding:10,
        borderRadius: 5,
        marginTop: 5,
        marginLeft: "5%",
        maxWidth: '50%',
        alignSelf: 'flex-start',
        maxWidth: windowWidth * 0.6,
        //padding: 14,
        
        //alignItems:"center",
        borderRadius: 20,
      }
});