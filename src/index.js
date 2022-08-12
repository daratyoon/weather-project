function showPositionTemperature(response) {
  let currentTemp = document.querySelector("#fahrenheit-link");
  let currentCity = document.querySelector("#displayed-city");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  currentTemp.innerHTML = `${temperature}°F`;
  currentCity.innerHTML = `${city}`;
}

function retrievePosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e3af10cefc7c7a7f4ca878121a656948";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showPositionTemperature);
}

function pressCurrentLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function showCityTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector("#todays-weather-fahrenheit");
  cityTemperature.innerHTML = `${temperature}°F`;
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

let buttonElement = document.querySelector("#current-weather-button");
buttonElement.addEventListener("click", pressCurrentLocation);
