const express = require("express");
const webScrape = require("./webScrape");
const values = require("./values");
const cron = require("node-cron");
const MongoClient = require("mongodb").MongoClient;
const Weather = require("./models/models");

const app = express();
app.use(express.json());
var dbase;

MongoClient.connect(mongo_string, (err, client) => {
  if (err) return console.error(err);
  dbase = client.db("weather");

  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${3001}.`);
  });
});
const start = async function main() {
  const SW8 = await webScrape.getData("https://www.bbc.co.uk/weather/sw8");
};

if (require.main === module) {
  cron.schedule("*/10 10-22 * * *", async () => {
      //south west london weather
      await insertData("https://www.bbc.co.uk/weather/sw8");
      await insertData("https://www.bbc.co.uk/weather/sw15");
      await insertData("https://www.bbc.co.uk/weather/sw11");
      await insertData("https://www.bbc.co.uk/weather/sw9");
      await insertData("https://www.bbc.co.uk/weather/sw2");
      await insertData("https://www.bbc.co.uk/weather/sw3");
      await insertData("https://www.bbc.co.uk/weather/sw4");
      await insertData("https://www.bbc.co.uk/weather/sw5");
      await insertData("https://www.bbc.co.uk/weather/sw6");
      await insertData("https://www.bbc.co.uk/weather/sw7");
      await insertData("https://www.bbc.co.uk/weather/sw10");
      await insertData("https://www.bbc.co.uk/weather/sw11");
      await insertData("https://www.bbc.co.uk/weather/sw12");
      await insertData("https://www.bbc.co.uk/weather/sw13");
      await insertData("https://www.bbc.co.uk/weather/sw14");
      await insertData("https://www.bbc.co.uk/weather/sw16");
      await insertData("https://www.bbc.co.uk/weather/sw18");
      await insertData("https://www.bbc.co.uk/weather/sw17");
      await insertData("https://www.bbc.co.uk/weather/sw19");
      await insertData("https://www.bbc.co.uk/weather/sw20");
  });

  async function insertData(url){
      postcode = url.split("/")[4];
      await webScrape.getData(url).then(async (data) => {
        await dbase.collection(postcode).deleteMany({});
        await dbase.collection(postcode).insertMany(data, function (err, result) {
          if (err) {
            console.log(err);
          }
          console.log(result);
        });
      });
  }
  app.listen(3000, () => {
    console.log("Server is running...");
  });
}
