import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../api/config";

export default function camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to use the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Capture photo
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.7,
        });
        setPhoto(photoData);
        console.log("📸 Captured:", photoData.uri);
      } catch (err) {
        console.error("Capture failed:", err.message);
        Alert.alert("Error", "Failed to capture photo");
      }
    }
  };


const uploadPicture = async () => {
  if (!photo) {
    Alert.alert("No Photo", "Please capture a photo first!");
    return;
  }

  try {
    
    const res = await axios.post(`${BASE_URL}/upload`, {
      name: "Medicine Image",
      image: photo.base64,  
    });

    console.log(" Uploaded successfully:", res.data);
    Alert.alert(
      "Success",
      `Photo saved in MongoDB!\nExtracted Text:\n${res.data.text}`
    );
    setPhoto(null); // optional: reset after upload
  } catch (err) {
    console.error("Upload failed:", err.message);
    Alert.alert("Error", "Failed to upload image");
  }
};


  return (
    <View style={styles.container}>
      {!photo ? (
        <CameraView ref={cameraRef} style={styles.camera} />
      ) : (
        <Image source={{ uri: photo.uri }} style={styles.preview} />
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>📸 Capture</Text>
        </TouchableOpacity>

        {photo && (
          <TouchableOpacity style={styles.button} onPress={uploadPicture}>
            <Text style={styles.buttonText}>⬆️ Upload</Text>
          </TouchableOpacity>
        )}
      </View>

      {photo && (
        <TouchableOpacity
          style={[styles.button, styles.retake]}
          onPress={() => setPhoto(null)}
        >
          <Text style={styles.buttonText}>🔁 Retake</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a1e33",
  },
  camera: {
    width: "90%",
    height: "60%",
    borderRadius: 20,
    overflow: "hidden",
  },
  preview: {
    width: "90%",
    height: "60%",
    borderRadius: 20,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "70%",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  retake: {
    backgroundColor: "#ff6347",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
