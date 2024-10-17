import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m"
    );
    res.render("index.ejs", { forecast: JSON.stringify(result.data) });
  } catch {}
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
