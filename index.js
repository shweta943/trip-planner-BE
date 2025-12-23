const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

// const geminiRoutes = require('./routes/geminiAPI');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Trip Planner Backend is running");
});

// app.use('/api/gemini', geminiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});