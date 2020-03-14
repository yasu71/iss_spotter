// const fetchMyIP = require('./iss.js');
// const fetchCoordsByIP = require('./iss.js');
// const fetchISSFlyOverTimes = require('./iss.js');
const nextISSTimesForMyLocation = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Return IP: ", ip);
// });

// fetchCoordsByIP ("162.245.144.188", (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned: ", coords);
// });


// const coords = {latitud: '49.27670', longitude: '-123.13000'};

// fetchISSFlyOverTimes (coords, (error, flyOver) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Fetch Flyover Times for ISS: ", flyOver);
// });


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  // write codes to get times
  console.log(passTimes);
});