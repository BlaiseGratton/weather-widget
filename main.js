var forecast10day;

function getWeatherData(data){
  forecast10Day = data;
  console.log(forecast10Day);
  var $list = document.getElementById("five-day-forecast");
  $list.innerHTML = "";
  for (var i = 0; i < 5; i++) {
    addDayToList(i);
  }
}

function addDayToList(index){
  var day = forecast10Day.forecast.simpleforecast.forecastday[index];
  var $target = document.getElementById("five-day-forecast");
  var $div = document.createElement("div");
  var $li = document.createElement("li");
  var $day = document.createElement("h4");
  var $high = document.createElement("p");
  var $low = document.createElement("p");
  var $img = document.createElement("img");
  $day.textContent = day.date.weekday;
  $high.textContent = ("High of " + day.high.fahrenheit);
  $low.textContent = ("Low of " + day.low.fahrenheit);
  $img.src = day.icon_url;
  $div.appendChild($day);
  $div.appendChild($high);
  $div.appendChild($low);
  $div.appendChild($img);
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

function getJSONP(url, cbName){
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
    getJSON(coordUrl, function(data){
      var geoData = data;
      console.log(geoData);
      var zip = geoData.results[1].address_components[0].long_name;
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
  var $form = document.getElementById("submit-zipcode");
  $form.addEventListener("submit", function(event){
    event.preventDefault();

    var $zip = document.getElementById("zip-code-input").value;
    var test = Number($zip);
    var length = $zip.length;
    console.log(test);
    console.log(length);
    if (typeof test === "number" && length === 5) {
      var url = 'http://api.wunderground.com/api/c5c13a87b815793c/forecast10day/q/' + $zip + '.json';
      getJSONP(url, 'getWeatherData');
    }
    else {
      alert("Please enter a valid zip code.");
    }
  }); 
  var $form2 = document.getElementById("submit-geolocate");
  $form2.addEventListener("submit", function(event){
    event.preventDefault();
    locate();
  });

  if ("geolocation" in navigator) {
     console.log("geolocation available");
  } else {
    alert("Geolocation not available currently");
  }  
  
});
