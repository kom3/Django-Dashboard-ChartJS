var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Affected', 'Not affected'],
        datasets: [{
            label: '# of Votes',
            data: [12, 88],
            backgroundColor: [
                'red',
                'green'

            ],
            borderColor: [
                'red',
                'green'
            ],
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