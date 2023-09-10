const express = require("express");
const connectDB = require("./config/ConnectionDB");
const Utilisateur = require("./model/User");
require("dotenv").config({ path: "./config/.env" });

const app = express();
app.use(express.json());

connectDB();

// API REQUEST

app.post("/add", async (req, res) => {
  const { fullname, email, phone, photo } = req.body;
  try {
    const newuser = await Utilisateur.create({
      fullname,
      email,
      phone,
      photo,
    });
    res.send(newuser);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get", async (req, res) => {
  try {
    const users = await Utilisateur.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    const user = await Utilisateur.findById(req.params.id);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const updateduser = await Utilisateur.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send(updateduser);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/del/:id", async (req, res) => {
  try {
    await Utilisateur.findByIdAndDelete(req.params.id);
    res.send("user is deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

const Port = process.env.Port || 5000;

app.listen(Port, (err) =>
  err ? console.log(err) : console.log(`server is running on Port ${Port}`)
);
