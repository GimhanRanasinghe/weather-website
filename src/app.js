const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "gimhan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "gimhan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Warning!",
    title: "HELP",
    name: "gimhan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Enter an address!",
    });
  }
  const address = req.query.address;

  geocode(address, (error, { location, longitude, latitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        forecastData,
      });
    });
  });

  // res.send([
  //   {
  //     location: "horana",
  //     forecast: 35.4,
  //     address: req.query.address,
  //   },
  // ]);
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Enter a location",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    name: "gimhan",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found!",
    name: "gimhan",
    title: "404",
  });
});

app.listen(3000, () => {
  console.log("Server is starting...");
});
