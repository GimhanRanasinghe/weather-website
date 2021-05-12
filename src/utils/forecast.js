const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=cf616deeaae0d9fd43a01c3e6823ffbf&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=m";

  request({ url: url, json: true }, function (error, response) {
    if (error) {
      callback("Cannot connect to the weather service!", undefined);
    } else if (response.body.error) {
      callback("Wrong Location", undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          ". It is currently " +
          response.body.current.temperature +
          " degrees out. It feels like " +
          response.body.current.feelslike +
          " degrees out."
      );
    }
  });
};

//short hand

// const forecast = (longitude, latitude, callback) => {
//     const url =
//       "http://api.weatherstack.com/current?access_key=cf616deeaae0d9fd43a01c3e6823ffbf&query=" +
//       encodeURIComponent(longitude) +
//       "," +
//       encodeURIComponent(latitude) +
//       "&units=m";

//     request({ url, json: true }, function (error, { body }) {
//       if (error) {
//         callback("Cannot connect to the weather service!", undefined);
//       } else if (body.error) {
//         callback("Wrong Location", undefined);
//       } else {
//         callback(
//           undefined,
//           body.current.weather_descriptions[0] +
//             ". It is currently " +
//             body.current.temperature +
//             " degrees out. It feels like " +
//             body.current.feelslike +
//             " degrees out."
//         );
//       }
//     });
//   };

module.exports = forecast;
