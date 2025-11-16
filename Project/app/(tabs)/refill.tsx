import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/config";

interface MedicineType {
  _id: string;
  name: string;
  totalQuantity: number;
  dailyDose: number;
}

export default function RefillTab() {
  const [medicines, setMedicines] = useState<MedicineType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/medicines`);
      setMedicines(res.data);
    } catch (error) {
      console.log("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const renderMedicine = ({ item }: { item: MedicineType }) => {
    const daysLeft = Math.floor(item.totalQuantity / item.dailyDose);
    const isLow = daysLeft <= 7;

    return (
      <View style={[styles.card, isLow && styles.lowCard]}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.text}>Pills Left: <Text style={styles.bold}>{item.totalQuantity}</Text></Text>
        <Text style={styles.text}>Days Left: <Text style={styles.bold}>{daysLeft}</Text></Text>

        {isLow && <Text style={styles.alert}>⚠️ Refill Needed</Text>}
      </View>
    );
  };

  if (loading) return <Text style={{ marginTop: 50, textAlign: "center" }}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Refill Medicines</Text>

      <FlatList
        data={medicines}
        renderItem={renderMedicine}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7", paddingTop: 40 },
  heading: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 10 },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
  },
  lowCard: { borderColor: "#e63946", borderWidth: 2 },
  name: { fontSize: 18, fontWeight: "700", marginBottom: 5 },
  text: { fontSize: 15, marginVertical: 2 },
  bold: { fontWeight: "700" },
  alert: { marginTop: 8, color: "#e63946", fontWeight: "700", fontSize: 16 },
});





