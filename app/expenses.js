import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";
import { autocompleteExpenditure } from "./clearbit.js";

export default function App() {
  const [items, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalCost, setCost] = useState(0);
  const [color, setColor] = useState("green");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [suggestions, setSuggestions] = useState([]);
  const [newRow, setNewRow] = useState({
    date: new Date(),
    expenditure: "",
    category: "",
    cost: "",
    percentage: "",
    logo: "",
  });

  useEffect(() => {
    // Load items from AsyncStorage when the component mounts
    loadItemsFromStorage();
  }, []);

  const loadItemsFromStorage = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("expenseItems");
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        setTableData(
          parsedItems.map((item) => ({ ...item, date: new Date(item.date) }))
        );
        calculateTotalCost(parsedItems);
      }
    } catch (error) {
      console.error("Error loading items from AsyncStorage:", error);
    }
  };

  const saveItemsToStorage = async (updatedItems) => {
    try {
      await AsyncStorage.setItem("expenseItems", JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error saving items to AsyncStorage:", error);
    }
  };
  const calculateTotalCost = (data) => {
    const calculatedTotalCost = data.reduce(
      (acc, item) => acc + parseFloat(item.cost),
      0
    );
    setCost(calculatedTotalCost);
  };

  const addRow = () => {
    setModalVisible(true);
  };

  const deleteAll = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete all your expense?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            // Clear AsyncStorage data
            try {
              await AsyncStorage.removeItem("expenseItems");
            } catch (error) {
              console.error("Error clearing AsyncStorage:", error);
            }
            setTableData([]);
            setCost(0);
            setColor("green");
          },
        },
      ]
    );
  };

  const deleteRow = (index) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            // Get the cost of the row to be deleted
            const deletedRowCost = parseFloat(items[index].cost);

            // Update the total cost
            setCost((prevTotalCost) => prevTotalCost - deletedRowCost);

            // Remove the row at the specified index
            const updatedItems = [...items];
            updatedItems.splice(index, 1);

            // Update the state to trigger a re-render
            setTableData(updatedItems);

            // Recalculate the color
            if (totalCost > 0) {
              const redValue = Math.min(
                100,
                Math.round((totalCost / 100) * 100)
              );
              setColor(`rgb(${255}, 0, ${100 - redValue})`);
            } else {
              setColor("green");
            }
            if (items.length === 1) {
              setColor("green");
            }
            console.log(items, color, totalCost);
            try {
              const storedItems = await AsyncStorage.getItem("expenseItems");
              const parsedItems = JSON.parse(storedItems);
              parsedItems.splice(index, 1);

              // Clear AsyncStorage
              await AsyncStorage.removeItem("expenseItems");
              await AsyncStorage.setItem(
                "expenseItems",
                JSON.stringify(parsedItems)
              );
            } catch (error) {
              console.error(
                "Error deleting row and updating AsyncStorage:",
                error
              );
              saveItemsToStorage(items);
            }
          },
        },
      ]
    );
  };

  const saveRow = () => {
    const newRowCost = newRow.cost ? parseFloat(newRow.cost) : 0;
    setCost((prevTotalCost) => prevTotalCost + newRowCost);

    const updatedItems = [
      ...items,
      {
        ...newRow,
        date: newRow.date,
        cost: newRowCost,
        percentage:
          totalCost > 0 ? parseFloat((newRowCost / totalCost) * 100) : 0,
        logo: newRow.logo,
      },
    ];
    if (totalCost > 0) {
      const redValue = Math.min(100, Math.round((totalCost / 100) * 100)); // Convert to RGB
      setColor(`rgb(${255}, 0, ${100 - redValue})`);
    } else {
      setColor("green");
    }

    // calculate the percentage and add manually to the data ( val/total - smart way to do it)
    setTableData(updatedItems);
    calculateTotalCost(updatedItems);

    // Save items to AsyncStorage
    saveItemsToStorage(updatedItems);

    setNewRow({
      date: new Date(),
      expenditure: "",
      category: "",
      cost: "",
      percentage: "",
      logo: "",
    });
    setModalVisible(false);
    console.log(items);
    console.log(items);
  };

  useEffect(() => {
    if (totalCost > 0) {
      setTableData((prevData) =>
        prevData.map((row) => ({
          ...row,
          percentage: parseFloat((row.cost / totalCost) * 100),
        }))
      );
    }
    // Additional effects can be added here if needed
  }, [totalCost]);

  const closeRowModal = () => {
    setModalVisible(false);
    setNewRow({
      date: "",
      expenditure: "",
      category: "",
      cost: "",
      percentage: "",
      logo: "",
    });
  };

  // next step - try and catch date obtaining errors and alert the user to select
  // or fill other parts of the form
  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const formattedDate = selectedDate || newRow.date;
      setDate(formattedDate);
      setNewRow({ ...newRow, date: formattedDate });
      setShowDatePicker(false);
    }
  };
  const dateSelect = () => {
    setShowDatePicker(true);
  };
  const CheckNumType = (text) => {
    if (/^[0-9.]*$/.test(text)) {
      console.log(text);
      setNewRow({ ...newRow, cost: text });
    } else {
      Alert.alert("Error", "Please enter numbers only.");
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <View style={[styles.expense, { backgroundColor: color }]}>
            <Text style={styles.number}>${totalCost.toFixed(2)}</Text>
          </View>
          <View style={styles.head}>
            <TouchableOpacity style={styles.addRowButton} onPress={addRow}>
              <Text style={styles.addRowButtonText}>Add new expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearAllButton} onPress={deleteAll}>
              <Text style={styles.addRowButtonText}>Clear all expenses</Text>
            </TouchableOpacity>
          </View>
        </View>

        <DataTable style={styles.dataTable}>
          <DataTable.Header style={styles.header}>
            <DataTable.Title style={styles.headerTitle}>Remove</DataTable.Title>
            <DataTable.Title style={styles.headerTitle}>Date</DataTable.Title>
            <DataTable.Title style={styles.headerTitle}>Logo</DataTable.Title>
            <DataTable.Title style={styles.headerTitle}>
              Expenditure
            </DataTable.Title>
            <DataTable.Title style={styles.headerTitle}>
              Category
            </DataTable.Title>
            <DataTable.Title numeric style={styles.headerTitleNumeric}>
              Cost
            </DataTable.Title>
            <DataTable.Title numeric style={styles.headerTitleNumeric}>
              Percentage
            </DataTable.Title>
          </DataTable.Header>

          {items.map((item, index) => (
            <DataTable.Row key={index} style={styles.dataRow}>
              <DataTable.Cell style={styles.cell}>
                <TouchableOpacity onPress={() => deleteRow(index)}>
                  <Feather name="square" size={24} color="#0078fe" />
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {item.date.toLocaleDateString()}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {item.logo ? (
                  <Image source={{ uri: item.logo }} style={styles.logo} />
                ) : (
                  <Image
                    source={require("../assets/cart.png")}
                    style={styles.logo}
                  />
                )}
                {/* <Image source={{ uri: item.logo }} style={styles.logo} /> */}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {item.expenditure}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {item.category}
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.cellNumeric}>
                {item.cost}
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.cellNumeric}>
                {item.percentage}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <Modal isVisible={modalVisible} onBackdropPress={closeRowModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Let's add your new expense</Text>
            <TouchableOpacity onPress={dateSelect}>
              <View style={styles.input}>
                <Text style={styles.inputText}>
                  {newRow.date
                    ? newRow.date.toLocaleDateString()
                    : "Select Date"}
                </Text>
              </View>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="spinner" // or 'spinner' or 'calendar'
                onChange={handleDateChange}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Expenditure"
              value={newRow.expenditure}
              onChangeText={async (text) => {
                setNewRow({ ...newRow, expenditure: text });
                const suggestion = await autocompleteExpenditure(text);
                setSuggestions(suggestion);
                // Handle suggestions, e.g., show them in a dropdown
                console.log(suggestions);
              }}
            />
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.domain}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setNewRow({
                      ...newRow,
                      logo: item.logo,
                      expenditure: item.name,
                    });
                    setSuggestions([]);
                  }}
                >
                  <View style={styles.autocompleteItem}>
                    <Image source={{ uri: item.logo }} style={styles.logo} />
                    <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newRow.category}
              onChangeText={(text) => setNewRow({ ...newRow, category: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Cost (Enter numbers only)"
              value={newRow.cost}
              onChangeText={CheckNumType}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.modalButton} onPress={saveRow}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeRowModal}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <StatusBar style="auto" />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2%",
  },
  addRowButton: {
    marginTop: 10,
    backgroundColor: "#0078fe",
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  addRowButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  clearAllButton: {
    marginTop: 10,
    backgroundColor: "#0078fe",
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  expense: {
    width: "100%",
    height: 50, // Adjust the height as needed
    borderRadius: 10, // Adjust the border radius to make it rounded
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  dataTable: {
    margin: 10,
  },
  header: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
  },
  dataRow: {
    backgroundColor: "#f0f0f0",
  },
  cell: {
    // Adjust alignment and padding for text cells
    textAlign: "left",
    paddingLeft: 2,
    flex: 1, // Equal flex for each cell to distribute space evenly
    justifyContent: "left", // Center content vertically
  },
  cellNumeric: {
    // Adjust alignment and padding for numeric cells
    textAlign: "left",
    paddingRight: 2,
    flex: 1,
    justifyContent: "center",
    textAlign: "right",
  },
  headerTitle: {
    flex: 1,
    justifyContent: "left",
    alignItems: "center", // Center content horizontally
    width: 80,
  },
  headerTitleNumeric: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end", // Align numeric headers to the end
    width: 100,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },

  modalTitle: {
    fontSize: 20,
    marginBottom: 12,
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: "100%",
  },

  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 4,
  },

  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontSize: 16,
    color: "black",
  },

  number: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  head: {
    justifyContent: "space-between",
    flexDirection: "row",
    //width: "100%",
    padding: 10,
  },
  autocompleteItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
});
