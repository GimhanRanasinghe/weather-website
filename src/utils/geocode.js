const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZ2ltaGFuIiwiYSI6ImNrb2k3YXZncDB3cjgyb3BscWZ6NWhiaXEifQ.5w-4zkwZ_LzdHCVb4j2j5A&limit=1";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect!", undefined);
    } else if (response.body.message) {
      callback("Enter a correct location!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Enter a correct location!", undefined);
    } else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;

//short hand

// const geocode = (address, callback) => {
//     const url =
//       "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//       encodeURIComponent(address) +
//       ".json?access_token=pk.eyJ1IjoiZ2ltaGFuIiwiYSI6ImNrb2k3YXZncDB3cjgyb3BscWZ6NWhiaXEifQ.5w-4zkwZ_LzdHCVb4j2j5A&limit=1";
//     request({ url, json: true }, (error, { body }) => {
//       if (error) {
//         callback("Unable to connect!", undefined);
//       } else if (body.message === "Not Found") {
//         callback("Enter a correct location!", undefined);
//       } else if (!body.features) {
//         callback("Enter a correct location!", undefined);
//       } else {
//         callback(undefined, {
//           location: body.features[0].place_name,
//           longitude: body.features[0].center[0],
//           latitude: body.features[0].center[1],
//         });
//       }
//     });
//   };

//   module.exports = geocode;
