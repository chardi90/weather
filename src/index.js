function refreshWeather(response) {
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
    let number = date.getDate();
    let month = date.getMonth();

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

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
      "December",
    ];

    let formattedDay = days[day];
    let formattedMonth = months[month];
    return `${formattedDay}, ${number} ${formattedMonth} ${hours}:${minutes}`;
  }

  let currentDateElement = document.querySelector("#current-date-time");
  let date = new Date();
  currentDateElement.innerHTML = formatDate(date);

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

  function formatWindDirection(degree) {
    if (degree >= 348.75 || degree < 11.25) return "N";
    if (degree >= 11.25 && degree < 33.75) return "NNE";
    if (degree >= 33.75 && degree < 56.25) return "NE";
    if (degree >= 56.25 && degree < 78.75) return "ENE";
    if (degree >= 78.75 && degree < 101.25) return "E";
    if (degree >= 101.25 && degree < 123.75) return "ESE";
    if (degree >= 123.75 && degree < 146.25) return "SE";
    if (degree >= 146.25 && degree < 168.75) return "SSE";
    if (degree >= 168.75 && degree < 191.25) return "S";
    if (degree >= 191.25 && degree < 213.75) return "SSW";
    if (degree >= 213.75 && degree < 236.25) return "SW";
    if (degree >= 236.25 && degree < 258.75) return "WSW";
    if (degree >= 258.75 && degree < 281.25) return "W";
    if (degree >= 281.25 && degree < 303.75) return "WNW";
    if (degree >= 303.75 && degree < 326.25) return "NW";
    if (degree >= 326.25 && degree < 348.75) return "NNW";
  }
  let currentWindDirectionElement =
    document.querySelector("#wind-degree-today");
  let degree = response.data.wind.degree;
  let currentWindDirection = formatWindDirection(degree);
  let currentHumidityElement = document.querySelector("#humidity-today");
  let currentHumidity = response.data.temperature.humidity;

  function formatPressure(pressure) {
    if (pressure >= 1020) return "High";
    if (pressure >= 1000 && pressure < 1020) return "Normal";
    if (pressure >= 980 && pressure < 1000) return "Low";
    if (pressure >= 0 && pressure < 980) return "Very low";
  }
  let currentPressureElement = document.querySelector("#pressure-today");
  let pressure = Number(response.data.temperature.pressure);
  let currentPressure = formatPressure(pressure);

  cityElement.innerHTML = `${currentCity}, ${currentCountry}`;
  currentTemperatureElement.innerHTML = Math.round(currentTemperature);
  currentFeelsElement.innerHTML = Math.round(currentFeelsLike);
  currentdescriptionElement.innerHTML = `${currentDescription}`;
  currentWindSpeedElement.innerHTML = `${currentWindSpeed}Km/h`;
  currentWindDirectionElement.innerHTML = currentWindDirection;
  currentHumidityElement.innerHTML = `${currentHumidity}%`;
  currentPressureElement.innerHTML = `${currentPressure} (${pressure})`;
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
