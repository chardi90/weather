function refreshWeather(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city-name");
  let currentCity = response.data.city;
  let currentCountry = response.data.country;
  let currentTemperatureElement = document.querySelector("#todays-temp");
  let currentTemperature = response.data.temperature.current;
  let currentFeelsElement = document.querySelector("#today-feels-like");
  let currentFeelsLike = response.data.temperature.feels_like;
  let currentdescriptionElement = document.querySelector("#todays-description");
  let currentDescription = response.data.condition.description;
  let currentWindSpeedElement = document.querySelector("#wind-speed-today");
  let currentWindSpeed = response.data.wind.speed;
  let currentWindDirectionElement =
    document.querySelector("#wind-degree-today");
  let currentWindDirection = response.data.wind.degree;
  let currentHumidityElement = document.querySelector("#humidity-today");
  let currentHumidity = response.data.temperature.humidity;
  let currentPressureElement = document.querySelector("#pressure-today");
  let currentPressure = response.data.temperature.pressure;

  cityElement.innerHTML = `${currentCity}, ${currentCountry}`;
  currentTemperatureElement.innerHTML = Math.round(currentTemperature);
  currentFeelsElement.innerHTML = Math.round(currentFeelsLike);
  currentdescriptionElement.innerHTML = `${currentDescription}`;
  currentWindSpeedElement.innerHTML = `${currentWindSpeed}Km/h`;
  currentWindDirectionElement.innerHTML = currentWindDirection;
  currentHumidityElement.innerHTML = `${currentHumidity}%`;
  currentPressureElement.innerHTML = currentPressure;
}

function searchCity(city) {
  let apiKey = "a2t477eebb3f98daaa0d6cf85ob51907";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#city-search");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Manchester");
