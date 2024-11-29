import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import env from "dotenv";

const app = express();
env.config();
const port = process.env.APP_PORT;
const tempParam = "temperature_2m_max";
const snowParam = "snowfall_sum";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

let hills = [];

app.get("/", async (req, res) => {
  try {
    const allRecords = await db.query("SELECT * FROM hills");
    //console.log(allRecords.rows);
    hills = allRecords.rows;
    res.render("index.ejs", {
      hills: hills,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/hill/:id", async (req, res) => {
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
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
