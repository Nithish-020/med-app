<template>
  <div>
    <v-card width="700" height="550">
      <div id="chart">
        <apexchart type="bar" :options="chartOptions" :series="Amount" :key="toggle"></apexchart>
      </div>
      <!-- {{ UserName }}{{ Amount }} -->
    </v-card>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  data() {
    return {

      chartOptions: {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },

        xaxis: {
          categories: this.UserName,
          position: 'bottom',
          axisBorder: {
            show: true
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.8,
                opacityTo: 0.5,
              }
            }
          },
          title: {
            text: 'Sales Man',
            floating: false,
            offsetX: 0,
            align: 'center',
            style: {
              color: '#000'
            }
          },
          tooltip: {
            enabled: false,
          }
        },
        yaxis: {

          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
            // formatter: function (val) {
            //   return val + "%";
            // }
          },
          title: {
            text: 'Amount',
            floating: false,
            // offsetY: 540,
            align: 'center',
            style: {
              color: '#000'
            }
          }

        },
      },

    }
  },
  components: {
    apexchart: VueApexCharts,

  },
  props: {
    UserName: [],
    Amount: [],
    toggle: { value: 0 }
  }
}
</script>