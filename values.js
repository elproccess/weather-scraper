const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const day = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function findDay(number){
    for(let i=0; i<day.length; i++){

        if(number === 0){
            return "Sunday";
        } else if(number === 1){
            return "Monday";
        }else if(number === 2){
            return "Tuesday";
        }else if(number === 3){
            return "Wednesday";
        }else if(number === 4){
            return "Thursday";
        }else if(number === 5){
            return "Friday";
        }else if(number === 6){
            return "Saturday";
        }

        
    }

}

const hours = ["00", "01", "02", "03", "04", "05"];

mongo_string =
  "mongodb+srv://database:database@cluster0.94uc3lz.mongodb.net/?retryWrites=true&w=majority";

module.exports = { monthNames, day, hours, mongo_string, findDay };
