function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city-name");
  let countryElement = document.querySelector("#country-name");
  let currentTemperatureElement = document.querySelector("#todays-temp");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#city-search");
searchFormElement.addEventListener("submit", handleSearchSubmit);
