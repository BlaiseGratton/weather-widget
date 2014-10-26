var forecast10day;

function getWeatherData(data, column){
  forecast10Day = data;
  console.log(forecast10Day);
  for (var i = 0; i < 5; i++) {
    addDayToList(i, column);
  }
}

function addDayToList(index, column){
  var day = forecast10Day.forecast.simpleforecast.forecastday[index];
  var $target = document.getElementById("five-day-37217");
  var $div = document.createElement("div");
  var $li = document.createElement("li");
  var $day = document.createElement("h4");
  var $high = document.createElement("p");
  var $low = document.createElement("p");
  $day.textContent = day.date.weekday;
  $high.textContent = ("High of " + day.high.fahrenheit);
  $low.textContent = ("Low of " + day.low.fahrenheit);
  $div.appendChild($day);
  $div.appendChild($high);
  $div.appendChild($low);
  $li.appendChild($div);
  $target.appendChild($li);   
}

function getJSON(url, cb){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function(){
    cb(JSON.parse(xhr.responseText));
  };
  xhr.send();
}

function getJSONP(url, cbName, column){
  var $script = document.createElement('script');
  $script.src = url + '?callback=' + cbName;
  document.body.appendChild($script);
}




function locate(){
  navigator.geolocation.getCurrentPosition(success, error);
  function success(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
    var latlng = "latlng=" + latitude + "," + longitude;
    var coordUrl = 'https://maps.googleapis.com/maps/api/geocode/json?' + latlng + '&key=AIzaSyCrTE8aisnYZLkIS1t4E8xp8RQ4Vmaz_yU';
    console.log(coordUrl);
    var geoData;
    var zip;
    getJSON(coordUrl, function(data){
      geoData = data;
      console.log(geoData);
      zip = geoData.results[1].address_components[0].long_name;
      console.log(zip);
      var url = 'http://api.wunderground.com/api/c5c13a87b815793c/forecast10day/q/' + zip + '.json';
      getJSONP(url, 'getWeatherData');
    });  


  }
  function error(){
    console.log("unable to retrieve location");
  }
}


document.addEventListener('DOMContentLoaded', function(){
  var url = 'http://api.wunderground.com/api/c5c13a87b815793c/forecast10day/q/37217.json';

    
  var column = document.getElementById('zip-code-input');

  getJSONP(url, 'getWeatherData', column);
    
  var $form = document.getElementById("submit-form");
  $form.addEventListener("submit", function(event){
    event.preventDefault();

    var $zip = document.getElementById("zip-code-input").value;
    var test = Number($zip);
    var length = $zip.length;
    console.log(test);
    console.log(length);
    if (typeof test === "number" && length === 5) {
      var url = 'http://api.wunderground.com/api/c5c13a87b815793c/forecast10day/q/' + $zip + '.json';
      getJSONP(url, 'getWeatherData', column);
    }
    else {
      alert("Please enter a valid zip code.");
    }
  }); 
  var $form2 = document.getElementById("submit-geolocate");


  if ("geolocation" in navigator) {
     locate();
  } else {
    alert("Geolocation not available currently");
  }  
  
});
