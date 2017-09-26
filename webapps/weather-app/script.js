
var f_temperature;
var c_temperature;
//gets location from browser
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//makes api call to darksky based on location
function getWeather(position) {
          data = $.ajax({
            type: "GET",
            url: "https://api.darksky.net/forecast/" + "8976e9c57b0474e810150ad09fd6d933" + "/" + position.coords.latitude + "," + position.coords.longitude,
            dataType: 'jsonp',
            success: function(data){
              $('#weather-condition').append(data.currently.summary);
             $('#temperature').append(data.currently.apparentTemperature);
              setIcon(data.currently.icon);
              f_temperature = data.currently.apparentTemperature
              c_temperature = (f_temperature-32)*5/9
            }
          });

//sets icon based on conditions from JSON
function setIcon(icon) {
  switch(icon) {
    case "clear-day":
        $('i').addClass("wi-day-sunny");
        break;
    case "clear-night":
        $('i').addClass("wi-night-clear");
        break;
    case "rain":
        $('i').addClass("wi-rain");
        break;
    case "snow":
         $('i').addClass("wi-snow");
        break;
    case "sleet":
         $('i').addClass("wi-sleet");
        break;
    case "wind":
        $('i').addClass("wi-windy");
        break;
      case"fog":
         $('i').addClass("wi-day-fog");
        break;
    case "cloudy":
        $('i').addClass("wi-cloudy");
        break;
    case "partly-cloudy-day":
        $('i').addClass("wi-day-cloudy");
        break;
    case "partly-cloudy-night":
         $('i').addClass("wi-night-alt-cloudy");
        break;
    default:
         $('i').addClass("wi-thermometer");
}

}
};


//function to switch temp between C & f. has to wait for page to load.
$(document).ready(function(){
  $('#tempswitch').on('click', function() {
window.navigator.vibrate(200);
    if ($('#degree').hasClass('wi-fahrenheit')) {
      $('#temperature').html(c_temperature.toFixed(2));
    } else {
      $('#temperature').html(f_temperature.toFixed(2));
    }
    $('#degree').toggleClass('wi-fahrenheit wi-celsius');
  });
});
