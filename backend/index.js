// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import Medicine from "./models/Medicine.js";
// import axios from "axios";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "10mb" }));

// const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/medicode";
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("Mongo connected successfully"))
//   .catch((err) => console.log("Connection error:", err));

// app.get("/", (req, res) => {
//   res.json({ message: "Backend connected successfully!" });
// });

// app.post("/upload", async (req, res) => {
//   try {
//     const { name, image } = req.body;
//     if (!name || !image)
//       return res.status(400).json({ message: "Name and image required" });

//     // Send image to Python OCR service
//     const ocrRes = await axios.post("http://localhost:8000/ocr", { image });

//     const extractedText = ocrRes.data.text || "";

//     // Save image + OCR text to MongoDB
//     const newMedicine = new Medicine({
//       name,
//       image,
//       prescriptionText: extractedText,
//     });
//     await newMedicine.save();

//     res.status(201).json({ message: "Medicine saved with OCR!", text: extractedText });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.get("/medicines", async (req, res) => {
//   try {
//     const medicines = await Medicine.find();
//     res.json(medicines);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// app.post("/add-medicine", async (req, res) => {
//   try {
//     const { name, dose, time , totalQuantity, dailyDose } = req.body;
//     if (!name || !dose || !time) {
//       return res.status(400).json({ message: "Name, dose, and time are required" });
//     }

//     const newMedicine = new Medicine({ name, dose, time });
//     await newMedicine.save();

//     res.status(201).json({ message: "Medicine saved successfully!", medicine: newMedicine });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Medicine from "./models/Medicine.js";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
}));
app.use(express.json({ limit: "10mb" }));

// --------------------- MONGO CONNECTION ---------------------
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/medicode";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Mongo connected successfully"))
  .catch((err) => console.log("Connection error:", err));

// --------------------- DEFAULT ROUTE -------------------------
app.get("/", (req, res) => {
  res.json({ message: "Backend connected successfully!" });
});

// --------------------- OCR UPLOAD ROUTE ----------------------
app.post("/upload", async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image)
      return res.status(400).json({ message: "Name and image required" });

    const ocrRes = await axios.post("http://localhost:8000/ocr", { image });
    const extractedText = ocrRes.data.text || "";

    const newMedicine = new Medicine({
      name,
      image,
      prescriptionText: extractedText,
    });

    await newMedicine.save();

    res
      .status(201)
      .json({ message: "Medicine saved with OCR!", text: extractedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------- GET ALL MEDICINES ----------------------
app.get("/medicines", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------- ADD MEDICINE (REFILL FEATURE) ---------
app.post("/add-medicine", async (req, res) => {
  try {
    const { name, dose, time, totalQuantity, dailyDose } = req.body;

    // Check required fields
    if (!name || !dose || !time || totalQuantity == null || dailyDose == null) {
      return res.status(400).json({
        message:
          "name, dose, time, totalQuantity and dailyDose are required fields",
      });
    }

    const newMedicine = new Medicine({
      name,
      dose,
      time,
      totalQuantity,
      dailyDose,
    });

    await newMedicine.save();

    res.status(201).json({
      message: "Medicine saved successfully!",
      medicine: newMedicine,
    });
  } catch (err) {
    console.error("Error adding medicine:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------- START SERVER ---------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
