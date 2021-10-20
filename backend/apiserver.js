const express = require("express");
const axios = require("axios");
const { apiKey } = require("./config");
const port = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.post("/weather/cityName", async (req, res) => {
  console.log(req.body.cityName);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&units=metric&appid=${apiKey}`;

  try {
    const request = await axios.get(apiUrl);
    const weather = request.data;
    // console.log(request.data);
    res.status(200).send({ message: "hava durumu getirildi.", weather });
  } catch (error) {
    console.log(
      "error",
      error.response ? error.response.data.message : "Bir hata oluştu"
    );
    res
      .status(404)
      .send(error.response ? error.response.data.message : "Şehir Bulunamadı.");
  }
});

app.post("/weather/refresh", async (req, res) => {
  const cityIds = req.body.cityIds;
  // console.log(req.body.cityIds);
  const apiUrl = `https://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);

  try {
    const request = await axios.get(apiUrl);
    const weather = request.data;
    res.status(200).send({ message: "hava durumu güncellendi.", weather });
  } catch (error) {
    console.log(
      "error",
      error.response ? error.response.data.message : "Bir hata oluştu"
    );
    res
      .status(404)
      .send(error.response ? error.response.data.message : "Şehir Bulunamadı.");
  }
});

app.listen(port, console.log(port, "portu çalışıyor"));
