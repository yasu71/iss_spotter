/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  
  const ipifyURL = 'https://api.ipify.org?format=json';
  request(ipifyURL, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    if (body) {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    } else {
      callback(`There was no BODY for IP`, null)
    }

  });
};

const fetchCoordsByIP = function(ip, callback) {
  const ipVigilante = "https://ipvigilante.com/" + ip;

  request(ipVigilante, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (body) {
      const latitude = JSON.parse(body).data.latitude;
      const longitude = JSON.parse(body).data.longitude;
      const data = {latitude, longitude};
      
      callback(null, data);
    } else {
      callback(new Error(`There was no BODY for coords`), null);
    }

  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(getCoords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${getCoords.latitude}&lon=${getCoords.longitude}`, (error, response, body) => {
    if (error) {
      callback(null, error);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetchng fly over time response: ${body}`;
      callback(null, Error(msg));
      return;
    }
    
    if (body) {
      const data = JSON.parse(body);
      callback(null, data.response);
    } else {
      callback(new Error(`There was no BODY for ISS times`), null);
    }

  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
    } else {
      fetchCoordsByIP(ip, (error, coords) => {
        if (error) {
          callback(error, null);
        } else {
          fetchISSFlyOverTimes(coords, (error, times) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, times);
            }
          })
        } // if/else
      })
    }  // if/else
  })
};

//module.exports = fetchMyIP;
//module.exports = fetchCoordsByIP;
//module.exports = fetchISSFlyOverTimes;
module.exports = nextISSTimesForMyLocation;
