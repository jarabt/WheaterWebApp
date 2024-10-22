import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const hills = [
  {
    id: 1,
    name: "Sněžka",
    height: 1603,
    mountain: "Krkonoše",
    latitude: 50.736111,
    longitude: 15.739722,
  },
  {
    id: 2,
    name: "Praděd",
    height: 1491,
    mountain: "Hrubý Jeseník",
    latitude: 50.083056,
    longitude: 17.230833,
  },
  {
    id: 3,
    name: "Lysá hora",
    height: 1324,
    mountain: "Moravskoslezské Beskydy",
    latitude: 49.546111,
    longitude: 18.447222,
  },
  {
    id: 4,
    name: "Klínovec",
    height: 1244,
    mountain: "Krušné hory",
    latitude: 50.396389,
    longitude: 12.967778,
  },
  {
    id: 5,
    name: "Kralický Sněžník",
    height: 1423,
    mountain: "Kralický Sněžník",
    latitude: 50.2075,
    longitude: 16.8475,
  },
];

const tempParam = "temperature_2m_max";
const snowParam = "snowfall_sum";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    hills: hills,
  });
});

app.get("/:id", async (req, res) => {
  try {
    const chosenHill = hills.find(
      (hill) => hill.id === parseInt(req.params.id)
    );
    const result = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: chosenHill.latitude,
        longitude: chosenHill.longitude,
        daily: tempParam + "," + snowParam,
        timezone: "CET",
      },
    });
    const hillData = {
      name: chosenHill.name,
      mountain: chosenHill.mountain,
      height: chosenHill.height,
      time: result.data.daily.time,
      temp: result.data.daily[tempParam],
      snow: result.data.daily[snowParam],
    };
    res.render("index.ejs", {
      hills: hills,
      hill: hillData,
    });
    console.log(new Date(result.data.daily.time[0]).toDateString());
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
