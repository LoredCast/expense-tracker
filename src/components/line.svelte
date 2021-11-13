<script>
    import { onMount } from 'svelte'
    import { Chart, LinearScale, LineController, CategoryScale, LineElement, PointElement } from 'chart.js'
import { time_ranges_to_array } from 'svelte/internal';

    let canvas
    let chart



    export let ratio = 2
    export let labels
    export let sums

    let height = 1
    let width 
    width = height * ratio

    let chartConfig
    chartConfig = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: sums,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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
    }

    const drawChart = (ctx) => {
        Chart.register(LinearScale, LineController, CategoryScale, LineElement, PointElement)
        chart = new Chart(ctx, chartConfig)
    }

    onMount(() => {
        const ctx = canvas.getContext('2d')
        drawChart(ctx)
        canvas.height = canvas.width * ratio
    })

   const updateData = () => {
        console.log(labels, sums)

        chart.data.labels = labels
        chart.data.datasets[0].data = sums
        chart.update()
   }
   $: if(chart) chart.data.labels = labels
   $: if(chart) chart.data.datasets[0].data = sums
   $: if(chart) chart.update()


    


</script>

<canvas bind:this={canvas} width={width} height={height}></canvas>

<style>
    canvas {
        width: 100%;
        height: 100%;
    }
</style>