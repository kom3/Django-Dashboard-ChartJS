var ctx = document.getElementById('myChart').getContext('2d');
var myChart
function generateGraph(data) {
    myChart = new Chart(ctx, {
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

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function getbuildnumber() {
    let options = '<option value="default">Select build number</option>'
    fetch("getbuildnumber").then(data => data.json()).then(data => {
        data.build_nums.forEach(opt => {
            options += '<option value="' + opt + '">' + opt + '</option>'
        });
        document.getElementById("buildnum").innerHTML = options
    })
}

async function gengraph() {
    if (myChart) myChart.destroy();
    let buildnum = document.getElementById("buildnum").value
    const csrftoken = getCookie('csrftoken');
    let graphdata = await fetch("getgraphdata", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            'X-CSRFToken': csrftoken
        },
        "body": JSON.stringify({ "buildnum": buildnum })
    }).then(data => data.json())
    let colors = graphdata.affected_rate.map((data, index) => {
        if (index % 2 == 0) {
            return "red"
        }
        else {
            return "green"
        }
    })
    let labels = graphdata.affected_rate.map((data, index) => {
        if (index % 2 == 0) {
            return "Affected"
        }
        else {
            return "Not affected"
        }
    })
    data = {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data: graphdata.affected_rate,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
        }]
    }
    generateGraph(data)
}