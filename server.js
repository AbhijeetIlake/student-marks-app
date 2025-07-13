const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("."));

app.get("/api/marks/:name", (req, res) => {
  try {
    const students = JSON.parse(fs.readFileSync("database.json"));
    const student = students.find(
      (s) => s.name.toLowerCase() === req.params.name.toLowerCase());

    if (student) {
      res.json({ marks: student.marks });
    } else {
      res.json({ error: "Student not found" });
    }
  } catch (err) {
    console.error("Error reading or parsing the database:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost: 3000");
});
