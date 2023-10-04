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

  function getDateString(readingTime) {
    var readingDate = new Date(readingTime);
    var readingDateStr = ("0" + readingDate.getDate()).slice(-2) + '/' + ("0" + (readingDate.getMonth() + 1)).slice(-2) + '/' + readingDate.getFullYear() + ' ' + ("0" + readingDate.getHours()).slice(-2) + ':' + ("0" + readingDate.getMinutes()).slice(-2) + ':' + ("0" + readingDate.getSeconds()).slice(-2);
    return readingDateStr;
  }

  function generateNodePopUp(nodeId, temperature, humidity, readingTime) {
    html = `<img src="../static/img/sensor.png" alt=" " width="80" height="80"/><br/> <b>Node ${nodeId}</b><br/><b style="color:red;">Temperature</b> <b>${temperature} °C</b><br/><b style="color:blue;">Humidity</b> <b>${humidity}%</b><br/><b>Reading Time</b></br><b>${readingTime}</b></br><a type="button" href="/view?nodeId=${nodeId}" class="btn btn-primary btn-sm "style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"><b style="color:White;">View Node ${nodeId}</b></a>`;
    return L.popup().setContent(html);
  }
  var computerMarkerPopup = L.popup().setContent('<img src="../static/img/desktop-computer.png" alt=" " width="80" height="80"/><br/> <b>Computer</b><br/><b style="color:green;">On</b><br/>');
  var lightMarkerPopup = L.popup().setContent('<img src="../static/img/bulb.png" alt=" " width="80" height="80"/><br/> <b>Light</b>');
  var doorMarkerPopup = L.popup().setContent('<img src="../static/img/door-open.png" alt=" " width="80" height="80"/><br/> <b>Door</b><br/><b style="color:green;">Open</b><br/>');
  var thermostatMarkerPopup = L.popup().setContent('<img src="../static/img/temperature.png" alt=" " width="80" height="80"/><br/> <b>Thermostat</b><br/><b style="color:red;"> Off<br/>');

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

  fetch('/latestreadings')
  .then((response) => response.json())
  .then((data) => {
    var sensor1MarkerPopup = generateNodePopUp(1, data[0]['reading_value'], data[1]['reading_value'], getDateString(data[0]['reading_time']));
    var sensor2MarkerPopup = generateNodePopUp(2, data[2]['reading_value'], data[3]['reading_value'], getDateString(data[2]['reading_time']));
    var sensor3MarkerPopup = generateNodePopUp(3, data[4]['reading_value'], data[5]['reading_value'], getDateString(data[4]['reading_time']));
    var sensor4MarkerPopup = generateNodePopUp(4, data[6]['reading_value'], data[7]['reading_value'], getDateString(data[6]['reading_time']));
    L.marker([450, 45], { icon: sensor_icon }).bindPopup(sensor1MarkerPopup).addTo(map);
    L.marker([450, 450], { icon: sensor_icon }).bindPopup(sensor2MarkerPopup).addTo(map);
    L.marker([40, 45], { icon: sensor_icon }).bindPopup(sensor3MarkerPopup).addTo(map);
    L.marker([40, 450], { icon: sensor_icon }).bindPopup(sensor4MarkerPopup).addTo(map);
  })
  .catch((error) => {
      console.error('Error fetching data:', error);
  });
  L.marker([350, 20], { icon: thermostat_icon }).bindPopup(thermostatMarkerPopup).addTo(map);