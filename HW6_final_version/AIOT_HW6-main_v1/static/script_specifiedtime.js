function fetchData() {
    let startDateTime = document.getElementById('startDateTime').value;
    let endDateTime = document.getElementById('endDateTime').value;

    // 確保日期時間包含秒
    startDateTime += ':00';
    endDateTime += ':00';

    if (!startDateTime || !endDateTime) {
        alert("Please select both start and end date-times.");
        return;
    }

    if (new Date(startDateTime) >= new Date(endDateTime)) {
        console.error("End date-time validation failed:", startDateTime, endDateTime);
        alert("End date-time must be later than start date-time.");
        return;
    }

    const url = `/get_data?start_time=${encodeURIComponent(startDateTime)}&end_time=${encodeURIComponent(endDateTime)}`;
    console.log("Fetching data from:", url);  // Log the fetch URL

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log data for debugging
            if (data.error) {
                alert("Error fetching data: " + data.error);
                console.error("Error fetching data:", data.error);
                return;
            }
            if (data.length === 0) {
                alert("No data available for the selected time range.");
                console.warn("No data fetched for range:", startDateTime, "to", endDateTime);
                return;
            }

            // 繪製圖表
            Highcharts.chart('data-chart-container', {
                time: {
                    useUTC: false  // Highcharts 使用本地時區
                },
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: 'Temperature and Humidity Over Time'
                },
                xAxis: {
                    type: 'datetime',
                    title: {
                        text: 'Date and Time'
                    }
                },
                yAxis: [{
                    title: {
                        text: 'Temperature'
                    },
                    opposite: true
                }, {
                    title: {
                        text: 'Humidity'
                    }
                }],
                series: [{
                    name: 'Temperature',
                    type: 'line',
                    yAxis: 0,
                    data: data.map(item => [new Date(item.timestamp).getTime(), item.temperature]),
                    tooltip: {
                        valueSuffix: ' °C'
                    }
                }, {
                    name: 'Humidity',
                    type: 'column',
                    yAxis: 1,
                    data: data.map(item => [new Date(item.timestamp).getTime(), item.humidity]),
                    tooltip: {
                        valueSuffix: ' %'
                    }
                }]
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert("Failed to fetch data. Please check the console for more details.");
        });
}

document.getElementById('fetchDataBtn').addEventListener('click', fetchData);
