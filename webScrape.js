const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const service = require("./service");

scraped_quotes = [];

//each hour intervals
//scraped_times = []; // hour
//scraped_descriptions = []; // description of the weather at that hour
scraped_celcius_temperature = []; // temperature(C) of the weather at that hour
scraped_fahrenheit_temperature = []; // temperature(F) of the weather at that hour
scrape_full_descriptions = []; // full description of the weather
scraped_visibility = []; // visbility of the weather at that hour
scraped_humidity = []; //humidity of the weather at that hour
scraped_date = []; // date of the weather at that hour
scraped_data = [];
data_ = [];
//date = " ";
async function getData(URL) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(URL);
    const pageData = await page.evaluate(() => {
      return {
        html: document.documentElement.innerHTML,
      };
    });

    const $ = cheerio.load(pageData.html);
    let original_date = $("div.wr-date");
    let quote_cards = $("div.wr-day-temperature__low");

    for (let i = 0; i < 13; i++) {
      console.log("scrape interval: " + i);
      const form = await page.$("a#daylink-" + i);
      const DataP = await form.evaluate((form) => {
        form.click();
        return {
          html: document.documentElement.innerHTML,
        };
      });

      //
      const t = cheerio.load(DataP.html);

      let temperature_date = t("div.wr-date").text();
      let temprature_time_slot2 = t("div.wr-time-slot-primary__title");
      let temprature_time_description2 = t("div.wr-time-slot-primary__body");
      let temperature_byHour = t("div.wr-time-slot-primary__temperature");
      let temprature_bottom_section = t(
        "div.wr-time-slot-secondary__bottom-section-container"
      );
      service.scrape_hours(temprature_time_slot2, t);
      service.scrape_description(temprature_time_description2, t);

      //scrape the humudity, pressure, and visbility by the hour
      temprature_bottom_section.each((index, element) => {
        bottom_section = t(element)
          .find("dd.wr-time-slot-secondary__value")
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
        });
      });

      // scrape the temperature by the hour
      temperature_byHour.each((index, element) => {
        celcius_byHour = t(element)
          .find("span.wr-value--temperature--c")
          .text();
        scraped_celcius_temperature.push({
          temprature_celcius: celcius_byHour,
        });
      });

      temperature_byHour.each((index, element) => {
        fahrenheit_byHour = t(element)
          .find("span.wr-value--temperature--f")
          .text();
        scraped_fahrenheit_temperature.push({
          temprature_fahrenheit: fahrenheit_byHour,
        });
      });

      for (let j = 0; j < scraped_descriptions.length; j++) {
        scraped_data.push({
          intervals: j,
          Hour: scraped_times[j].hours,
          description: scraped_descriptions[j].description,
          temprature_celcius: scraped_celcius_temperature[j].temprature_celcius,
          temprature_fahrenheit:
            scraped_fahrenheit_temperature[j].temprature_fahrenheit,
          humudity: scraped_humidity[j].humudity,
          pressure: pressure,
          visbility: visbility,
        });
      }

      data_.push({
        date: temperature_date,
        interval: i,
        hourlyWeatherIntervals: scraped_data,
      });

      //console.log(data_);
      // console.log(temperature_date);
      scraped_data = [];
      scraped_descriptions = [];
      scraped_times = [];
    }
    original_date.each((index, element) => {
      ky = $(element).find("span.wr-date__long").text();
      scraped_date.push({
        date: ky,
      });
    });

    for (let l = 0; l < data_.length; l++) {
      data_[l].date = scraped_date[l].date;
    }
    data_.forEach((item) => {
      item.hourlyWeatherIntervals.forEach((element) => {
        console.log(
          "date: " +
            item.date +
            " description " +
            element.description +
            " humidty: " +
            element.humudity +
            " Hour: " +
            element.Hour +
            " pressure: " +
            element.pressure,
            " visibility: " +
            element.visbility
        );
      });
    });

    // high temperature scrape
    quote_cards.each((index, element) => {
      londonCel = $(element).find("span.wr-value--temperature--c").text();
      londonFur = $(element).find("span.wr-value--temperature--f").text();

      scraped_quotes.push({
        LondonCel: londonCel,
        LondonFur: londonFur,
      });
    });

    await browser.close();
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getData };
