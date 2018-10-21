$(document).ready(function() {
    setUpMap();
})

function setUpMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGRpZWpiYXdkZW4iLCJhIjoiY2ptb3NtZHhrMDAwazNwbDgzM2l4YjI1MSJ9.zCqzFmwVZoUGtTJgeZOMTw';
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v10'
  
  });
  map.on('load', function() {
    var mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
    var mapDiv = document.getElementById('map');
    var breakButton = document.getElementById('resizeDiv');
    var fixButton = document.getElementById('resizeMap');

    mapDiv.style.width = '100%';
    mapCanvas.style.width = '100%';
    mapDiv.style.height = '100%';
    mapCanvas.style.height = '100%';
    map.resize();
  });
}
