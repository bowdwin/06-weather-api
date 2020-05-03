// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast




$('#submit').on('click', function (event) {
  event.preventDefault();
  apiCall()
});



function apiCall() {
  var apiKey = "fc7d6009fecedb9c2112c94508ea6850";
  var city = $('#city').val();
  var state = $('#state').val();
  var country = "US"
  var apiURL = encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}&units=imperial`);
  //forcase
  var addPara = $('<p>');
  var pulledCityName = "";
  var pulledTemp = "";
  var pulledRealFeel = "";
  var pulledHumidity = "";
  var pulledWind = "";
  var pulledLatitiude = "";
  var pulledLongitude = "";
  var currentInfoidEL = $("#currentInfo");

  console.log(apiURL);
  $.ajax({
    url: apiURL,
    method: "GET",
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the queryURL
      var cityArray = [];
      console.log(response);
      // Log the resulting object
      pulledCityName = response.name;
      cityArray.push(pulledCityName);
      // $(currentInfoidEL).append(addPara).append(pulledCityName);
      console.log(pulledCityName);

      pulledTemp = response.main.temp;
      console.log(pulledTemp);
      cityArray.push("Temperature: " + pulledTemp + " F");


      pulledRealFeel = response.main.feels_like;
      console.log(pulledRealFeel);
      cityArray.push("Real Feel: " + pulledRealFeel + " F");

      pulledHumidity = response.main.humidity;
      console.log(pulledHumidity);
      cityArray.push("Humidity: " + pulledHumidity + "%");

      pulledWind = response.wind.speed;
      console.log("Wind Speed: " + pulledWind + " mph");
      cityArray.push("Wind Speed: " + pulledWind + " mph");

      pulledLatitiude = response.coord.lat;
      console.log(pulledLatitiude);
      // cityArray.push(pulledLatitiude);

      pulledLongitude = response.coord.lon;
      console.log(pulledLongitude);
      // cityArray.push(pulledLongitude);


      pulledUVIndex = "65";
      console.log("Wind Speed: " + pulledUVIndex + " mph");
      cityArray.push("UV Index: " + pulledUVIndex + " uv");


      console.log(cityArray);
      for (var i = 0; i < cityArray.length; i++) {
        console.log($(currentInfoidEL).append(addPara).append(cityArray[i]).append('<br>'));

      }


      // #currentInfo
    });
  // .then(function (response) {
  //   $('#movie-view').text(JSON.stringify(response));
  // });

}


function currentWeather() {

}

function fiveDayForcast() {

}

function pullLocalStorage() {

}