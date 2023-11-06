<template>
    <div>
        <v-card width="400">
            <v-layout class="d-flex flex-column">

                <v-card-text class="text-center">
                    <span class="font-weight-bold body-1">Your Today Sales</span>
                    <v-layout>
                        <v-flex class="mb-4">
                            <span class="text-h4 font-weight-black">₹ {{ T_Sale }}</span>
                            <!-- <span>{{ calc }}</span> -->
                        </v-flex>
                        <v-flex class="mt-3">
                            <v-icon class="mr-3" v-if="T_Sale < Y_Sale" color="red">mdi-arrow-down</v-icon>

                            <v-icon class="mr-3" v-if="T_Sale >= Y_Sale" color="green">mdi-arrow-up</v-icon>

                            <span>({{ percentage.toFixed(1) }}%)</span>
                        </v-flex>
                    </v-layout>
                    <!-- {{ calc }} -->
                </v-card-text>
            </v-layout>
        </v-card>


    </div>
</template>

<script>
import EventServices from '../services/EventServices';
export default {
    data() {
        return {
            T_Sale: 0,
            Y_Sale: 0,
            increase: false,
            decrease: false,
            percentage: 0,
            calc: [],
            id: {
                user_id: 0
            },
        }
    },
    mounted() {
        this.id.user_id = this.$store.state.temporary.user_id;
        EventServices.GetBillerdash(this.id)
            .then((response) => {

                this.calc = response.data.billerRes;
                for (let i = 0; i < this.calc.length; i++) {

                    if (this.calc[i].day == "Today") {
                        this.T_Sale = this.calc[i].amt;
                        this.increase = true;
                    } else {
                        this.Y_Sale = this.calc[i].amt;
                    }
                    this.percentage = ((this.T_Sale - this.Y_Sale) / this.T_Sale) * 100;
                }

            })
            .catch((error) => {
                console.log(error)
            });


    },
    methods: {
        rotateHands() {
            const date = new Date();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();

            this.hourRotation = 360 * ((hour % 12) / 12) + (30 * (minute / 60));
            this.minuteRotation = 360 * (minute / 60) + (6 * (second / 60));
            this.secondRotation = 360 * (second / 60);
        }
    }
};
</script>
