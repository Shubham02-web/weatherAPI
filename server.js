const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(express.json());
const port = process.env.PORT;
const API = process.env.API_KEY;
app.get("/", async function (req, res, next) {
  try {
    const city = req.query.city;
    const uri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
    axios.get(uri).then((response) => {
      const weatherData = response.data;
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const humidity = weatherData.main.humidity;
      const speed = weatherData.wind.speed;

      res.status(200).json({
        success: true,
        message: `weather condition at ${city} is descibed`,
        temp,
        weatherDescription,
        humidity,
        speed,
      });
    });
  } catch (error) {
    console.log(error);
    res.send("error in weather check api");
  }
});

app.listen(port, () => {
  console.log(`app listen on port no ${port}`);
});
