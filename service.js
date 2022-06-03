scraped_times = [];
scraped_descriptions = [];
scraped_date = [];
scraped_humidity = [];
scraped_celcius_temperature = [];
scraped_fahrenheit_temperature = [];
scraped_rain_probability = [];
date = " ";

function scrape_hours(hour, $) {
  hour.each((index, element) => {
    time_slot = $(element).find("span.wr-time-slot-primary__hours").text();
    scraped_times.push({
      hours: time_slot,
    });
  });
}

function scrape_date(temperature_date, t) {
  temperature_date.each((index, element) => {
    date = t(element).find("span.wr-date__long").text();
    scraped_date.push({
      date: date,
    });
  });
}

function scrape_description(temprature_time_description, t) {
  temprature_time_description.each((index, element) => {
    description = t(element)
      .find(".wr-time-slot-primary__weather-type-description")
      .text();
    scraped_descriptions.push({
      description: description,
    });
  });
}

function scrape_bottom_container(temprature_bottom_section, t) {
  temprature_bottom_section.each((index, element) => {
    bottom_section = t(element).find("dd.wr-time-slot-secondary__value").text();

    chance_precipitation = t(element)
      .find("div.wr-time-slot-secondary__chance-of-rain")
      .text();

    wind_direction = t(element)
      .find("div.wr-time-slot-secondary__wind-direction")
      .text();

    humudity = bottom_section.split("%")[0];
    humudity += "%";

    pressureVisbilty = bottom_section.split("%")[1];
    pressure = pressureVisbilty.split("mb")[0];
    pressure += "mb";

    visbility = pressureVisbilty.split("mb")[1];

    scraped_humidity.push({
      humudity: humudity,
      pressure: pressure,
      visbility: visbility,
      precipitation: chance_precipitation,
      wind_direction: wind_direction,
    });
  });
}

function scrape_hour_temperature(temperature_byHour, t) {
  temperature_byHour.each((index, element) => {
    celcius_byHour = t(element).find("span.wr-value--temperature--c").text();
    scraped_celcius_temperature.push({
      temprature_celcius: celcius_byHour,
    });
  });
}

function scrape_hour_temperature_f(temperature_byHour, t) {
  temperature_byHour.each((index, element) => {
    fahrenheit_byHour = t(element).find("span.wr-value--temperature--f").text();
    scraped_fahrenheit_temperature.push({
      temprature_fahrenheit: fahrenheit_byHour,
    });
  });
}

function scrape_probability(probability_rain, t) {
    probability_rain.each((index, element) => {
        rain = t(element).find("div.wr-u-font-weight-500").text();
        
        percentage = rain.split("%")[0];
        percentage += "%"

        chance_precipitation = rain.split("%")[1];

        scraped_rain_probability.push({
            rain_precentage: percentage
        });
    });
}

module.exports = {
  scrape_hours,
  scrape_date,
  scrape_description,
  scrape_bottom_container,
  scrape_hour_temperature,
  scrape_hour_temperature_f,
  scrape_probability,
};
