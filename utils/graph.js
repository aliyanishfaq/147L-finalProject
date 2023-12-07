import { LineChart } from "react-native-gifted-charts";
import { View, StyleSheet, Dimensions } from "react-native";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

const LineGraph = (lineDat) => {
  const lineData = [
    { value: 0, dataPointText: "0" },
    { value: 20, dataPointText: "20" },
    { value: 18, dataPointText: "18" },
    { value: 40, dataPointText: "40" },
    { value: 36, dataPointText: "36" },
    { value: 60, dataPointText: "60" },
    { value: 54, dataPointText: "54" },
    { value: 85, dataPointText: "85" },
  ];
  return (
    <View style={styles.graphs}>
      <LineChart
        initialSpacing={0}
        data={lineData}
        spacing={30}
        textColor1="yellow"
        textShiftY={-8}
        textShiftX={-10}
        textFontSize={13}
        thickness={3}
        hideRules
        hideYAxisText
        yAxisColor="#0BA5A4"
        showVerticalLines
        verticalLinesColor="rgba(14,164,164,0.5)"
        xAxisColor="#0BA5A4"
        color="#0BA5A4"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  graphs: {
    width: windowWidth * 0.89,
    height: windowWidth * 0.4,
    backgroundColor: "#1A3461",
  },
});

export default LineGraph;
