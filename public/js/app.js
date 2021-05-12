// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=boston").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       return console.log(data.error);
//     }
//     console.log(data.location);
//     console.log(data.forecastData);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  const url = "/weather?address=" + encodeURIComponent(location);

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastData;
      }
    });
  });
});
