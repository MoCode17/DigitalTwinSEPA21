const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var clockElement = document.getElementById('clock');

var currentDate = new Date();

function formatDate(date) {
    var dayOfWeek = weekday[date.getDay()];

    var day = date.getDate();

    if (day < 10) {
        day = '0' + day;
    }

    var month = date.getMonth() + 1;

    if (month < 10) {
        month = '0' + month;
    }

    var year = date.getFullYear()
    
    var hour = date.getHours();

    if (hour < 10) {
        hour = '0' + hour;
    }

    var minute = date.getMinutes();

    if (minute < 10) {
        minute = '0' + minute;
    }

    var second = date.getSeconds();

    if (second < 10) {
        second = '0' + second;
    }

    return `${dayOfWeek} ${day}/${month}/${year} ${hour}:${minute}:${second}`;

}

clockElement.textContent = formatDate(currentDate);


function clock() {
    currentDate = new Date();
    clockElement.textContent = formatDate(currentDate);
}

setInterval(clock, 1000);