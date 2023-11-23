const express = require("express");
const mongodb = require("mongodb");

const app = express();
const port = 3000; // You can choose any port
const mongoUrl = process.env.MONGO_URL; // MongoDB URL from environment variable

// MongoDB connection
let db;
mongodb.MongoClient.connect(
  mongoUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.error("Error connecting to MongoDB", err);
      process.exit(1);
    }
    db = client.db();
    console.log("Connected to MongoDB");
  }
);

// Endpoint to get data from 'section' collection
app.get("/sections", async (req, res) => {
  if (!db) {
    return res.status(500).send("MongoDB not connected");
  }
  try {
    const results = await db.collection("section").find({}).toArray();
    res.json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
