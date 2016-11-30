window.addEventListener('load', function(){
  geoLocation();
  //requestAPI();



});

var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
var param = '&appid=c12a55615c07c432d2378a22eae90c01&units=metric';

function geoLocation(){
  navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    requestAPI(lat, lon);
  })
}

function requestAPI(lat, lon){
  var url = baseUrl + 'lat='+lat+'&lon='+lon+param;
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function(response){
    if(req.readyState == 4){
      var jsonResponse = JSON.parse(req.responseText);
      showData(jsonResponse);
    }
  };
  req.send();
}

function showData(data){
  var html = '<table>';
  html += '<tbody><tr>';
  html += '<td>' + data.name + '</td>';
  html += '<td>' + data.main.temp + '</td>';
  html += '</tr></tbody></table>';
  document.getElementById('weather').innerHTML = html;
}
