const nextISSTimesForMyLocation = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => { printPassTimess(passTimes);
  })
  .catch((error) => {
    console.log(`It did't work: ${error.message}`)
  });