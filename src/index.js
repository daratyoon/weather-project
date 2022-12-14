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
  let hour = `Last Updated: ${date.getHours()}`;
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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="card">
             <div class="card-body">
                <h5 class="card-title">${formatForecastDay(
                  forecastDays.dt
                )}</h5>
                <h6 class="card-subtitle mb-2 text-muted"></h6>
                <p class="card-text">
                  ${Math.round(forecastDays.temp.max)}°F
                  <div class="forecastLow"> ${Math.round(
                    forecastDays.temp.min
                  )}°F </div>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDays.weather[0].icon
                    }@2x.png" alt="" width="48" />
                  <p class="card-text"><small class="text-muted"> ${
                    forecastDays.weather[0].description
                  } </small></p>
                </p>
              </div>
          </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
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

  document.querySelector("#daily-high").innerHTML = `Hi ${Math.round(
    response.data.main.temp_max
  )}°F`;
  document.querySelector("#daily-low").innerHTML = `Lo ${Math.round(
    response.data.main.temp_min
  )}°F`;

  city.innerHTML = `📍${response.data.name}`;
  cityTemperature.innerHTML = `${temperature}`;
  dailyDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind Spd ${Math.round(response.data.wind.speed)}mph`;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-city");
  search(newCity.value);
}

function search(city) {
  let apiKey = "e3af10cefc7c7a7f4ca878121a656948";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCityTemperature);
}

function retrieveCelsiusTemp(event) {
  event.preventDefault();
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
  let newCity = document.querySelector("#search-city");
  city.innerHTML = `📍${newCity.value}`;

  let apiKey = "e3af10cefc7c7a7f4ca878121a656948";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCelsiusTemperature);
}

function showCelsiusTemperature(response) {
  let todaysWeather = document.querySelector("#todays-weather");
  let dailyHigh = document.querySelector("#daily-high");
  let dailyLow = document.querySelector("#daily-low");

  todaysWeather.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = `📍${response.data.name}`;
  dailyHigh.innerHTML = `Hi ${Math.round(response.data.main.temp_max)}°C`;
  dailyLow.innerHTML = `Lo ${Math.round(response.data.main.temp_min)}°C`;
}

function retrieveFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitElement.classList.add("active");
  celsiusElement.classList.remove("active");
  let newCity = document.querySelector("#search-city");
  city.innerHTML = `📍${newCity.value}`;

  let apiKey = "e3af10cefc7c7a7f4ca878121a656948";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showFahrenheitTemperature);
}

function showFahrenheitTemperature(response) {
  let todaysWeather = document.querySelector("#todays-weather");
  let dailyHigh = document.querySelector("#daily-high");
  let dailyLow = document.querySelector("#daily-low");

  todaysWeather.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = `📍${response.data.name}`;
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
  let temperature = Math.round(response.data.main.temp);
  let searchedCity = response.data.name;
  let dailyDescription = document.querySelector("#daily-condition");
  let windSpeed = document.querySelector("#daily-wind-speed");
  let dailyHigh = document.querySelector("#daily-high");
  let dailyLow = document.querySelector("#daily-low");
  let currentIcon = document.querySelector("#current-icon");
  let celsiusTemp = Math.round(temperature - (32 * 5) / 9);

  currentTemp.innerHTML = `${temperature}`;
  city.innerHTML = `📍${searchedCity}`;
  dailyDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind Spd: ${Math.round(response.data.wind.speed)}`;
  dailyHigh.innerHTML = `Hi ${Math.round(response.data.main.temp_max)}°F`;
  dailyLow.innerHTML = `Lo ${Math.round(response.data.main.temp_min)}°F`;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusElement.classList.add("active");
  celsiusElement.innerHTML = `| ${celsiusTemp} °C`;

  getForecast(response.data.coord);
}

let currentDate = document.querySelector("#current-date");
let todaysDate = new Date();
currentDate.innerHTML = formatedDate(todaysDate);

let fahrenheitTemperature = null;

let city = document.querySelector("#displayed-city");

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchCity);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", retrieveCelsiusTemp);

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", retrieveFahrenheitTemp);

let buttonElement = document.querySelector("#current-weather-button");
buttonElement.addEventListener("click", pressCurrentLocation);
