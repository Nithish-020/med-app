<template>
  <div>
    <v-card  width="650">
      <div id="chart">
        <apexchart type="donut" :options="chartOptions" :series="BillerVal" :key="toggle"></apexchart>
      </div>
    </v-card>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  data() {
    return {

      T_date: null,
      Y_date: null,
      chartOptions: {
        chart: {

          type: 'donut',
          dropShadow: {
            enabled: true,
            color: '#111',
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
          }
        },
        stroke: {
          width: 0,
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true
                }
              }
            }
          }
        },
        labels: this.BillerName,
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8
          }
        },
        fill: {
          type: 'pattern',
          opacity: 1,
          pattern: {
            enabled: true,
            style: [],
          },
        },
        states: {height: 560,
          hover: {
            filter: 'none'
          }
        },
        theme: {
          palette: 'palette2'
        },
        title: {
          text: "Today Salesmans Performance"
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom'
            }
          }
        }],
      }

    }
  },
  components: {
    apexchart: VueApexCharts,

  },
  props: {
    BillerName: [],
    BillerVal: [],
    toggle: { value: 0 }
  },
}




</script>
