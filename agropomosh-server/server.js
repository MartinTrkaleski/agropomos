const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AgroPomosh backend works 🚀"
  });
});

app.post("/ai-diagnosis", (req, res) => {
  const { symptoms } = req.body;

  let result = {
    disease: "Unknown Disease",
    confidence: "40%",
    recommendation: "Контактирај агроном"
  };

  if (symptoms.toLowerCase().includes("yellow")) {
    result = {
      disease: "Пламеносување",
      confidence: "88%",
      recommendation: "Користи бакарен фунгицид"
    };
  }

  res.json(result);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});