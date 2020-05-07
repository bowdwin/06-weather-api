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
  var fiveDayForcastEL = $("#fiveDayForcast");
  fiveDayForcast
  var currentTime = (new Date().getTime() + " current time");
  var currentDate = moment().format('MMMM Do YYYY');
  console.log(currentDate + " moment current date");
  var pulledWeather = "";
  var pulledWeatherIcon = "";



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
      cityArray.push(pulledCityName + "  " + currentDate);
      // $(currentInfoidEL).append(addPara).append(pulledCityName);
      console.log(pulledCityName);

      pulledWeather = response.weather[0].main;

      console.log(pulledWeather + " pulled weather");
      cityArray.push(pulledWeather);


      pulledWeatherIcon = (response.weather[0].icon)
      var iconURL = "https://openweathermap.org/img/w/" + pulledWeatherIcon + ".png";
      var iconURLAppend = $('<img src=' + iconURL + ' height="80px" width="80px">');
      console.log(iconURLAppend + " iconurl append")
      console.log(iconURL + " this is icon URL");
      cityArray.push(iconURLAppend);

      pulledTemp = response.main.temp;
      console.log(pulledTemp);
      cityArray.push("Temperature: " + pulledTemp + " F");

      // currentDate = response.dt;
      // currentDate = new Date(currentDate).toLocaleDateString("en-US")

      // console.log(currentDate + " this is current date");

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

      pulledLongitude = response.coord.lon;

      pulledHumidity = response.main.humidity;
      console.log(pulledHumidity);
      cityArray.push("Humidity: " + pulledHumidity + "%");

      pulledUVIndex = uvIndex(pulledLatitiude, pulledLongitude, apiKey, cityArray, currentInfoidEL, addPara);
      fiveDayForcast(apiKey, city, state, country, fiveDayForcastEL, addPara);
      // console.log(pulledUVIndex + " pulled uv index");
      // cityArray.push("UV Index: " + pulledUVIndex + " uv");
      // console.log(cityArray + " citty array")


      // console.log(cityArray);





      // #currentInfo
    });
  // .then(function (response) {
  //   $('#movie-view').text(JSON.stringify(response));
  // });

}


function uvIndex(lat, lon, APIkey, cityArray, currentInfoidEL, addPara) {
  console.log(APIkey + " api key")
  console.log(lat + " lat")
  console.log(lon + " lon")

  console.log(cityArray + " city array in uvindex");


  var apiUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIkey}&lat=${lat}&lon=${lon}&units=imperial`;
  console.log(apiUrl + " api url uv");


  $.ajax({
    url: apiUrl,
    method: "GET",
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the queryURL

      uvValue = response.value;
      cityArray.push("UV Index: " + uvValue + " uv");
      for (var i = 0; i < cityArray.length; i++) {
        $(currentInfoidEL).append(addPara).append(cityArray[i]).append('<br>');

      }


    });

}

function currentWeather(apiKey, city, state, country) {


}

function fiveDayForcast(apiKey, city, state, country, fiveDayForcastEL, addPara) {


  var prevLoop;


  var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&appid=${apiKey}&units=imperial`;
  console.log(fiveDayURL + " api url in five day forcast URL")
  $.ajax({
    url: fiveDayURL,
    method: "GET",
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the queryURL
      console.log(response);
      prevLoop = response.list[0].dt_txt;
      console.log(prevLoop);
      prevLoop = prevLoop.substring(5, 10);
      console.log(prevLoop);
      console.log(response.list.length)
      for (i = 0; i < response.list.length; i++) {
        arrayToPushTo = [];
        var pulledDate;
        var date;
        var weatherIcon;
        var temp;
        var humidity;
        var iconURL;
        var iconURLAppend;

        console.log(i);
        var currentDay;
        currentDay = response.list[i].dt_txt
        // console.log(currentDay);
        currentDay = currentDay.substring(5, 10)
        console.log(currentDay);
        console.log(prevLoop);


        // console.log(response.list[i].dt_txt)
        if (prevLoop === currentDay) {
          // create card and write to it
          console.log("hit the if");
          arrayToPushTo.push(currentDay);
          temp = response.list[i].main.temp;
          arrayToPushTo.push(temp);
          console.log(temp);
          humidity = response.list[i].main.humidity;
          console.log(humidity);
          arrayToPushTo.push(humidity);
          iconURL = response.list[i].weather[0].icon;
          console.log(iconURL + " icon url")
          var iconURL = "https://openweathermap.org/img/w/" + iconURL + ".png";
          var iconURLAppend = $('<img src=' + iconURL + ' height="80px" width="80px">');
          arrayToPushTo.push(iconURLAppend);
          // fiveDayForcastEL
          // $(currentInfoidEL).append(addPara).append(cityArray[i]).append('<br>');

        }
        else {
          // store current day in prev day
          prevLoop = currentDay;
          console.log(" hit the else");
        }

        for (var k = 0; k < arrayToPushTo.length; k++) {
          console.log(" hit forloop")

          $(fiveDayForcastEL).append(addPara).append(arrayToPushTo[k]).append('<br>');

        }

        // text += cars[i] + "<br>";
      }

    });
  // console.log(response + " response of curretnweatherFunc");
}

function pullLocalStorage() {

}
