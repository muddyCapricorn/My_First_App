function formatDate(timestamp) {
  let newDate = new Date(timestamp);
  let weekend = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayWeekend = weekend[newDate.getDay()];
  let m = newDate.getMinutes();
  if (m < 10) {
    m = `0${m}`;
  }

  let time = `${newDate.getHours()}:${m}`;
  return `${dayWeekend}  <br/> ${time}`;
}

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  let tempNow = document.querySelector("#temp-now");

  celTemp = response.data.main.temp;
  tempNow.innerHTML = Math.round(celTemp);
  document.querySelector(".descr").innerHTML =
    response.data.weather[0].description;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed * 3.6
  )} km/h`;

  document.querySelector(".today").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .querySelector("#emoji-now")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function searchCity(city) {
  let apiKey = "0a016ab1d0d641ea3159c73766f38d70";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(showWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function showLocalPosition(position) {
  let apiKey = "0a016ab1d0d641ea3159c73766f38d70";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let locUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${locUrl}&appid=${apiKey}`).then(showWeather);
}
function localPosition() {
  navigator.geolocation.getCurrentPosition(showLocalPosition);
}

function convertFahr(event) {
  event.preventDefault();
  celConv.classList.remove("active");
  fahrConv.classList.add("active");
  let now = document.querySelector("#temp-now");
  let fahr = Math.round((celTemp * 9) / 5 + 32);
  now.innerHTML = fahr;
}
function convertCel(event) {
  event.preventDefault();
  fahrConv.classList.remove("active");
  celConv.classList.add("active");
  let now = document.querySelector("#temp-now");
  now.innerHTML = Math.round(celTemp);
}
let celTemp = null;
let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

let locButton = document.querySelector("#location-button");
locButton.addEventListener("click", localPosition);

let celConv = document.querySelector("#celsium a");
let fahrConv = document.querySelector("#fahrenheit a");

fahrConv.addEventListener("click", convertFahr);
celConv.addEventListener("click", convertCel);

searchCity("Kyiv");
