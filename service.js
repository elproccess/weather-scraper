
scraped_times = [];
scraped_descriptions = [];
date = " ";

function scrape_hours(hour, $) {
  hour.each((index, element) => {
    time_slot = $(element).find("span.wr-time-slot-primary__hours").text();
    scraped_times.push({
      hours: time_slot,
    });
  });
}

function scrape_date(temperature_date, t){
    temperature_date.each((index, element) => {
        date = t(element).find("span.wr-date__longish__dotm").text();
        scraped_date.push({
          date : date,
        });
      });
}

function scrape_description(temprature_time_description, t){
    temprature_time_description.each((index, element) => {
        description = t(element)
          .find(".wr-time-slot-primary__weather-type-description")
          .text();
        scraped_descriptions.push({
          description: description,
        });
      });
}

module.exports = { scrape_hours, scrape_date, scrape_description };
