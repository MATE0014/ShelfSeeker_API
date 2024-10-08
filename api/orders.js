import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

// Initialize the app
const app = express();

// Middleware
/*
app.use(
  cors({
    origin: "https://shelfseeker.vercel.app",
    methods: "GET,POST,OPTIONS",
  })
);
app.use(bodyParser.json());
*/
// Connect to MongoDB
const dbURI = process.env.DATABASE_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema and model for the order data
const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  paymentMode: String,
  cardType: String,
  cardHolderName: String,
  cardNumber: String,
  cardExpiry: String,
  cardCVV: String,
});

const Order = mongoose.model("Order", orderSchema);

// API endpoint to handle order submissions
app.post("/api/orders", async (req, res) => {
  console.log(req.body); // Log the incoming request body
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error); // Log any errors
    res.status(500).json({ message: "Error saving order", error });
  }
});

export default app;
