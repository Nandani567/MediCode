// import { Text, View, StyleSheet, TextInput } from "react-native";
// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
// import Button from "../components/Button";
// import { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../api/config"; 

// export default function Medicine() {
//   const [medicineName, setMedicineName] = useState("");
//   const [dosage, setDosage] = useState("");
//   const [time, setTime] = useState("");

//   const handleAdd = async () => {
//     if (!medicineName || !dosage || !time) {
//       alert("Please fill all fields");
//       return;
//     }

//     const newMedicine = {
//       name: medicineName,
//       dose: dosage,
//       time: time,
//     };

//     console.log("Medicine added:", newMedicine);

//     try {
//       const res = await axios.post(`${BASE_URL}/add-medicine`, newMedicine);
//       console.log("Saved to backend:", res.data);
//       alert("Medicine saved successfully!");
//       setMedicineName("");
//       setDosage("");
//       setTime("");
//     } catch (err) {
//       console.error("Error saving medicine:", err.message);
//       alert("Failed to save medicine");
//     }
//   };

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.text}>Add Medicine</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter medicine name"
//           value={medicineName}
//           onChangeText={setMedicineName}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Enter number of doses"
//           value={dosage}
//           onChangeText={setDosage}
//           keyboardType="numeric"
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Enter time (e.g., 08:00)"
//           value={time}
//           onChangeText={setTime}
//         />

//         <View>
//           <Button label="Add Medicine" onPress={handleAdd} />
//         </View>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   text: {
//     fontFamily: "poppins",
//     fontSize: 22,
//     fontVariant: ["small-caps", "tabular-nums"],
//     color: "#333",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     height: 45,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
// });


import { Text, View, StyleSheet, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/config";

export default function Medicine() {
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [dailyDose, setDailyDose] = useState("");

  const handleAdd = async () => {
    if (!medicineName || !dosage || !time || !totalQuantity || !dailyDose) {
      alert("Please fill all fields");
      return;
    }

    const newMedicine = {
      name: medicineName,
      dose: dosage,
      time: time,
      totalQuantity: Number(totalQuantity),
      dailyDose: Number(dailyDose),
    };

    console.log("Medicine added:", newMedicine);

    try {
      const res = await axios.post(`${BASE_URL}/add-medicine`, newMedicine);
      console.log("Saved to backend:", res.data);
      alert("Medicine saved successfully!");

      // clear fields
      setMedicineName("");
      setDosage("");
      setTime("");
      setTotalQuantity("");
      setDailyDose("");
    } catch (err) {
      console.error("Error saving medicine:", err.message);
      alert("Failed to save medicine");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Add Medicine</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter medicine name"
          value={medicineName}
          onChangeText={setMedicineName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter number of doses"
          value={dosage}
          onChangeText={setDosage}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter time (e.g., 08:00)"
          value={time}
          onChangeText={setTime}
        />

        <TextInput
          style={styles.input}
          placeholder="Total pills in strip (e.g., 30)"
          value={totalQuantity}
          onChangeText={setTotalQuantity}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Pills per day (e.g., 2)"
          value={dailyDose}
          onChangeText={setDailyDose}
          keyboardType="numeric"
        />

        <View>
          <Button label="Add Medicine" onPress={handleAdd} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "poppins",
    fontSize: 22,
    fontVariant: ["small-caps", "tabular-nums"],
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
