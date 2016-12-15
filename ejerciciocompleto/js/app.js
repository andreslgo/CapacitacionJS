window.addEventListener('load', init);
var map;
var markers = [];


function init(){
    var height = window.innerHeight;
    document.getElementById('map').style.height = (height - 20) + 'px';
    initMap();
}

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  geoLocation();
  map.addListener('click', addMarker);
}

function addMarker(e){
  requestAPI(e.latLng.lat(), e.latLng.lng(), function(data){
    var marker = new google.maps.Marker({
      position: e.latLng,
      id: markers.length,
      data: {
        name: data.name,
        coord: data.coord,
        temp: data.main.temp,
        weather: data.weather[0].description,
        icon: data.weather[0].icon
      }
    });
    marker.setMap(map);
    marker.addListener('dblclick', removeMarker);
    markers.push(marker);
    buildTable();
  });
}

function removeMarker(e){
  var id = this.id;
  var tmpMarkers = [];
  for(i=0; i < markers.length; i++){
    if(markers[i].id != id){
      tmpMarkers.push(markers[i]);
    }
  }
  markers = tmpMarkers;
  this.setMap(null);
  buildTable();
}

function geoLocation(){
  navigator.geolocation.getCurrentPosition(function(position){
    var pos = {lat: position.coords.latitude, lng: position.coords.longitude};
    map.setCenter(pos);
  });
}

function requestAPI(lat, lon, callback){
  var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
  var param = '&appid=c12a55615c07c432d2378a22eae90c01&units=metric';
  var url = baseUrl + 'lat='+lat+'&lon='+lon+param;
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function(response){
    if(req.readyState == 4){
      var jsonResponse = JSON.parse(req.responseText);
      if(typeof callback  == 'function')
        callbackm.call(null, jsonResponse);
    }
  };
  req.send();
}

function buildTable(){
  var urlImg = 'http://openweathermap.org/img/w/';
  var htmlTable = '<table><thead>';
  htmlTable += '<tr><th class="left">Name</th><th class="left">Position</th><th class="right">Temp. C°</th><th class="left">Weather</th></tr></thead><tbody>';
  for(i in markers){
    htmlTable += '<tr class="row" id="row-' + markers[i].id +'"><td class="left">'+ markers[i].data.name + '</td>';
    htmlTable += '<td class="left">'+ markers[i].data.coord.lat +', '+ markers[i].data.coord.lon +'</td>';
    htmlTable += '<td class="right">'+ markers[i].data.temp + '</td>';
    htmlTable += '<td class="left"><img src="' + urlImg + markers[i].data.icon + '.png" />'+ markers[i].data.weather + '</td></tr>';
  }
  htmlTable += '</tbody></table>';
  document.getElementById('info').innerHTML = htmlTable;
  var rows = document.getElementsByClassName('row');
  for(var i = 0; i < rows.length; i++){
    rows[i].addEventListener('mouseover', changeMarker);
    rows[i].addEventListener('mouseout', defaultMarker);
  }
}

function changeMarker(){
  var id = this.id.replace('row-', '');
  for(var j = 0; j < markers.length; j++){
    if(markers[j].id == id){
      markers[j].setIcon('img/marker.png');
      markers[j].setAnimation(google.maps.Animation.BOUNCE);
    }
  }
}

function defaultMarker(){
  var id = this.id.replace('row-', '');
  for(var j = 0; j < markers.length; j++){
    if(markers[j].id == id){
      markers[j].setIcon(null);
      markers[j].setAnimation(null);
    }
  }
}
