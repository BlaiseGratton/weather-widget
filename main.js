function getWeatherData(data, column){
  var forecast10Day = data;
  console.log(forecast10Day);
  for (var i = 0; i < 5; i++) {
    addDayToList(i, column);
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
  
}

function locate(){
  console.log("hi");
  navigator.geolocation.getCurrentPosition(success, error);
  console.log("hi");
  function success(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.latitude;
    console.log(latitude);
  }
  function error(){
    console.log("unable to retrieve location");
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var url = 'http://api.wunderground.com/api/c5c13a87b815793c/forecast10day/q/37217.json';

  function getJSONP(url, cbName, column){
    var $script = document.createElement('script');
    $script.src = url + '?callback=' + cbName;
    document.body.appendChild($script);
  }
  
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
      getJSONP(url, 'getWeatherData');
    }
    else {
      alert("Please enter a valid zip code.");
    }
  }); 
  var $form2 = document.getElementById("submit-geolocate");


  if ("geolocation" in navigator) {
  } else {
    alert("Geolocation not available currently");
  }
  
  locate();
  
  
});
