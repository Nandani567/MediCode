
import axios from "axios";
import { BASE_URL } from "../../api/config"
import { Text, View, StyleSheet, Image } from "react-native";
import Voicebtn from '../components/Voicebtn';
import { useEffect, useState } from "react";
export default function Index() {

const [message, setMessage] = useState("Checking backend connection...");

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/`); 
      console.log("✅ Backend connected:", res.data);
      setMessage(res.data.message || "Connected successfully!");
    } catch (err) {
      console.log(" Error connecting to backend:", err.message);
      setMessage(" Failed to connect to backend");
    }
  };
  fetchData();
}, []);



  const Shape = () => {
    return <View style={styles.rectangle}>
      <Image source={require('../../assets/images/medi.png')}
        style={styles.headerImage} />
      <Text style={styles.headerText}>Never Miss a Dose Again</Text>

    </View>
  }
  return (

    <View style={styles.container}>
      <Shape />


      <View>


        <Voicebtn />

      </View>

    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  text: {
    fontFamily: "Cormorant Italic",
    fontSize: 22,
    fontVariant: ["small-caps", "tabular-nums"],
    color: "#333",
  },

  rectangle: {
    width: '100%',
    height: 287,
    backgroundColor: 'rgba(9, 30, 51, 1)',
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  headerImage: {
    width: 122,
    height: 132,
    borderRadius: 123,
    marginTop: 26,
    marginLeft: 198,
    marginBottom: 10,
  },

  headerText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Cormorant Italic',
    textAlign: 'center',
    position: 'absolute',
    top: 120,
    right: 183,
    left: 10

  }



});
