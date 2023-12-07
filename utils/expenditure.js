import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

const TrackInfo = ({
  list,
  logoUrl = list["logo"],
  expenditure = list["expenditure"],
  date = list["date"].toLocaleDateString(),
  category = list["category"],
  cost = list["cost"],
}) => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.leftmost}>
          <View style={styles.box}>
            {logoUrl ? (
              <Image source={{ uri: logoUrl }} style={styles.image} />
            ) : (
              <Image
                source={require("../assets/cart.png")}
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.comp1}>
            <View style={styles.box}>
              <Text style={styles.txt}>{expenditure}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.txt1}>{category}</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.circle}>
            <Text style={styles.txt3}>{list["percentage"].toFixed(2)}%</Text>
          </View>
        </View>
        <View style={styles.rightmost}>
          <View style={styles.box}>
            <Text style={styles.txtred}>-${cost}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.txt2}>{date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TrackInfo;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "red",
    width: windowWidth * 0.97,
  },
  container: {
    //backgroundColor: "white", //"#090979"
    margin: 7,
    width: windowWidth * 0.9,
    height: windowWidth * 0.15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 10,
    borderColor: "#001861",
    backgroundColor: "#fafaff",
    borderWidth: 1.5,
  },
  leftmost: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comp1: {
    flexDirection: "column",
    alignItems: "left",
  },
  txt: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  txt1: {
    color: "black",
    fontSize: 16,
  },
  txt3: {
    color: "#001860",
    fontSize: 17,
  },
  txt2: {
    color: "black",
    fontSize: 14,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "2%",
  },
  rightmost: {
    flexDirection: "column",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  txtred: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  circle: {
    width: windowWidth * 0.17,
    height: windowWidth * 0.1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
});
