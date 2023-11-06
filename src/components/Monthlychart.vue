<template>
    <div>
        <v-card width="750">
            <div id="chart">
                <apexchart type="line" height="350" :options="chartOptions" :series="MonthVal" :key="toggle"></apexchart>
            </div>
            <!-- {{ Month }}
            {{ MonthVal }} -->
        </v-card>
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
    name: "linechart",
    props: {
        Month: [],
        MonthVal: [],
        toggle:{value:0}
    },
    data() {
        return {

            monthNames: [],
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
                    categories: this.Month,
                    title: {
                        text: 'Months',
                        position: 'bottom',
                    }

                },
            },

        }
    },
    components: {
        apexchart: VueApexCharts,
    },
    // updated() {
    //     alert("updated");
    //     // var localvar 
    //     // localvar = this.MonthVal
    //     // localvar[0].data = this.MonthVal;
    //     this.series = [{
    //             name: "Desktops",
    //             data: this.MonthVal
    //         }];
    //    // this.series[0].data = this.MonthVal;
    //    // this.chartOptions.xaxis.categories = this.Month;
    // },


};
</script>