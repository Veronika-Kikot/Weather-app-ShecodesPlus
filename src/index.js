let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = [now.getDate()];
let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}
let months = [
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
  "December"
];
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let message = `${hour}:${minutes} ${month}, ${date}`;
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = message;

let temp = document.querySelector("#temp-number");
// let number = 17;
// temp.innerHTML = `${number}ºC`;

// function farSwitch(event) {
//   event.preventDefault();
//   let far = Math.round((number * 9) / 5 + 32);
//   temp.innerHTML = `${far}ºF`;
// }

// let far = document.querySelector("#far");
// far.addEventListener("click", farSwitch);

// function celsSwitch(event) {
//   event.preventDefault();
//   temp.innerHTML = `${number}ºC`;
// }

// let cels = document.querySelector("#cels");
// cels.addEventListener("click", celsSwitch);

// Week 5
// let precipitation = document.querySelector("#precipitation");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let description = document.querySelector("#description");

let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
function showTempCity(response) {
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}ºC`;

  // precipitation.innerHTML = response.data.main;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
}

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control");
  let h2 = document.querySelector("h2");
  h2.innerHTML = city.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempCity);
}

let form = document.querySelector("form");
form.addEventListener("submit", enterCity);

// Bonus
function location(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}ºC`;
  let h2 = document.querySelector("h2");
  let location = response.data.name;
  h2.innerHTML = location;
  // precipitation.innerHTML = response.data.main;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].main;
}
function currentLocation() {
  navigator.geolocation.getCurrentPosition(location);
}

let currentBtn = document.querySelector("#current");
currentBtn.addEventListener("click", currentLocation);
