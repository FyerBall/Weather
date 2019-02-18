let searchInput = document.getElementById("search_input");

// Getting the value from input
document.querySelector(".search__btn").addEventListener("click", function() {
  let searchValue = searchInput.value;
  // Check value
  if (searchValue <= 0) {
    // console.log("No input");
  } else {
    getWeather(searchValue);
    searchInput.value = "";
  }
});

// Get weather data from api
function getWeather(searchValue) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=a339e025a95d6f5ed4cb3251bcfd566d&units=imperial`
  )
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      // Change city name from defult to input
      document.getElementById("city").innerHTML = data.name;
      document.getElementById("weatherDescription").innerHTML =
        data.weather[0].description;
      document.getElementById("degree").innerHTML = Math.floor(data.main.temp);
      document.querySelector(".weather__temp--symbol").style.visibility =
        "visible";
      document.querySelector(".temp__low").innerHTML = Math.floor(
        data.main.temp_min
      );
      document.querySelector(".temp__high").innerHTML = Math.floor(
        data.main.temp_max
      );
    });
}
