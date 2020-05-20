$(document).ready(function () {
  getHistoryButton();
  var previousSearches = JSON.parse((localStorage.getItem("Cities")));
  var city = previousSearches[previousSearches.length - 1];
  apiCall(city, state)
});

function getHistoryButton() {
  $(".city-buttons").empty();

  var previousSearches = JSON.parse((localStorage.getItem("Cities")));
  console.log(previousSearches);
  console.log("after history button");
  if (previousSearches)
    for (i = 0; i < previousSearches.length; i++) {
      var buttonNumb = (previousSearches[i]);


      console.log(buttonNumb + " button numb");
      var button = `<div> <button class='history btn-sm btn-block btn-dark ${i}' id='${buttonNumb}'>${buttonNumb}</button ></div >`;
      $(".city-buttons").append(button);
      if (i === 0) {
        // $(i).trigger("click");
        // console.log("this was was i auto click")
        // console.log(i);
        // apiCall(buttonNumb);
      }
    }
}

$('#submit').on('click', function (event) {
  event.preventDefault();
  var city = $('#city').val();
  var state = $('#state').val();
  console.log(state + " this is the state");
  console.log(city + " this is the city line 36")
  city = (city + '&nbsp' + state);
  console.log(" city to pass to array")

  saveLocal(city, state);
  apiCall(city, state)
  $('#fiveDayForcast').show();
});
var cardGroupEL = $(".card-group");
var cityButtons = $(".city-buttons");

$(cityButtons).on("click", historyBtnClick);
function historyBtnClick(event) {
  var city = (event.target.innerHTML);
  var state = city.substr(city.length - 2);
  console.log(state);
  console.log(city);
  apiCall(city);
}

function apiCall(city, state) {
  var apiKey = "fc7d6009fecedb9c2112c94508ea6850";
  var state = $('#state').val();
  var country = "US"
  var apiURL = encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}&units=imperial`);
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
  var currentTime = (new Date().getTime() + " current time");
  var currentDate = moment().format('MMMM Do YYYY');
  console.log(currentDate + " moment current date");
  var pulledWeather = "";
  var pulledWeatherIcon = "";

  $(currentInfoidEL).empty();
  $.ajax({
    url: apiURL,
    method: "GET",
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      var cityArray = [];
      pulledCityName = response.name;
      cityArray.push(pulledCityName + "  " + currentDate);

      pulledWeather = response.weather[0].main;

      cityArray.push(pulledWeather);

      pulledWeatherIcon = (response.weather[0].icon)
      var iconURL = "https://openweathermap.org/img/w/" + pulledWeatherIcon + ".png";
      var iconURLAppend = $('<img src=' + iconURL + ' height="80px" width="80px">');
      cityArray.push(iconURLAppend);

      pulledTemp = response.main.temp;
      cityArray.push("Temperature: " + pulledTemp + " F");

      pulledRealFeel = response.main.feels_like;
      cityArray.push("Real Feel: " + pulledRealFeel + " F");

      pulledHumidity = response.main.humidity;
      cityArray.push("Humidity: " + pulledHumidity + "%");

      pulledWind = response.wind.speed;
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
        uvValue = cityArray[i];
        if (i === 7) {

          uvIndexbody = `<div class="uv-index"
          <p>UV Iindex:${cityArray[i]}</p>
          </div>`;
          $(dayCardBody).append(uvIndexbody);
          if (uvValue <= 2.99) {
            $('.uv-index').addClass('uv-index-low');
          }
          else if (uvValue <= 5.99) {
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
        }
        else {
          $(dayCardBody).append(cityArray[i]).append('<br>');
        }
      }
      getHistoryButton();
    });
}
function fiveDayForcast(apiKey, city, state, country, fiveDayForcastEL, addPara) {
  cardGroupEL = $(".card-group");
  $(cardGroupEL).empty();
  var prevLoop;
  var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&appid=${apiKey}&units=imperial`;
  // console.log(fiveDayURL + " api url in five day forcast URL")
  $.ajax({
    url: fiveDayURL,
    method: "GET",
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      prevLoop = response.list[0].dt_txt;
      prevLoop = prevLoop.substring(5, 10);
      cardHeader = $('.card-header');
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

        // console.log("hit the if");
        arrayToPushTo.push(currentDay);
        iconURL = response.list[i].weather[0].icon;
        // console.log(iconURL + " icon url")
        var iconURL = "https://openweathermap.org/img/w/" + iconURL + ".png";
        var iconURLAppend = $('<img src=' + iconURL + ' height="60px" width="60px">');
        $(cardBody).append(iconURLAppend);
        $(cardBody).append("<br>");
        // arrayToPushTo.push(iconURLAppend);
        temp = response.list[i].main.temp;
        $(cardBody).append("Temp: " + temp + " F" + "<br>" + "<br>");
        humidity = response.list[i].main.humidity;
        $(cardBody).append("Humidity: " + humidity + "%");
      }
    }
    );
}
function saveLocal(city, state) {
  var cities = JSON.parse((localStorage.getItem("Cities"))) || [];
  cities.unshift(city);
  if (cities.length > 8) {
    cities.pop();
  }
  localStorage.setItem("Cities", JSON.stringify(cities));
}

