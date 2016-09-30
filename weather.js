$(document).ready(function() {
  var apiKey = "4977d701b304cb340642983338c9bdd4";
  var units = "metric";
  var tunit = " &deg;C";
  var speed = "meters/second";
  var pics = ["img/sun.svg", "img/flower.svg", "img/leaf.svg", "img/snowflake.svg"];

  $("#change").click(function() {
    if (units == "metric") {
      units = "imperial";
      tunit = " &deg;F";
      speed = "miles/hour"
      getWeather();
    }
    else {
      units = "metric";
      tunit = " &deg;C";
      speed = "meters/second";
      getWeather();
    }
  });

  getWeather();

  function getWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var apisrc = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat="
        + lat + "&lon=" + lng + "&appid=" + apiKey + "&units=" + units;

        $.getJSON(apisrc, function(json) {
          var city = json.name;
          var temp = +(json.main.temp);
          var pressure = json.main.pressure;
          var wind = json.wind.speed;
          var clouds = json.clouds.all;

          changeSeason(temp);

          var html = "";
          html += "<h3>Hello, " + city + "!</h3>";
          html += "<p>temperature: " + temp + tunit + "</p>";
          html += "<p>pressure: " + pressure + " hPa</p>";
          html += "<p>wind speed: " + wind + " " + speed + "</p>";
          html += "<p>cloudy: " + clouds + "%</p>";
          $("#info").html(html);
          $("#change").css({"display": "inline-block"});
        });
      });
    }
    else {
      alert("Please allow geolocation");
    }
  }

  function changeSeason(temp) {

    var c_thresholds = [0, 15, 25];
    var f_thresholds = [32, 59, 77];

    var thresholds;

    if (units == "metric") {
      thresholds = c_thresholds;
    }  else {
      thresholds = f_thresholds;
    }

    if (temp <= thresholds[0]) {
      $("#season").html("<img class='wimg' src='" + pics[3] +"'/>");
      $("body").css('background-color', "#3B8EA5");
    }  else if (temp <= thresholds[1]) {
      $("#season").html("<img class='wimg' src='" + pics[2] +"'/>");
      $("body").css('background-color', "#F4A259");
    }  else if (temp <= thresholds[2]) {
      $("#season").html("<img class='wimg' src='" + pics[1] +"'/>");
      $("body").css('background-color', "#8CB369");
    }  else {
      $("#season").html("<img class='wimg' src='" + pics[0] +"'/>");
      $("body").css('background-color', "#F4E285");
    }
  }

});
