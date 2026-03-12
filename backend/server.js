const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/interest", (req, res) => {
  const { name, email, step } = req.body;

  console.log("User Interest Received:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Step:", step);

  res.json({ message: "Interest received successfully" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});