const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const service = require("./service");
const values = require("./values");

scraped_quotes = [];
scraped_data = [];
data_ = [];
//date = " ";

async function getData(URL) {
  try {
    data_ = [];
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

    for (let i = 0; i < 14; i++) {
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

      let temperature_date = t("div.wr-date");
      let temprature_time_slot2 = t("div.wr-time-slot-primary__title");
      let temprature_time_description2 = t("div.wr-time-slot-primary__body");
      let temperature_byHour = t("div.wr-time-slot-primary__temperature");
      let probability_rain = t("div.wr-time-slot-primary__precipitation");
      let temprature_bottom_section = t(
        "div.wr-time-slot-secondary__bottom-section-container"
      );
      service.scrape_hours(temprature_time_slot2, t);
      service.scrape_description(temprature_time_description2, t);
      service.scrape_date(temperature_date, t);
      service.scrape_bottom_container(temprature_bottom_section, t);
      service.scrape_hour_temperature(temperature_byHour, t);
      service.scrape_hour_temperature_f(temperature_byHour, t);
      service.scrape_probability(probability_rain, t);
      quote_cards.each((index, element) => {
        londonCel = $(element).find("span.wr-value--temperature--c").text();
        londonFur = $(element).find("span.wr-value--temperature--f").text();

        scraped_quotes.push({
          low_c: londonCel,
          low_f: londonFur,
        });
      });

      for (let j = 0; j < scraped_descriptions.length; j++) {
        scraped_data.push({
          intervals: j,
          descriptions: scraped_descriptions[j].description,
          hour: scraped_times[j].hours,
          temprature_celcius: scraped_celcius_temperature[j].temprature_celcius,
          temprature_fahrenheit:
            scraped_fahrenheit_temperature[j].temprature_fahrenheit,
          humudity: scraped_humidity[j].humudity,
          pressure: scraped_humidity[j].pressure,
          wind_direction: scraped_humidity[j].wind_direction,
          precipitation: scraped_humidity[j].precipitation,
          rain_precentage: scraped_rain_probability[j].rain_precentage,
          visbility: scraped_humidity[j].visbility,
        });
      }

      data_.push({
        date: scraped_date[1].date,
        interval: i,
        hourlyWeatherIntervals: scraped_data,
      });

      //console.log(data_);
      // console.log(temperature_date);
      scraped_data = [];
      scraped_descriptions = [];
      scraped_times = [];
      scraped_humidity = [];
      scraped_celcius_temperature = [];
      scraped_fahrenheit_temperature = [];
      scraped_rain_probability = [];
    }
    original_date.each((index, element) => {
      ky = $(element).find("span.wr-date__long").text();
      scraped_date.push({
        date: ky,
      });
    });

    for (let l = 0; l < data_.length; l++) {
      const today = new Date();
      let current_date = ("" + today.getDate()).slice(-2);
      let month = ("0" + (today.getMonth() + 1)).slice(-2);

      if (
        current_date === "1" ||
        current_date === "21" ||
        current_date === "31"
      ) {
        current_date += "st";
      } else if (current_date === "2" || current_date === "22") {
        current_date += "nd";
      } else if (current_date === "3" || current_date === "23") {
        current_date += "rd";
      } else {
        current_date += "th";
      }

     
      data_[l].date =
        data_[l].interval === 0 ||
        (data_[l].interval === 0 && data_[l].Hour === "00")
          ? values.findDay(today.getDay()) +
            " " +
            current_date +
            " " +
            values.monthNames[today.getMonth()]
          : scraped_date[l - 1].date;
    }

    await browser.close();
    return data_;
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getData };
