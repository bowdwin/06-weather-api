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

// $('#fiveDayForcast').hide();


$('#submit').on('click', function (event) {
  event.preventDefault();
  apiCall()
  $('#fiveDayForcast').show();
});
var cardGroupEL = $(".card-group");



function apiCall() {

  var apiKey = "fc7d6009fecedb9c2112c94508ea6850";
  var city = $('#city').val();
  var state = $('#state').val();
  var country = "US"
  var apiURL = encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}&units=imperial`);
  //forcase
  var addPara = $('<p>');
  var pulledCityName;
  var pulledTemp;
  var pulledRealFeel;
  var pulledHumidity;
  var pulledWind;
  var pulledLatitiude;
  var pulledLongitude;
  var currentInfoidEL = $("#currentInfo");
  var fiveDayForcastEL = $("#fiveDayForcast");
  // fiveDayForcast
  var currentTime = (new Date().getTime() + " current time");
  var currentDate = moment().format('MMMM Do YYYY');
  console.log(currentDate + " moment current date");
  var pulledWeather = "";
  var pulledWeatherIcon = "";

  $(currentInfoidEL).empty();

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

      pulledRealFeel = response.main.feels_like;
      console.log(pulledRealFeel);
      cityArray.push("Real Feel: " + pulledRealFeel + " F");

      pulledHumidity = response.main.humidity;
      // console.log(pulledHumidity);
      cityArray.push("Humidity: " + pulledHumidity + "%");

      pulledWind = response.wind.speed;
      console.log("Wind Speed: " + pulledWind + " mph");
      cityArray.push("Wind Speed: " + pulledWind + " mph");

      pulledLatitiude = response.coord.lat;
      pulledLongitude = response.coord.lon;


      pulledUVIndex = uvIndex(pulledLatitiude, pulledLongitude, apiKey, cityArray, currentInfoidEL, addPara);
      fiveDayForcast(apiKey, city, state, country, fiveDayForcastEL, addPara);
    });


}


function uvIndex(lat, lon, APIkey, cityArray, currentInfoidEL, addPara) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIkey}&lat=${lat}&lon=${lon}&units=imperial`;
  $.ajax({
    url: apiUrl,
    method: "GET",
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the queryURL

      uvValue = response.value;
      cityArray.push(uvValue);
      dayCard = `<div class="card text-white bg-dark mb-3 rounded main-card-style">
      <div class="card-body body day-card-body">
        
      </div>
    </div>`;

      $(currentInfoidEL).append(dayCard);
      dayCardBody = $('.day-card-body');

      for (var i = 0; i < cityArray.length; i++) {
        // $(currentInfoidEL).append(addPara).append(cityArray[i]).append('<br>');
        console.log(i + " i in forloop");
        console.log(cityArray);
        uvValue = cityArray[i];
        console.log(uvValue + " uv value")
        if (i === 7) {

          uvIndexbody = `<div class="uv-index"
          <p>${cityArray[i]}</p>
          </div>`;
          console.log(typeof uvValue);
          console.log(uvValue + " uv value in console");
          console.log(cityArray[i]);
          console.log("city array i");
          $(dayCardBody).append(uvIndexbody);

          console.log
          // uvValue = parseFloat(uvValue);
          // console.log(typeof uvValue);

          if (uvValue <= 2.99) {
            $('.uv-index').addClass('uv-index-low');
          }
          else if (uvValue <= 5.99) {
            console.log("hit 5.99")
            $('.uv-index').addClass('uv-index-moderate');
          }
          else if (uvValue <= 7.99) {
            $('.uv-index').addClass('uv-index-high');
          }
          else if (uvValue <= 10.99) {
            $('.uv-index').addClass('uv-index-very-high');
          }
          else {
            $('.uv-index').addClass('uv-index-extreme');
          };
          $('.uvIndex').prepend("content");
          $('.uvIndex')prepend(content);
        }
        else {
          console.log(cityArray);
          console.log('before city array')
          console.log(cityArray[i]);
          $(dayCardBody).append(cityArray[i]).append('<br>');
        }


      }


    });

}

function fiveDayForcast(apiKey, city, state, country, fiveDayForcastEL, addPara) {

  cardGroupEL = $(".card-group");
  $(cardGroupEL).empty();
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

      cardHeader = $('.card-header');
      // $(currentInfoidEL).append(card);
      // var cardGroupEl = $(".card-group");
      // $(currentInfoidEL).append(addPara).append(cityArray[i]).append('<br>');
      arrayToPushTo = [];
      for (i = 3; i < response.list.length; i += 8) {


        card = `<div class="card text-white bg-dark mb-3 card-padding rounded">
        <div class="card-header header${i}"></div>
        <div class="card-body body${i}">
          
        </div>
      </div>`;

        $(cardGroupEL).append(card);
        cardBody = $('.body' + i);
        cardHeader = $('.header' + i);



        var temp;
        var humidity;
        var iconURL;
        var iconURLAppend;

        // console.log(i);
        var currentDay;
        currentDay = response.list[i].dt_txt
        // console.log(currentDay);
        currentDay = currentDay.substring(5, 10)

        $(cardHeader).append(currentDay);

        console.log("hit the if");
        arrayToPushTo.push(currentDay);
        iconURL = response.list[i].weather[0].icon;
        console.log(iconURL + " icon url")
        var iconURL = "https://openweathermap.org/img/w/" + iconURL + ".png";
        var iconURLAppend = $('<img src=' + iconURL + ' height="60px" width="60px">');
        $(cardBody).append(iconURLAppend);
        $(cardBody).append("<br>");
        // arrayToPushTo.push(iconURLAppend);
        temp = response.list[i].main.temp;
        $(cardBody).append("Temp: " + temp + " F" + "<br>" + "<br>");

        // arrayToPushTo.push(temp);
        console.log(temp);
        humidity = response.list[i].main.humidity;
        $(cardBody).append("Humidity: " + humidity + "%");
        console.log(humidity);
      }
      console.log(arrayToPushTo);

    }

    );
  // console.log(arrayToPushTo);
  // console.log(response + " response of curretnweatherFunc");
}

function pullLocalStorage() {

}
