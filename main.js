





function getWeatherData(data){
  var forecast10Day = data;
  console.log(forecast10Day);
  for (var i = 0; i < 5; i++) {
    addDayToList(i);
  }
  function addDayToList(index){
    var day = forecast10Day.forecast.simpleforecast.forecastday[index];
    var $target = document.getElementById("five-day-forecast");
    var $div = document.createElement("div");
    var $li = document.createElement("li");
    var $day = document.createElement("h4");
    var $high = document.createElement("p");
    var $low = document.createElement("p");
    $day.textContent = day.date.weekday;
    console.log($day);
    $high.textContent = ("High of " + day.high.fahrenheit);
    console.log($high);
    $low.textContent = ("Low of " + day.low.fahrenheit);
    console.log($low);
    $div.appendChild($day);
    $div.appendChild($high);
    $div.appendChild($low);
    $li.appendChild($div);
    $target.appendChild($li);
    
}

  
  
}

document.addEventListener('DOMContentLoaded', function(){
  var url = 'http://api.wunderground.com/api/c5c13a87b815793c/forecast10day/q/TN/Nashville.json';

  function getJSONP(url, cbName){
    var $script = document.createElement('script');
    $script.src = url + '?callback=' + cbName;
    document.body.appendChild($script);
  }

  getJSONP(url, 'getWeatherData');
    

});
