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
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { autocompleteExpenditure } from "../utils/clearbit.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons.js";
import LineGraph from "../utils/graph.js";
import TrackInfo from "../utils/expenditure.js";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function App() {
  const [items, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalCost, setCost] = useState(0);
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
    // Load items from AsyncStorage when screen mounts
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
            //Clear AsyncStorage data
            try {
              await AsyncStorage.removeItem("expenseItems");
            } catch (error) {
              console.error("Error clearing AsyncStorage:", error);
            }
            setTableData([]);
            setCost(0);
          },
        },
      ]
    );
  };

  const deleteRow = async (index) => {
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
            const deletedRowCost = parseFloat(items[index].cost);
            setCost((prevTotalCost) => prevTotalCost - deletedRowCost);
            const updatedItems = [...items];
            updatedItems.splice(index, 1);
            setTableData(updatedItems);
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
    if (newRow.date === "") {
      Alert.alert("Error", "Please select a valid date.");
      return;
    }
    if (newRow.expenditure === "") {
      Alert.alert("Error", "Please enter an expenditure.");
      return;
    }
    if (newRow.cost === "" || newRow.cost == 0) {
      Alert.alert("Error", "Please enter a valid cost.");
      return;
    }
    if (newRow.category === "") {
      Alert.alert("Error", "Please enter a category.");
      return;
    }
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

    //calculate the percentage and add manually to the data ( val/total - smart way to do it)
    setTableData(updatedItems);
    calculateTotalCost(updatedItems);

    //Save items to AsyncStorage
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
      setNewRow({ ...newRow, cost: text });
    } else {
      Alert.alert("Error", "Please enter numbers only.");
    }
  };

  const renderExpenses = (item) => {
    return (
      <TouchableOpacity onLongPress={() => deleteRow(item.index)}>
        <TrackInfo list={item.item} />
      </TouchableOpacity>
    );
  };

  const delGuide = () => {
    Alert.alert("Insight: Long press a transaction to delete it!");
    [
      {
        text: "Got it!",
        style: "cancel",
      },
    ];
  };

  const contentDisplayed = (items) => {
    if (items.length === 0) {
      return (
        <View style={styles.contain}>
          <TouchableOpacity onPress={addRow}>
            <Text style={styles.temptxt}>Click to Add an expense</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            data={items}
            renderItem={renderExpenses}
            keyExtractor={(item) => item.expenditure}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Expenses</Text>
        </View>
        <View style={styles.headerIcons}>
          <View>
            <TouchableOpacity onPress={addRow}>
              <MaterialIcons name="addchart" size={40} color="#001861" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={deleteAll}>
              <MaterialIcons name="clear-all" size={40} color="#001861" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.expensecontainer}>
        <View style={styles.expensebody}>
          <Text style={styles.expense}>${totalCost.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.graphs}>
        <LineGraph lineData={items} />
      </View>
      <View style={styles.transactbox}>
        <View>
          <Text style={styles.transaction}> Transactions </Text>
        </View>
        <View>
          <TouchableOpacity onPress={delGuide}>
            <MaterialIcons name="insights" size={40} color="purple" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {contentDisplayed(items)}
      </ScrollView>

      <Modal isVisible={modalVisible} onBackdropPress={closeRowModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Let's add your new expense!</Text>
          <TouchableOpacity onPress={dateSelect}>
            <View style={styles.input}>
              <Text style={styles.inputText}>
                {newRow.date ? newRow.date.toLocaleDateString() : "Select Date"}
              </Text>
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="calendar" // or 'spinner' or 'calendar'
              onChange={handleDateChange}
            />
          )}
          <TextInput
            style={styles.input1}
            placeholder="Expenditure"
            placeholderTextColor="#ec4899"
            value={newRow.expenditure}
            onChangeText={async (text) => {
              setNewRow({ ...newRow, expenditure: text });
              const suggestion = await autocompleteExpenditure(text);
              setSuggestions(suggestion);
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
            style={styles.input2}
            color="green"
            placeholder="Cost (Enter numbers only)"
            placeholderTextColor="green"
            value={newRow.cost}
            onChangeText={CheckNumType}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input1}
            color="#f05e16"
            placeholder="Category"
            placeholderTextColor="#f05e16"
            value={newRow.category}
            onChangeText={(text) => setNewRow({ ...newRow, category: text })}
          />

          <View style={styles.end}>
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
        </View>
      </Modal>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    width: windowWidth * 0.9,
    flexDirection: "row",
    margin: "5%",
  },
  headerText: {
    //fontFamily: "Montserrat-Bold", // Replace with the name of your imported font
    fontSize: 32,
    color: "black",
    fontWeight: "bold",
  },
  headerIcons: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: windowWidth * 0.23,
  },
  expensebody: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.18,
    backgroundColor: "#001861",
    borderRadius: 15,
    alignItems: "center",
  },
  expensecontainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  expense: {
    padding: 15,
    fontSize: 32,
    color: "white",
  },
  graphs: {
    margin: 3,
    width: windowWidth * 0.9,
    height: windowWidth * 0.5,
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

  dataTable: {
    margin: 10,
  },

  dataRow: {
    backgroundColor: "#f0f0f0",
  },

  modalContent: {
    backgroundColor: "#e0d6ff",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "green",
    borderWidth: 1.5,
  },

  modalTitle: {
    fontSize: 20,
    marginBottom: 12,
    color: "brown",
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: "100%",
    borderRadius: 12,
    color: "#ec4899",
  },
  input1: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: "100%",
    borderRadius: 12,
    borderColor: "purple", //"#090979"
    color: "#ec4899",
  },
  input2: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: "100%",
    borderRadius: 12,
    borderColor: "#090979",
    color: "#ec4899",
  },

  modalButton: {
    backgroundColor: "#0F52BA", //#5F9EA0", //"#001861",
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 10,
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
    borderRadius: 30,
  },
  inputText: {
    fontSize: 16,
    color: "#001861",
  },

  autocompleteItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "purple",
    borderWidth: 2,
    borderRadius: 8,
    margin: 2,
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  graphs: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.4,
    paddingBottom: 12,
    borderWidth: 3,
    borderColor: "#001861",
    margin: "3%",
    borderRadius: 6,
    paddingTop: 10,
  },
  transactbox: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 4,
    width: windowWidth * 0.9,
    height: windowWidth * 0.1,
  },
  transaction: {
    fontSize: 18,
    fontWeight: "bold",
    color: "purple",
  },
  end: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: windowWidth * 0.4,
  },
  temptxt: {
    fontSize: 18,
    color: "white",
  },
  contain: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: "#001861",
    padding: 5,
  },
});
