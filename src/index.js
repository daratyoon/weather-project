function formatedDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let dateNow = date.getDate();
  let year = date.getFullYear();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} 
  </br>
  ${month} ${dateNow}, ${year}
  </br>
  ${hour}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
          <div class="card">
             <div class="card-body">
                <h5 class="card-title">${day}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Sept 6</h6>
                <p class="card-text">
                  High:100°F
                  <br />
                  Low: 78°F
                  <br />
                  <div class="emoji">☀️</div>
                  <p class="card-text"><small class="text-muted">Chance of Rain: 0%</small></p>
                </p>
              </div>
          </div>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e3af10cefc7c7a7f4ca878121a656948";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityTemperature(response) {
  fahrenheitTemperature = response.data.main.temp;

  let temperature = Math.round(fahrenheitTemperature);
  let cityTemperature = document.querySelector("#todays-weather");
  let dailyDescription = document.querySelector("#daily-condition");
  let windSpeed = document.querySelector("#daily-wind-speed");
  let currentIcon = document.querySelector("#current-icon");
  document.querySelector(
    "#displayed-city"
  ).innerHTML = `📍 ${response.data.name}`;
  document.querySelector("#daily-high").innerHTML = `Hi ${Math.round(
    response.data.main.temp_max
  )}°F`;
  document.querySelector("#daily-low").innerHTML = `Lo ${Math.round(
    response.data.main.temp_min
  )}°F`;

  cityTemperature.innerHTML = `${temperature}`;
  dailyDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind Spd: ${Math.round(response.data.wind.speed)}`;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-city");
  let city = document.querySelector("#displayed-city");
  city.innerHTML = `📍 ${newCity.value}`;
  let apiKey = "e3af10cefc7c7a7f4ca878121a656948";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCityTemperature);
}

function retrieveCelsiusTemp(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-city");
  let city = document.querySelector("#displayed-city");
  city.innerHTML = `📍 ${newCity.value}`;

  let apiKey = "e3af10cefc7c7a7f4ca878121a656948";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCelsiusTemperature);
}

function showCelsiusTemperature(response) {
  let todaysWeather = document.querySelector("#todays-weather");
  let fahrenheitTemp = document.querySelector("#fahrenheit-link");
  let celsiusTemp = document.querySelector("#celsius-link");
  let cityName = document.querySelector("#displayed-city");
  let dailyHigh = document.querySelector("#daily-high");
  let dailyLow = document.querySelector("#daily-low");
  fahrenheitTemp.classList.remove("active");

  todaysWeather.innerHTML = Math.round(response.data.main.temp);
  fahrenheitTemp.innerHTML = `°C`;
  celsiusTemp.innerHTML = `|°F`;
  cityName.innerHTML = response.data.name;
  dailyHigh.innerHTML = `Hi ${Math.round(response.data.main.temp_max)}°C`;
  dailyLow.innerHTML = `Lo ${Math.round(response.data.main.temp_min)}°C`;
}

function retrieveFahrenheitTemp(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-city");
  let city = document.querySelector("#displayed-city");
  city.innerHTML = `📍 ${newCity.value}`;

  let apiKey = "e3af10cefc7c7a7f4ca878121a656948";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showFahrenheitTemperature);
}

function showFahrenheitTemperature(response) {
  let todaysWeather = document.querySelector("#todays-weather");
  let celsiusTemp = document.querySelector("#celsius-link");
  let fahrenheitTemp = document.querySelector("#fahrenheit-link");
  let cityName = document.querySelector("#displayed-city");
  let dailyHigh = document.querySelector("#daily-high");
  let dailyLow = document.querySelector("#daily-low");

  todaysWeather.innerHTML = Math.round(response.data.main.temp);
  fahrenheitTemp.innerHTML = `°F`;
  celsiusTemp.innerHTML = `|°C`;
  cityName.innerHTML = response.data.name;
  dailyHigh.innerHTML = `Hi ${Math.round(response.data.main.temp_max)}°F`;
  dailyLow.innerHTML = `Lo ${Math.round(response.data.main.temp_min)}°F`;
}

function pressCurrentLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e3af10cefc7c7a7f4ca878121a656948";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showPositionTemperature);
}

function showPositionTemperature(response) {
  let currentTemp = document.querySelector("#todays-weather");
  let currentCity = document.querySelector("#displayed-city");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let dailyDescription = document.querySelector("#daily-condition");
  let windSpeed = document.querySelector("#daily-wind-speed");
  let dailyHigh = document.querySelector("#daily-high");
  let dailyLow = document.querySelector("#daily-low");
  let currentIcon = document.querySelector("#current-icon");
  let celsiusTemp = Math.round(temperature - (32 * 5) / 9);
  let celsiusElement = document.querySelector("#celsius-link");

  currentTemp.innerHTML = `${temperature}`;
  currentCity.innerHTML = `${city}`;
  dailyDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind Spd: ${Math.round(response.data.wind.speed)}`;
  dailyHigh.innerHTML = `Hi ${Math.round(response.data.main.temp_max)}°F`;
  dailyLow.innerHTML = `Lo ${Math.round(response.data.main.temp_min)}°F`;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusElement.innerHTML = `/ ${celsiusTemp} °C`;
}

let currentDate = document.querySelector("#current-date");
let todaysDate = new Date();
currentDate.innerHTML = formatedDate(todaysDate);

let fahrenheitTemperature = null;

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchCity);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", retrieveCelsiusTemp);

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", retrieveFahrenheitTemp);

let buttonElement = document.querySelector("#current-weather-button");
buttonElement.addEventListener("click", pressCurrentLocation);
