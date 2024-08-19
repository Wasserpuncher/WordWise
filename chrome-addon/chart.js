// chart.js

function drawWordCountChart(wordCount) {
    const ctx = document.getElementById('word-chart').getContext('2d');
    const data = {
        labels: ['Words'],
        datasets: [{
            label: 'Word Count',
            data: [wordCount],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function drawLengthDistributionChart(lengthDistribution) {
    const ctx = document.getElementById('length-distribution-chart').getContext('2d');
    const labels = Object.keys(lengthDistribution);
    const data = Object.values(lengthDistribution);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Word Length Distribution',
                data: data,
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
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
}
