const weatherModel = require("../models/models");
const express = require("express");
const app = express();

app.get("/weathers", async (req, res) => {
  const weather = await weatherModel.find({});

  try {
    res.send(weather);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/weather", async (req, res) => {
    const weather = await weatherModel(req, res);

    try{
        await weather.save();
    }catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app;
