import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
const chart = new ChartJSNodeCanvas({ width: 800, height: 600 });

async function renderGraph(data) {
    return (await chart.renderToBuffer({
        type: 'line',
        data: {
            labels: data.map(row => row[0]),
            datasets: [{
                data: data.map(row => row[1]),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
              x: {
                ticks: {
                  display: false
                }
              }
            }
          }
    }))
}

export default renderGraph