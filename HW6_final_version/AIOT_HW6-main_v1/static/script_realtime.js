document.addEventListener('DOMContentLoaded', function () {
    const MAX_DATA_NUM = 8;
    const UPDATE_CHART_SEC = 5;

    const ctx = document.getElementById('realtimeChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Humidity',
                type: 'bar',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Temperature',
                type: 'line',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function fetchDataAndUpdateChart() {
        fetch(`/get_latest_data?limit=${MAX_DATA_NUM}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error fetching data:', data.error);
                    return;
                }

                // Reverse the data array to display from oldest to newest
                data.reverse();

                myChart.data.labels = data.map(entry => {
                    const timestamp = new Date(entry.timestamp);
                    return timestamp.toLocaleTimeString("en-US", { timeZone: "Asia/Taipei" });
                });
                myChart.data.datasets[0].data = data.map(entry => entry.humidity);
                myChart.data.datasets[1].data = data.map(entry => entry.temperature);
                myChart.update();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    fetchDataAndUpdateChart();
    setInterval(fetchDataAndUpdateChart, UPDATE_CHART_SEC * 1000);
});
