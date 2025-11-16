import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import {useRouter} from 'expo-router';


export default function TabLayout() {
  return(
<Tabs>

<Tabs.Screen name="index" options={{title:'Home',headerShown:false,tabBarIcon:({color,size})=>(
  <Ionicons name="home-outline" color={color} size={size}/>
)}}/>


<Tabs.Screen name="medicine" options={{title:'Add Medicine',tabBarIcon:({color,size})=>(
  <Ionicons name="medkit-outline" color={color} size={size}/>
)}}/>


<Tabs.Screen name="camera" options={{
    tabBarIcon: ({ focused }) => (
      <View
        style={{
          width: 75,
          height: 75,
          borderRadius: 35,
          backgroundColor: "#7b2e75ff",
          justifyContent: "center",
          alignItems: "center",
          top: -20, 
          elevation: 6,
          shadowColor: "#0b0a0aff",
          shadowOpacity: 0.3,
          shadowRadius: 5,

        }}
      >
        <Ionicons name="camera-outline" size={34} color="white" />
      </View>
    ),
  }}/>

<Tabs.Screen name="Reminder" options={{title:'Reminder',tabBarIcon:({color,size})=>(
  <Ionicons name="alarm" color={color} size={size}/>
)}}/>




<Tabs.Screen
  name="refill"
  options={{
    title: 'Refill',
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="pricetag-outline" color={color} size={size} />
    )
  }}
/>

</Tabs>
  )
}
