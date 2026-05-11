const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Агро Помош серверот работи успешно 🚀"
  });
});

app.post("/ai-diagnosis", (req, res) => {
  const symptoms = req.body.symptoms || "";
  const text = symptoms.toLowerCase();

  if (!text.trim()) {
    return res.status(400).json({
      error: "Внеси симптоми пред да направиш дијагноза."
    });
  }

  let result = {
    disease: "Непозната болест",
    confidence: "40%",
    recommendation: "Контактирај агроном за подетална анализа."
  };

  if (
    text.includes("жолти") ||
    text.includes("жолт") ||
    text.includes("пожолтени") ||
    text.includes("yellow")
  ) {
    result = {
      disease: "Пламеносување",
      confidence: "88%",
      recommendation:
        "Користи бакарен фунгицид, избегнувај преголемо наводнување и отстрани ги заразените листови."
    };
  } else if (
    text.includes("суви") ||
    text.includes("сув") ||
    text.includes("исушени") ||
    text.includes("dry")
  ) {
    result = {
      disease: "Сушење на листови",
      confidence: "75%",
      recommendation:
        "Провери дали растението добива доволно вода, провери ја почвата и избегнувај директно силно сонце."
    };
  } else if (
    text.includes("кафени") ||
    text.includes("кафеави") ||
    text.includes("дамки") ||
    text.includes("точки") ||
    text.includes("brown")
  ) {
    result = {
      disease: "Кафени дамки",
      confidence: "82%",
      recommendation:
        "Отстрани ги заразените листови, намали ја влагата и користи соодветен фунгицид."
    };
  } else if (
    text.includes("бели") ||
    text.includes("бела") ||
    text.includes("прашина") ||
    text.includes("наслаги") ||
    text.includes("white")
  ) {
    result = {
      disease: "Пепелница",
      confidence: "86%",
      recommendation:
        "Користи средство против пепелница, подобри го проветрувањето и избегнувај мокрење на листовите."
    };
  } else if (
    text.includes("црни") ||
    text.includes("црна") ||
    text.includes("black")
  ) {
    result = {
      disease: "Црна дамкавост",
      confidence: "80%",
      recommendation:
        "Отстрани ги заболeните делови, не ги мокри листовите и третирај со фунгицид."
    };
  } else if (
    text.includes("свиткани") ||
    text.includes("виткање") ||
    text.includes("искривени") ||
    text.includes("curled") ||
    text.includes("curl")
  ) {
    result = {
      disease: "Виткање на листови",
      confidence: "70%",
      recommendation:
        "Провери дали има лисни вошки или други инсекти, провери ја влажноста и состојбата на почвата."
    };
  } else if (
    text.includes("дупки") ||
    text.includes("изгризани") ||
    text.includes("инсекти") ||
    text.includes("holes") ||
    text.includes("eaten")
  ) {
    result = {
      disease: "Напад од инсекти",
      confidence: "84%",
      recommendation:
        "Провери ја долната страна на листовите и користи природен или соодветен инсектицид."
    };
  } else if (
    text.includes("овенато") ||
    text.includes("овенување") ||
    text.includes("венее") ||
    text.includes("wilting") ||
    text.includes("wilt")
  ) {
    result = {
      disease: "Овенување",
      confidence: "78%",
      recommendation:
        "Провери го коренот, влажноста на почвата и дали растението добива доволно вода."
    };
  } else if (
    text.includes("гниење") ||
    text.includes("гние") ||
    text.includes("мириса") ||
    text.includes("root rot")
  ) {
    result = {
      disease: "Гниење на корен",
      confidence: "81%",
      recommendation:
        "Намали го наводнувањето, провери дали саксијата има дренажа и отстрани ги оштетените корени."
    };
  }

  res.json(result);
});

app.listen(5000, () => {
  console.log("Агро Помош серверот работи на порта 5000");
});