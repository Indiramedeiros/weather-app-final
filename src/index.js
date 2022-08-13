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
}

let apiKey = "2bc6b4fefdb04abbb3ef0da316d15f59";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(getWeather);
