function showPositionTemperature(response) {
  let currentTemp = document.querySelector("#fahrenheit-link");
  let currentCity = document.querySelector("#displayed-city");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let dailyDescription = document.querySelector("#daily-condition");
  let windSpeed = document.querySelector("#daily-wind-speed");
  let dailyHigh = document.querySelector("#daily-high");
  let dailyLow = document.querySelector("#daily-low");

  currentTemp.innerHTML = `${temperature}°F`;
  currentCity.innerHTML = `${city}`;
  dailyDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind Spd: ${Math.round(response.data.wind.speed)}`;
  dailyHigh.innerHTML = `Hi ${Math.round(response.data.main.temp_max)}°F`;
  dailyLow.innerHTML = `Lo ${Math.round(response.data.main.temp_min)}°F`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e3af10cefc7c7a7f4ca878121a656948";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showPositionTemperature);
}

function pressCurrentLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

//
function showCelsiusTemperature(response) {
  let celsiusTemp = document.querySelector("#celsius-link");
  let dailyHigh = document.querySelector("#daily-high");
  let dailyLow = document.querySelector("#daily-low");

  celsiusTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  dailyHigh.innerHTML = `Hi ${Math.round(response.data.main.temp_max)}°C`;
  dailyLow.innerHTML = `Lo ${Math.round(response.data.main.temp_min)}°C`;
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

function showCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector("#fahrenheit-link");
  let dailyDescription = document.querySelector("#daily-condition");
  let windSpeed = document.querySelector("#daily-wind-speed");
  document.querySelector("#displayed-city").innerHTML = response.data.name;
  document.querySelector("#daily-high").innerHTML = `Hi ${Math.round(
    response.data.main.temp_max
  )}°F`;
  document.querySelector("#daily-low").innerHTML = `Lo ${Math.round(
    response.data.main.temp_min
  )}°F`;

  cityTemperature.innerHTML = `${temperature}°F`;
  dailyDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind Spd: ${Math.round(response.data.wind.speed)}`;
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

let currentDate = document.querySelector("#current-date");
let todaysDate = new Date();
currentDate.innerHTML = formatedDate(todaysDate);

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchCity);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", retrieveCelsiusTemp);

let buttonElement = document.querySelector("#current-weather-button");
buttonElement.addEventListener("click", pressCurrentLocation);
