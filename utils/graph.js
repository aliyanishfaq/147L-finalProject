import { LineChart } from "react-native-gifted-charts";
import { View, StyleSheet, Dimensions, ScrollView, Text } from "react-native";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

const colors = ["yellow", "white", "#0BA5A4", "orange"];
// need useEffect to show changes, scale the graph down to 80, and have these dataset for
// inital use when user has no expenses added for style
// current graph structure is terrible- keeps on increasing even if prices go down - check flight
const LineGraph = (lineData) => {
  //
  let datasets = [];
  let result = [];
  if (lineData.lineData.length === 0) {
    datasets = [
      [
        { value: 0, dataPointText: "0" },
        { value: 20, dataPointText: "20" },
        { value: 18, dataPointText: "18" },
        { value: 40, dataPointText: "40" },
        { value: 36, dataPointText: "36" },
        { value: 60, dataPointText: "60" },
        { value: 54, dataPointText: "54" },
        { value: 85, dataPointText: "85" },
      ],
      [
        { value: 0, dataPointText: "0" },
        { value: 20, dataPointText: "20" },
        { value: 18, dataPointText: "18" },
        { value: 40, dataPointText: "40" },
        { value: 36, dataPointText: "36" },
        { value: 60, dataPointText: "60" },
        { value: 54, dataPointText: "54" },
        { value: 85, dataPointText: "85" },
      ],
      [
        { value: 0, dataPointText: "0" },
        { value: 20, dataPointText: "20" },
        { value: 18, dataPointText: "18" },
        { value: 40, dataPointText: "40" },
      ],
    ];
    result = [
      {
        name: "Shopping",
        color: "yellow",
      },
      {
        name: "Subscription",
        color: "white",
      },
      {
        name: "Groceries",
        color: "#0BA5A4",
      },
    ];
  } else {
    const groupedData = {};

    lineData.lineData.forEach((entry) => {
      const { category, cost } = entry;
      const lowercaseCategory = category.toLowerCase();
      if (!groupedData[lowercaseCategory]) {
        groupedData[lowercaseCategory] = [];
      }
      const val = (groupedData[lowercaseCategory].length + 1) * 2;
      groupedData[lowercaseCategory].push({
        value: val,
        dataPointText: cost.toString(),
      });
    });

    result = Object.keys(groupedData).map((category) => ({
      name: category,
      data: groupedData[category],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    console.log(result);
    console.log(JSON.stringify(result, null, 2));

    datasets = [];

    result.forEach((item) => {
      // Check if the item has a 'data' property
      if (item.data) {
        datasets.push(item.data);
      }
    });
    console.log(datasets);
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.graphsContainer}
    >
      {datasets.map((graphData, index) => (
        <View key={index} style={styles.graph}>
          <Text style={[styles.graphName, { color: result[index].color }]}>
            {result[index].name}
          </Text>
          <LineChart
            initialSpacing={-1}
            data={graphData}
            spacing={25}
            textColor1="yellow"
            textShiftY={-8}
            textShiftX={8}
            textFontSize={13}
            thickness={2}
            hideRules
            hideYAxisText
            isAnimated
            yAxisColor="#0BA5A4"
            showVerticalLines
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor="#0BA5A4"
            color={result[index].color} //"#0BA5A4" //{graphData.color}
            height={windowWidth * 0.2}
            width={windowWidth * 0.3}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  graphsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  graph: {
    marginHorizontal: 10,
    backgroundColor: "#1A3461",
    borderWidth: 2,
    borderRadius: 3,
    justifyContent: "space-between",
    width: windowWidth * 0.38,
    paddingRight: 8,
  },
  graphName: {
    //color: "white",
    fontSize: 16,
    marginBottom: 10,
    padding: 6,
  },
});

export default LineGraph;
