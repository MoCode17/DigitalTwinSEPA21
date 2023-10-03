var map = L.map('map', {
    crs: L.CRS.Simple,
    attributionControl: false
  });
  var bounds = [[0,0], [500,500]];
  var image = L.imageOverlay('../static/img/floorplan.png', bounds).addTo(map);
  map.fitBounds(bounds);