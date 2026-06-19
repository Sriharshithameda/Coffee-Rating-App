const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Coffee = require("./models/Coffee");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/coffeeDB");

mongoose.connection.once("open", async () => {
  console.log("MongoDB Connected");

  const count = await Coffee.countDocuments();

  if (count === 0) {
    await Coffee.insertMany([
      { name: "Espresso" },
      { name: "Cappuccino" },
      { name: "Latte" },
      { name: "Mocha" }
    ]);
    console.log("Sample coffees added");
  }
});

app.get("/api/coffees", async (req, res) => {
  const coffees = await Coffee.find();
  res.json(coffees);
});

app.post("/api/coffees/:id/vote", async (req, res) => {
  const coffee = await Coffee.findByIdAndUpdate(
    req.params.id,
    { $inc: { votes: 1 } },
    { new: true }
  );

  res.json(coffee);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});