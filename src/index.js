function refreshWeather(response) {
  let currentDateElement = document.querySelector("#current-date-time");
  let date = new Date(response.data.time * 1000);
  let cityElement = document.querySelector("#city-name");
  let currentCity = response.data.city;
  let countryElement = document.querySelector("#country-name");
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
  let degree = response.data.wind.degree;
  let currentWindDirection = formatWindDirection(degree);
  let currentHumidityElement = document.querySelector("#humidity-today");
  let currentHumidity = response.data.temperature.humidity;
  let currentPressureElement = document.querySelector("#pressure-today");
  let pressure = Number(response.data.temperature.pressure);
  let currentPressure = formatPressure(pressure);
  let iconElement = document.querySelector("#todays-icon");

  currentDateElement.innerHTML = formatDate(date);
  cityElement.innerHTML = `${currentCity}`;
  countryElement.innerHTML = `${currentCountry}`;
  currentTemperatureElement.innerHTML = Math.round(currentTemperature);
  currentFeelsElement.innerHTML = Math.round(currentFeelsLike);
  currentdescriptionElement.innerHTML = `${currentDescription}`;
  currentWindSpeedElement.innerHTML = `${currentWindSpeed}Km/h`;
  currentWindDirectionElement.innerHTML = currentWindDirection;
  currentHumidityElement.innerHTML = `${currentHumidity}%`;
  currentPressureElement.innerHTML = `${currentPressure} (${pressure})`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="weather-icon"
              class="todays-icon">`;

  getForecast(response.data.city);
}

function formatPressure(pressure) {
  if (pressure >= 1020) return "High";
  if (pressure >= 1000 && pressure < 1020) return "Normal";
  if (pressure >= 980 && pressure < 1000) return "Low";
  if (pressure >= 0 && pressure < 980) return "Very low";
}

function formatWindDirection(degree) {
  if (degree >= 348.75 || degree < 11.25) return `N (${degree})`;
  if (degree >= 11.25 && degree < 33.75) return `NNE (${degree})`;
  if (degree >= 33.75 && degree < 56.25) return `NE (${degree})`;
  if (degree >= 56.25 && degree < 78.75) return `ENE (${degree})`;
  if (degree >= 78.75 && degree < 101.25) return `E (${degree})`;
  if (degree >= 101.25 && degree < 123.75) return `ESE (${degree})`;
  if (degree >= 123.75 && degree < 146.25) return `SE (${degree})`;
  if (degree >= 146.25 && degree < 168.75) return `SSE (${degree})`;
  if (degree >= 168.75 && degree < 191.25) return `S (${degree})`;
  if (degree >= 191.25 && degree < 213.75) return `SSW (${degree})`;
  if (degree >= 213.75 && degree < 236.25) return `SW (${degree})`;
  if (degree >= 236.25 && degree < 258.75) return `WSW (${degree})`;
  if (degree >= 258.75 && degree < 281.25) return `W (${degree})`;
  if (degree >= 281.25 && degree < 303.75) return `WNW (${degree})`;
  if (degree >= 303.75 && degree < 326.25) return `NW (${degree})`;
  if (degree >= 326.25 && degree < 348.75) return `NNW (${degree})`;
}

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${day}/${month}`;
}

function getForecast(city) {
  let apiKey = "a2t477eebb3f98daaa0d6cf85ob51907";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <ul class="forecast">
        <li>
          <span class="day-date"
            ><span class="day" id="day-0">${formatDay(day.time)}</span>
            <div class="date" id="date-0">${formatForecastDate(
              day.time
            )}</div></span
          >

          <span class="temp">
            <div class="material-symbols-outlined">thermometer</div>
            <div class="stat data">
              ${Math.round(
                day.temperature.maximum
              )}°C <span class="temp-feels">${Math.round(
          day.temperature.minimum
        )}°C</span>
            </div>
          </span>

          <span class="forecast-icon">
            <img
              src="${day.condition.icon_url}"
              alt="weather-icon"
              class="forecast-icon"
            />
          </span>

          <span class="conditions">
            <div class="material-symbols-outlined"></div>
            <div class="description">${day.condition.description}</div>
          </span>

          <span class="wind">
            <div class="material-symbols-outlined">air</div>
            <div class="stat data">${day.wind.speed}Km/h</div>
          </span>

          <span class="humidity">
            <div class="material-symbols-outlined">water_drop</div>
            <div class="humity stat data">${day.temperature.humidity}%</div>
          </span>
        </li>
      </ul>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#city-search");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Manchester");
