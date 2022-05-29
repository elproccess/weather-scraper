const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { count } = require("console");

scraped_quotes = [];

scraped_times = [];
scraped_descriptions = [];
scraped_data = [];

async function getData() {
  try {
    const URL = "https://www.bbc.co.uk/weather/2643743";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(URL);
    const pageData = await page.evaluate(() => {
      return {
        html: document.documentElement.innerHTML,
      };
    });

    const $ = cheerio.load(pageData.html);
    let quote_cards = $("div.wr-day-temperature__low");

    for(let i = 0; i < 13; i++) {
        console.log("scrape interval: " + count);
        const form = await page.$("a#daylink-"+i);
        const DataP = await form.evaluate((form) => {
          form.click();
          return {
            html: document.documentElement.innerHTML,
          };
        });

        const t = cheerio.load(DataP.html);
        let temprature_time_slot2 = t("div.wr-time-slot-primary__title");
        let temprature_time_description2 = t("div.wr-time-slot-primary__body");

        temprature_time_slot2.each((index, element) => {
            time_slot = t(element).find("span.wr-time-slot-primary__hours").text();
            //description = $(temprature_time_description).text();
            //str = description.split(" ");    wr-time-slot-primary__weather-type-description
            scraped_times.push({
              hours: time_slot,
            });
          });
      
          temprature_time_description2.each((index, element) => {
            description = t(element)
              .find(".wr-time-slot-primary__weather-type-description")
              .text();
            scraped_descriptions.push({
              description: description,
            });
          });

          console.log("scraped interval: " + i);
          console.log(scraped_times);
          console.log(scraped_descriptions);
          scraped_descriptions = [];
          scraped_times = [];
        
    }
     
    
    

    // high temperature scrape
    quote_cards.each((index, element) => {
      londonCel = $(element).find("span.wr-value--temperature--c").text();
      londonFur = $(element).find("span.wr-value--temperature--f").text();

      scraped_quotes.push({
        LondonCel: londonCel,
        LondonFur: londonFur,
      });
    });

    console.log(scraped_quotes);
    await browser.close();
  } catch (e) {
    console.log(e);
  }
}
getData();
