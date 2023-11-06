<template>
    <div>
        <v-container>
            <v-layout class="d-flex flex-column align-center justify-space-between">
                <!-- Todays's Sales -->
                <v-flex class="mb-10 ">
                    <v-layout class="justify-space-between align-center">
                        <v-flex class="mr-2">
                            <v-card width="250" dark>
                                <v-card-title class="text-center">Today's Sales</v-card-title>
                                <v-card-text class="text-h5 font-weight-black white--text">
                                    <span>₹ {{ T_Sale }}/-</span>
                                </v-card-text>
                            </v-card>
                        </v-flex>

                        <!-- Current Inventry Value -->
                        <v-flex>
                            <v-card width="300" dark>
                                <v-card-title class="text-center">Current Inventory Value</v-card-title>
                                <v-card-text class="text-h5 font-weight-black white--text">
                                    <span>₹ {{ inventryVal }}/-</span>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>

        <v-layout class="my-10">
            <v-flex class="mr-5">
                <DailyCharts :DayName="dayname" :DayVal="Weekseries" :toggle="toggle" />
            </v-flex>
            <v-flex>
                <MonthlyCharts :Month="monthname" :MonthVal="Monthseries" :toggle="toggle" />
            </v-flex>
        </v-layout>

        <v-layout class="">
            <v-flex class="mr-5">
                <Todaypie :BillerName="billername" :BillerVal="billerval" :toggle="toggle" />
            </v-flex>
            <v-flex>
                <Currentmonthbar :UserName="CurrentMnthsale" :Amount="CurrentMnthseries" :toggle="toggle" />
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import DailyCharts from "../components/LineChart.vue";
import MonthlyCharts from "../components/Monthlychart.vue";
import Todaypie from "../components/TodayPie.vue";
import Currentmonthbar from "../components/Currentmonthbar.vue";
import EventServices from "../services/EventServices";

export default {

    name: "managerdash",
    data() {
        return {
            T_Sale: 0,
            // Y_sale: 0,
            inventryVal: 0,
            T_date: null,
            Y_date: null,
            dash: {},
            dayname: [],
            dayval: [],
            monthname: [],
            monthval: [],
            toggle: 1,
            Weekseries: [{
                name: "Weekly Sales trend",
                data: []
            }],
            Monthseries: [{
                name: "Monthly Sales trend",
                data: []
            }],
            billername: [],
            billerval: [],
            CurrentMnthseries: [{
                name: "Current Month Sales Performance",
                data: []
            }],
            CurrentMnthsale: [],
            CurrentMonthval: []
        }
    },
    components: {
        DailyCharts,
        MonthlyCharts,
        Currentmonthbar,
        Todaypie

    },

    mounted() {

        EventServices.GetManagerdash()

            .then((response) => {
                console.log("manager resp", response.data.manager_resp)
                this.dash = response.data.manager_resp
                this.T_Sale = this.dash.todaySaleVal;
                this.inventryVal = this.dash.totalInventryVal;


                for (let ds = 0; ds < this.dash.dailySaleArr.length; ds++) {
                    this.dayname.push(this.dash.dailySaleArr[ds].weekDay)
                    this.dayval.push(this.dash.dailySaleArr[ds].dailyVal)
                }
                this.Weekseries[0].data = this.dayval


                for (let ms = 0; ms < this.dash.monthlysaleArr.length; ms++) {
                    this.monthname.push(this.dash.monthlysaleArr[ms].months)
                    this.monthval.push(this.dash.monthlysaleArr[ms].monthVal)
                }
                this.Monthseries[0].data = this.monthval;

                for (let tsp = 0; tsp < this.dash.todaySalePerfArr.length; tsp++) {
                    this.billername.push(this.dash.todaySalePerfArr[tsp].userName)
                    this.billerval.push(this.dash.todaySalePerfArr[tsp].amount)
                }

                for (let cmsp = 0; cmsp < this.dash.currentMnthPerfArr.length; cmsp++) {
                    this.CurrentMnthsale.push(this.dash.currentMnthPerfArr[cmsp].userName)
                    this.CurrentMonthval.push(this.dash.currentMnthPerfArr[cmsp].amount)
                }
                this.CurrentMnthseries[0].data = this.CurrentMonthval;
                console.log("C month sale", this.CurrentMonthval)
                this.toggle++;


            })

            .catch((error) => {
                console.log(error)
            })
    },
}
</script>