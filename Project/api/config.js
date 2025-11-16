// import { Platform } from "react-native";

// export const LOCAL_IP = "192.168.50.175"; 
// export const BASE_URL = "https://youthfully-commutable-tula.ngrok-free.dev";


// import { Platform } from "react-native";

// export const BASE_URL =
//   Platform.OS === "android"
//     ? "http://10.0.2.2:5000"
//     : "http://192.168.50.175:5000";


import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "android" && Platform.constants?.Brand !== "Google"
    ? "https://youthfully-commutable-tula.ngrok-free.dev"
    : "http://10.0.2.2:5000";



// import { Platform } from "react-native";

// const LOCAL_PC = "http://10.0.2.2:5000"; // emulator
// const LOCAL_PHONE = "http://192.168.50.175:5000"; // real phone

// export const BASE_URL =
//   Platform.OS === "android" ? LOCAL_PC : LOCAL_PHONE;


// // config.js
//  export const BASE_URL = "https://youthfully-commutable-tula.ngrok-free.dev";
