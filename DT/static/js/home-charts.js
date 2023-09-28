var data = [];
var options = {
    series: [{
        data: data
        }],
    chart: {
        id: 'chart1',
        type: 'bar',
        height: 300,
        toolbar: {
            autoSelected: 'pan',
            show: false
        }
    },
stroke: {
    width: 3
    },
dataLabels: {
    enabled: false
},
fill: {
    opacity: 1,
    },
series: [],
noData: {
  text: 'Loading...'
},
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        format: 'dd MMM',
        show: true
      }
    }
};

var chart1 = new ApexCharts(
document.querySelector("#chart1"),
options
);

chart1.render();

var url = '/selectmonth';

$.getJSON(url, 
    {month:9}
    ,function(response) {
    data = response;
    chart1.updateSeries([{
        title:{ text: 'Daily Averages'},
        data: data
    }]);
});

var options = {
    series: [{
        data: data
        }],
    chart: {
        id: 'chart3',
        type: 'bar',
        height: 300,
        toolbar: {
            autoSelected: 'pan',
            show: false
        }
    },
stroke: {
    width: 3
    },
dataLabels: {
    enabled: false
},
fill: {
    opacity: 1,
    },
series: [],
noData: {
  text: 'Loading...'
},
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        format: 'dd MMM',
        show: true
      }
    }
};

var chart3 = new ApexCharts(
document.querySelector("#chart3"),
options
);

chart3.render()

url = '../static/json/hour.json';

$.getJSON(url, function(response) {
    data = response;
    chart3.updateSeries([{
        name: 'Temperature at 10:00 AM for September 2023',
        data: data
    }]);
});

options = {
  series: [{
        data: data
        }],
    chart: {
        id: 'chart2',
        type: 'line',
        height: 300,
        toolbar: {
            autoSelected: 'pan',
            show: false
        }
    },
stroke: {
    width: 3
    },
dataLabels: {
    enabled: false
},
fill: {
    opacity: 1,
    },
series: [],
noData: {
  text: 'Loading...'
},
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        format: 'HH:00',
        show: true
      }
    }
};

var chart2 = new ApexCharts(
document.querySelector("#chart2"),
options
);

chart2.render();

url = '../static/json/today.json';

$.getJSON(url, function(response) {
    data = response;
    chart2.updateSeries([{
        name: 'Temperature for September 22 2023',
        data: data
    }]);
});

const monthSelect = document.querySelector("#month_picker");
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
monthSelect.onchange = () => {
        var x = document.getElementById("month_text");
        myDate = new Date(monthSelect.value + "-01");
        // var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1; 
        title = 'Average Temperature for ' + months[myDate.getMonth()] + ' ' + myDate.getFullYear();
        x.innerText = title;
        url = '/selectmonth'
        $.getJSON(url, 
            {month: month},
            function(response) {
            data = response;
            chart1.updateSeries([{
                data: data
            }]);
        });
};

const timeSelect = document.querySelector("#time_picker");
timeSelect.onchange = () => {
        var y = document.getElementById("time_text");
        var timeTitle1 = "Temperature Distribution for "
        myDate = new Date(monthSelect.value + "-01 " + timeSelect.value + ":00");
        var timeTitle2 = "";
        if (myDate.getHours() < 12) {
            if (myDate.getHours() == 0){
                timeTitle2 = "12:00 AM for " + months[myDate.getMonth()] + ' ' + myDate.getFullYear();
            }
            else {
                timeTitle2 = myDate.getHours() + ":00 AM for " + months[myDate.getMonth()] + ' ' + myDate.getFullYear();
            }
        }
        else{
            if (myDate.getHours() == 12){
                timeTitle2 = "12:00 PM for " + months[myDate.getMonth()] + ' ' + myDate.getFullYear();
            }
            else {
                timeTitle2 = (myDate.getHours() - 12) + ":00 PM for " + months[myDate.getMonth()] + ' ' + myDate.getFullYear();
            }
        }
        
        // var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var time = timeSelect.value;
        //title = 'Average Temperature for ' + months[myDate.getMonth()] + ' ' + myDate.getFullYear();
        y.innerText = timeTitle1 + timeTitle2
        url = '/selecttime'
        $.getJSON(url, 
            {month: month,
            time: time},
            function(response) {
            data = response;
            chart3.updateSeries([{
                data: data
            }]);
        });
};

const dateSelect = document.querySelector("#date_picker");
dateSelect.onchange = () => {
        var z = document.getElementById("date_text");
        myDate = new Date(dateSelect.value);
        z.innerText = "Temperature for " + months[myDate.getMonth()] + " " + myDate.getDate() + " " + myDate.getFullYear();
        var date = dateSelect.value;
        url = '/selectdate'
        $.getJSON(url, 
            {date: date},
            function(response) {
            data = response;
            chart2.updateSeries([{
                data: data
            }]);
        });
};