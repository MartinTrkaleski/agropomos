const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AgroPomosh"
  });
});

app.post("/ai-diagnosis", (req, res) => {
  const symptoms = req.body.symptoms || "";
  const text = symptoms.toLowerCase();

  let result = {
    disease: "Unknown Disease",
    confidence: "40%",
    recommendation: "Контактирај агроном за подетална анализа"
  };

  if (text.includes("yellow")) {
    result = {
      disease: "Пламеносување",
      confidence: "88%",
      recommendation: "Користи бакарен фунгицид и избегнувај преголемо наводнување"
    };
  } else if (text.includes("dry")) {
    result = {
      disease: "Сушење на листови",
      confidence: "75%",
      recommendation: "Провери наводнување, почва и изложеност на сонце"
    };
  } else if (text.includes("brown")) {
    result = {
      disease: "Кафени дамки",
      confidence: "82%",
      recommendation: "Отстрани заразени листови и користи фунгицид"
    };
  } else if (text.includes("white")) {
    result = {
      disease: "Пепелница",
      confidence: "86%",
      recommendation: "Користи средство против пепелница и подобри проветрување"
    };
  } else if (text.includes("black")) {
    result = {
      disease: "Црна дамкавост",
      confidence: "80%",
      recommendation: "Отстрани заболени делови и третирај со фунгицид"
    };
  } else if (text.includes("curled") || text.includes("curl")) {
    result = {
      disease: "Виткање на листови",
      confidence: "70%",
      recommendation: "Провери дали има инсекти, лисни вошки или недостаток на вода"
    };
  } else if (text.includes("holes") || text.includes("eaten")) {
    result = {
      disease: "Напад од инсекти",
      confidence: "84%",
      recommendation: "Провери листови од долната страна и користи природен инсектицид"
    };
  } else if (text.includes("wilting") || text.includes("wilt")) {
    result = {
      disease: "Овенување",
      confidence: "78%",
      recommendation: "Провери корен, почва и дали растението добива доволно вода"
    };
  }

  res.json(result);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});