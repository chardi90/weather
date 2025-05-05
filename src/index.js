function refreshWeather(response) {
  let cityElement = document.querySelector("#city-name");
  let currentCity = response.data.city;
  let currentCountry = response.data.country;
  let currentTemperatureElement = document.querySelector("#todays-temp");
  let currentTemperature = response.data.temperature.current;

  cityElement.innerHTML = `${currentCity}, ${currentCountry}`;
  currentTemperatureElement.innerHTML = Math.round(currentTemperature);
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
