
const slider = document.getElementById("slider")
const reversedRange = document.getElementById("reversedRange")
const data = document.getElementById("data")
const run = document.getElementById("run")
const reset = document.getElementById("reset")

var cancel = null

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


reset.onclick = function () { 
    cancel = true;

    chart.data.datasets[0].data = []
    chart.data.labels = []
    chart.data.datasets[0].backgroundColor = []

    //Initalize random bar chart values
    for (let i = 0; i < slider.value; i++){
        var value = Math.floor(Math.random() * 95) + 5
        chart.data.datasets[0].data.push(value)
        chart.data.labels.push("")
        chart.data.datasets[0].backgroundColor.push("cornflowerblue")
    }
    chart.update()
}

run.onclick = async () => {
    cancel = false

    //Function to reverse the speed value
    const speed = reversedRange.value*-1 + 650

    var sorted = false
    let counter = slider.value
    while (!sorted){
        sorted = true
        for (let i=1; i < counter; i++){
            
            if (cancel == true){
                return
            }

            chart.data.datasets[0].backgroundColor[i]= "red"
            chart.data.datasets[0].backgroundColor[i-1]= "cornflowerblue"
            chart.update()
            await sleep(speed)
            // Checks if previous bar is greater then current bar and swaps if so
            if (chart.data.datasets[0].data[i-1] > chart.data.datasets[0].data[i]){
                
                    var temp = chart.data.datasets[0].data[i-1]
                    chart.data.datasets[0].data[i-1] = chart.data.datasets[0].data[i]
                    chart.data.datasets[0].data[i] = temp
                    sorted = false
                    chart.update()
                    await sleep(speed)
            }
        }
        //Changes the new sorted bar to a green color
        chart.data.datasets[0].backgroundColor[counter - 1] = "green"
        chart.update()
        counter -= 1
    }

    //Turns the rest of the bars green in the case that the last section is already sorted
    for (let i = 0; i < counter; i++){
        chart.data.datasets[0].backgroundColor[i]= "green"
    }
    chart.update()
}

