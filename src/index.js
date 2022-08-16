let currentDate = new Date();

let currentMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dez",
];
let month = currentMonths[currentDate.getMonth()];

let currentDay = currentDate.getDate();

let currentWeekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = currentWeekDay[currentDate.getDay()];

let currentHour = currentDate.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = currentDate.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute} `;
}

let newMonth = document.querySelector("#month-day");
newMonth.innerHTML = `${month}  ${currentDay} `;

let weekDayNow = document.querySelector("#week-day");
weekDayNow.innerHTML = `${weekDay}`;

let currentTime = document.querySelector("#hour");
currentTime.innerHTML = `${currentHour} : ${currentMinute}`;

function getWeather(response) {
  let weather = Math.round(response.data.main.temp);
  let city = response.data.name;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;

  celsiusTemperature = response.data.main.temp;

  let newTemperature = document.querySelector("#temperature");
  newTemperature.innerHTML = `${weather}`;

  let newCity = document.querySelector("#city");
  newCity.innerHTML = `${city}`;

  let newDescription = document.querySelector("#description");
  newDescription.innerHTML = `${description}`;

  let newHumidity = document.querySelector("#humidity");
  newHumidity.innerHTML = `Humidity: ${humidity}%`;

  let newWind = document.querySelector("#wind");
  newWind.innerHTML = `Wind: ${wind}mph`;

  let newIcon = document.querySelector("#icon");
  newIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  newIcon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "2bc6b4fefdb04abbb3ef0da316d15f59";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);
}

function newCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  search(cityName.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(currentFahrenheit);
}

function showCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2bc6b4fefdb04abbb3ef0da316d15f59";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);
}

function currentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocationWeather);

let celsiusTemperature = null;

let form = document.querySelector("#enter-city");
form.addEventListener("submit", newCity);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

search("London");
