<template>
    <div>
        <v-card width="600">
            <div id="chart">
                <apexchart type="line" height="350" :options="chartOptions" :series="DayVal" :key="toggle"></apexchart>
            </div>
            <!-- {{ DayName }}
            {{ DayVal }} -->
          
        </v-card>
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
    name: "linechart",
    data() {
        return {
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: true
                },
                stroke: {
                    curve: 'straight'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                yaxis: {
                    title: {
                        text: 'Amount'
                    },
                    min: 0,
                    max: 1000
                },
                xaxis: {
                    categories: this.DayName,
                    title: {
                        text: 'Days',
                        position: 'bottom',
                    }

                },
            },
           
        }
    },
    components: {
        apexchart: VueApexCharts,
    },
    props: {
        DayName:[],
        DayVal:[],
        toggle:{value:0}
    },
    
};
</script>