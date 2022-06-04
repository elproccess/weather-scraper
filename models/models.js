const mongoose = require("mongoose");

const schema = mongoose.Schema;

let temprature = new mongoose.Schema({});

let weatherIntervals = new mongoose.Schema({
  descriptions: { type: String, trim: true, required: true },
  hour: { type: String, trim: true, required: true },
  temprature_celcius: { type: String, trim: true, required: true },
  temprature_fahrenheit: { type: String, trim: true, required: true },
  humudity: { type: String, trim: true, required: true },
  pressure: { type: String, trim: true, required: true },
  wind_direction: { type: String, trim: true, required: true },
  precipitation: { type: String, trim: true, required: true },
  rain_precentage: { type: String, trim: true, required: true },
  visbility: { type: String, trim: true, required: true },
});

let weatherSchema = new mongoose.Schema({
  date: { type: String, trim: true},
  interval: { type: String, trim: true},
});

const Weather = mongoose.model("weather", weatherSchema, "weather");
module.exports = Weather;
