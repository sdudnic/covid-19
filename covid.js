const daysNumber = 8;

var startDate = new Date(Date.now());
startDate.setDate(startDate.getDate() - daysNumber);

var url = {
    "confirmed": "https://api.covid19api.com/live/country/france/status/confirmed",
    "deaths": "https://api.covid19api.com/live/country/france/status/deaths",
    "recovered": "https://api.covid19api.com/live/country/france/status/recovered",
};

var data = {};

// Load the Visualization API and the corechart package.
google.charts.load('current', {
    'packages': ['corechart']
});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

function getConfirmed() {
    return $.get(url.confirmed);
}

function getRecovered(confirmed) {
    confirmed = confirmed.filter(item => item.Province == "");
    confirmed = confirmed.slice(Math.max(confirmed.length - daysNumber, 0));
    for (const item of confirmed) {
        var theDate = new Date(Date.parse(item.Date));
        data.addRow([theDate, item.Cases, 0, 0]);
    }
    return $.get(url.recovered);
}

function getDeaths(recovered) {
    var row = 0;
    recovered = recovered.filter(item => item.Province == "");
    recovered = recovered.slice(Math.max(recovered.length - daysNumber, 0));
    for (const item of recovered) {
        data.setCell(row, 2, item.Cases);
        row++;
    }
    return $.get(url.deaths);
}

function finalize(deaths) {
    var row = 0;
    deaths = deaths.filter(item => item.Province == "");
    deaths = deaths.slice(Math.max(deaths.length - daysNumber, 0));
    for (const item of deaths) {
        data.setCell(row, 3, item.Cases);
        row++;
    }

    // Set chart options
    var options = {
        title: 'COVID-19 cases in France in the last ' + daysNumber + ' days',
        curveType: 'function',
        legend: {
            position: 'bottom'
        },
        colors: ['blue', 'green', 'red'],
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    data = new google.visualization.DataTable();

    data.addColumn("datetime", "Date");
    data.addColumn("number", "Confirmed");
    data.addColumn("number", "Recovered");
    data.addColumn("number", "Deaths");
    var formatter = new google.visualization.DateFormat({
        formatType: 'short',
        // pattern: 'dd/MM/yy'
    });
    formatter.format(data, 0);

    getConfirmed().then(getRecovered).then(getDeaths).then(finalize);
}