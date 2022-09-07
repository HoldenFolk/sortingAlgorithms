
const slider = document.getElementById("slider")
const reversedRange = document.getElementById("reversedRange")
const data = document.getElementById("data")
const run = document.getElementById("run")

$("#reversedRange").on('change input', function() {
    var output = Math.abs($(this).val());
  });

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const chart = 
   new Chart("chart" , {
        type: "bar",
        data: {
            labels: [],
            datasets: [{
                backgroundColor: [],
                data : []
            }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Bubble Sort Data"
            }
        }
    })


slider.onmouseup = function () { 

    chart.data.datasets[0].data = []
    chart.data.labels = []
    chart.data.datasets[0].backgroundColor = []

    for (let i = 0; i < slider.value; i++){
        var value = Math.floor(Math.random() * 95) + 5
        chart.data.datasets[0].data.push(value)
        chart.data.labels.push("")
        chart.data.datasets[0].backgroundColor.push("cornflowerblue")
    }
    chart.update()
}

run.onclick = async () => {

    var sorted = false
    let counter = 1
    while (!sorted){
        sorted = true
        for (let i=0; i < slider.value-1; i++){
            chart.data.datasets[0].backgroundColor[i]= "red"
            chart.data.datasets[0].backgroundColor[i-1]= "cornflowerblue"
            chart.update()
            await sleep(reversedRange.value)
            if (chart.data.datasets[0].data[i] > chart.data.datasets[0].data[i+1]){
                
                    var temp = chart.data.datasets[0].data[i]
                    chart.data.datasets[0].data[i] = chart.data.datasets[0].data[i+1]
                    chart.data.datasets[0].data[i+1] = temp
                    sorted = false
                    chart.update()
                    await sleep(reversedRange.value)
            }
            chart.data.datasets[0].backgroundColor[-2]= "cornflowerblue"
        }
        // chart.data.datasets[0].backroundColor[slider.value - counter] = "green"
        // chart.update()
        // count += 1
    }
}

