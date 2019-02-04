//Get the location of the device
function place() {
  let long;
  let lat;
  let search;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //   const api = `${proxy}https://api.darksky.net/forecast/46be7b311c7390f8f3da28513525abed/${lat},${long}`;
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a339e025a95d6f5ed4cb3251bcfd566d&units=imperial`;
      // Fetching the data from the api
      fetch(api)
        .then(data => {
          // Converting the data to JSON
          return data.json();
        })
        .then(data => {
          console.log(data);
          // Call a fun
          results(data);
        });
    });
  } else {
    alert("Geolocation is not supported by this browser");
  }

  function results(data) {
    // Change BG
    switch (data.weather[0].main) {
      case "Thunderstorm":
        document.getElementById("myDiv").style.backgroundImage =
          "url('Thunderstorm.jpg')";
        break;

      case "Drizzle":
      case "Rain":
        document.getElementById("myDiv").style.backgroundImage =
          "url('Rain.jpeg')";
        break;

      case "Snow":
        document.getElementById("myDiv").style.backgroundImage =
          "url('Snow.jpg')";
        break;

      case "Clouds":
        document.getElementById("myDiv").style.backgroundImage =
          "url('Cloudy.jpg')";
        break;

      case "Clear":
        document.getElementById("myDiv").style.backgroundImage =
          "url('Clear.jpeg')";
        break;

      default:
        break;
    }
    console.log(`Weather is ${data.weather[0].main}`);

    let city = document.getElementById("city");
    let weatherDescription = document.getElementsByClassName(
      ".weatherDescription"
    );
    let tempDegree = document.getElementById("degree");
    let sunrise = document.getElementsByClassName(".sunrise");
    let sunset = document.getElementsByClassName(".sunset");
    let sunriseTime = document.getElementsByClassName(".sunriseTime");
    let sunsetTime = document.getElementsByClassName(".sunsetTime");

    city.innerHTML = data.name;
    tempDegree.innerHTML = Math.floor(data.main.temp) + "&#176"; //"&#176" temp symbol
  }
}

place();
