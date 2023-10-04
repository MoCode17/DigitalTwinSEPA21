// The datetime input boxes for the month, time and date
const monthSelect = document.querySelector("#month_picker");
const timeSelect = document.querySelector("#time_picker");
const dateSelect = document.querySelector("#date_picker");

// The names of the months
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Creates a new date object based on today's date
var date = new Date();

// The monthSelect value requires a year and month e.g. (2023-10)
// The inital value is the current year and month
// The max range is the current year and month i.e. further months cannot be selected
currentMonth = date.getFullYear() + '-' + (date.getMonth() + 1);
monthSelect.value = currentMonth;
monthSelect.max = currentMonth;

// The timeSelect value is the time in the format (HH:mm) where HH is from 0-23
// Sets the default time to 12:00 AM
defaultTime = '00:00';
timeSelect.value = defaultTime;

// The dateSelect value is in the format (YYYY-MM-DD)
// Slice(-2) is used for month and date to ensure it is at least two characters
// Sets the date based on today's date
// The max range is the current date i.e. further dates cannot be selected
currentDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
dateSelect.value = currentDate;
dateSelect.max = currentDate;

// Updates the title for the month graph
function generateMonthTitle() {
    var x = document.getElementById("month_text");
    myDate = new Date(monthSelect.value + "-01");
    x.innerText = 'Average Temperature for ' + months[myDate.getMonth()] + ' ' + myDate.getFullYear();
};

// Updates the title for the time graph
function generateTimeTitle() {
    var y = document.getElementById("time_text");
    myDate = new Date(monthSelect.value + "-01 " + timeSelect.value + ":00");
    var timeTitle = "";
    if (myDate.getHours() < 12) {
        if (myDate.getHours() == 0){
            timeTitle = "12:00 AM";
        }
        else {
            timeTitle = myDate.getHours() + ":00 AM";
        }
    }
    else{
        if (myDate.getHours() == 12){
            timeTitle = "12:00 PM";
        }
        else {
            timeTitle = (myDate.getHours() - 12) + ":00 PM";
        }
    }
    y.innerText = "Temperature Distribution for " + timeTitle +  " for " + months[myDate.getMonth()] + ' ' + myDate.getFullYear();
};

// Updates the title for the date graph
function generateDayTitle() {
    var z = document.getElementById("date_text");
    myDate = new Date(dateSelect.value);
    title = 'Temperature Readings for ' + myDate.getDate() + ' ' + months[myDate.getMonth()] + ' ' + myDate.getFullYear();
    z.innerText = title;
};

// Generates the initial titles for the graphs
generateMonthTitle();
generateTimeTitle();
generateDayTitle();


// This function returns a graph
// Parameters needed are the chart data, chart id, date format, type of chart and if time is in UTC
function drawChart(data, chartId, format, type, utc) {
    // The options define the chart
    var options = {
        series: [{
            // The data for the chart
            data: data
            }],
        chart: {
            // Identifier for the chart
            id: chartId,
            // Type of chart (bar graph, line graph)
            type: type,
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
            // Boolean for whether datetime is in UTC
            datetimeUTC: utc,
            // Formatting of the datetime values
            format: format,
            show: true
          }
        }
    };

    var chart = new ApexCharts(
        document.querySelector("#" + chartId),
        options
    );
    return chart;
};

// Creates an array of charts to allow access
var charts = [];
// When initialising the charts, the data is empty 
data = [];
charts.push(drawChart(data, "chart1",'dd MMM', 'bar', false));
// charts[0] is the averages in a month bar graph
charts[0].render();
charts.push(drawChart(data, "chart2", 'HH:00', 'line', true));
// charts[1] is the graph for the hourly readings in a day
charts[1].render();
charts.push(drawChart(data, "chart3", 'dd MMM', 'bar', true));
// charts[2] is the graph that shows each reading for an hour in a month
charts[2].render();

// Initialises month graph with data from db
// Parameter is the month in integer (1-12)
var url = '/selectmonth';
$.getJSON(url, 
    {month:date.getMonth() + 1}
    ,function(response) {
    data = response;
    charts[0].updateSeries([{
        name: "Temperature",
        data: data
    }]);
});

// Updates date graph with data from db
// Parameter is date in format (YYYY-MM-DD)
url = '/selectdate';
$.getJSON(url, 
    {date: currentDate},
    function(response) {
    data = response;
    charts[1].updateSeries([{
        name: "Temperature",
        data: data
    }]);
});

// Updates date graph with data from db using the JQuery getJSON function
// Parameters are date in integer (1-12) and time in format (HH:mm) 
url = '/selecttime';
$.getJSON(url, 
    {month: date.getMonth() + 1,
    time: defaultTime},
    function(response) {
    data = response;
    charts[2].updateSeries([{
        name: "Temperature",
        data: data
    }]);
});

// Function for when month input is changed
monthSelect.onchange = () => {
    generateMonthTitle();
    myDate = new Date(monthSelect.value + "-01");
    var month = myDate.getMonth() + 1; 

    url = '/selectmonth';
    $.getJSON(url, 
        {month: month},
        function(response) {
        data = response;
        charts[0].updateSeries([{
            data: data
        }]);
    });

    generateTimeTitle();
    var time = timeSelect.value;
    myDate = new Date(monthSelect.value + "-01 " + time + ":00");
    var month = myDate.getMonth() + 1;     
        
    url = '/selecttime';
    $.getJSON(url, 
        {month: month,
        time: time},
        function(response) {
        data = response;
        charts[2].updateSeries([{
            data: data
        }]);
    });
};

// Function for when date input is changed
dateSelect.onchange = () => {
    generateDayTitle();
    var date = dateSelect.value;

    url = '/selectdate';
    $.getJSON(url, 
        {date: date},
        function(response) {
        data = response;
        charts[1].updateSeries([{
            data: data
        }]);
    });
};

// Function for when time input is changed
timeSelect.onchange = () => {
    generateTimeTitle();
    var time = timeSelect.value;
    myDate = new Date(monthSelect.value + "-01 " + time + ":00");
    var month = myDate.getMonth() + 1;     
        
    url = '/selecttime';
    $.getJSON(url, 
        {month: month,
        time: time},
        function(response) {
        data = response;
        charts[2].updateSeries([{
            data: data
        }]);
    });
};