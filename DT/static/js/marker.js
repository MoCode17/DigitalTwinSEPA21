computer_icon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div><i class='material-icons'>computer</i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });

  lightbulb_icon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#FFFF00;' class='marker-pin'></div><i class='material-icons'>lightbulb_outlined</i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });

  door_icon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#0000CC;' class='marker-pin'></div><i class='material-icons'>door_front_outlined</i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });

  sensor_icon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#FF8000;' class='marker-pin'></div><i class='material-icons'>sensors</i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });

  thermostat_icon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#FF0000;' class='marker-pin'></div><i class='material-icons'>thermostat</i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });

  var computerMarkerPopup = L.popup().setContent('<img src="../static/img/desktop-computer.png" alt=" " width="80" height="80"/><br/> <b>Computer</b><br/><b style="color:green;">On</b><br/><div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked></div>');
  var lightMarkerPopup = L.popup().setContent('<img src="../static/img/bulb.png" alt=" " width="80" height="80"/><br/> <b>Light</b>');
  var doorMarkerPopup = L.popup().setContent('<img src="../static/img/door-open.png" alt=" " width="80" height="80"/><br/> <b>Door</b><br/><b style="color:green;">Open</b><br/><button type="button" class="btn btn-outline-danger btn-sm "style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Close</button>');
  var sensor1MarkerPopup = L.popup().setContent('<img src="../static/img/sensor.png" alt=" " width="80" height="80"/><br/> <b>Sensor 4</b><br/><b style="color:red;">Temperature</b> <b>19.40 °C</b><br/><b style="color:blue;">Humidity</b> <b>49%</b><br/><button type="button" class="btn btn-outline-primary btn-sm "style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">View</button>');
  var sensor2MarkerPopup = L.popup().setContent('<img src="../static/img/sensor.png" alt=" " width="80" height="80"/><br/> <b>Sensor 3</b><br/><b style="color:red;">Temperature</b> <b>19.30 °C</b><br/><b style="color:blue;">Humidity</b> <b>50%</b><br/><button type="button" class="btn btn-outline-primary btn-sm "style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">View</button>');
  var sensor3MarkerPopup = L.popup().setContent('<img src="../static/img/sensor.png" alt=" " width="80" height="80"/><br/> <b>Sensor 1</b><br/><b style="color:red;">Temperature</b> <b>19.40°C</b><br/><b style="color:blue;">Humidity</b> <b>49%</b><br/><button type="button" class="btn btn-outline-primary btn-sm "style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">View</button>');
  var sensor4MarkerPopup = L.popup().setContent('<img src="../static/img/sensor.png" alt=" " width="80" height="80"/><br/> <b>Sensor 2</b><br/><b style="color:red;">Temperature</b> <b>19.20°C</b><br/><b style="color:blue;">Humidity</b> <b>50%</b><br/><button type="button" class="btn btn-outline-primary btn-sm "style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">View</button>');
  var thermostatMarkerPopup = L.popup().setContent('<img src="../static/img/temperature.png" alt=" " width="80" height="80"/><br/> <b>Thermostat</b><br/><b style="color:red;"> Off<br/><div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck"></div>');

  L.marker([270, 280], { icon: computer_icon }).bindPopup(computerMarkerPopup).addTo(map);
  L.marker([270, 328], { icon: computer_icon }).bindPopup(computerMarkerPopup).addTo(map);
  L.marker([224, 464], { icon: computer_icon }).bindPopup(computerMarkerPopup).addTo(map);
  L.marker([290, 465], { icon: computer_icon }).bindPopup(computerMarkerPopup).addTo(map);
  L.marker([340, 464], { icon: computer_icon }).bindPopup(computerMarkerPopup).addTo(map);
  L.marker([395, 462], { icon: computer_icon }).bindPopup(computerMarkerPopup).addTo(map);
  L.marker([470, 328], { icon: computer_icon }).bindPopup(computerMarkerPopup).addTo(map);
  L.marker([470, 400], { icon: computer_icon }).bindPopup(computerMarkerPopup).addTo(map);
  L.marker([140, 480], { icon: lightbulb_icon }).bindPopup(lightMarkerPopup).addTo(map);
  L.marker([75, 480], { icon: door_icon }).bindPopup(doorMarkerPopup).addTo(map);
  L.marker([40, 450], { icon: sensor_icon }).bindPopup(sensor1MarkerPopup).addTo(map);
  L.marker([450, 450], { icon: sensor_icon }).bindPopup(sensor2MarkerPopup).addTo(map);
  L.marker([40, 45], { icon: sensor_icon }).bindPopup(sensor3MarkerPopup).addTo(map);
  L.marker([450, 45], { icon: sensor_icon }).bindPopup(sensor4MarkerPopup).addTo(map);
  L.marker([350, 20], { icon: thermostat_icon }).bindPopup(thermostatMarkerPopup).addTo(map);