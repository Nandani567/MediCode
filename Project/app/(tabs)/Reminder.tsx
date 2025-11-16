import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../api/config"; // make sure this is correct

interface MedicineType {
  _id: string;
  name: string;
  dose: string;
  time: string;
}

export default function Reminder() {
  const [medicines, setMedicines] = useState<MedicineType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/medicines`);
        setMedicines(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching medicines:", err);
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const renderItem = ({ item }: { item: MedicineType }) => (
    <View style={styles.medicineCard}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>
        Dose: {item.dose} | Time: {item.time}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading medicines...</Text>
      </View>
    );
  }

  if (medicines.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No medicines added yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={medicines}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  medicineCard: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
});
