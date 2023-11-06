<template>
    <div>
        <menubar />

        <!-- Add icon for New Medicine Entry -->
        <v-layout class="d-flex justify-center align-center">
            <v-card class="mt-16 mx-auto" width="700">

                <v-container class="d-flex  justify-space-between">
                    <v-flex>Refill Stock</v-flex>
                    <v-flex class="d-flex justify-end">
                        <v-btn small elevation="0" @click="dialog">
                            <v-icon>mdi-plus</v-icon>
                            ADD
                        </v-btn>
                    </v-flex>
                </v-container>

                <!-- Refill Stock Section -->
                <!-- <v-container class="d-flex justify-space-between mx-auto">
                    <v-flex class="mr-3">
                        <v-menu offset-y>

                            <template v-slot:activator="{ on, attrs }">
                                <v-autocomplete v-bind="attrs" v-on="on" :items="items" item-value="medicinename"
                                    item-text="medicinename" v-model="medName" @change="call" dense outlined elevation="0">
                                </v-autocomplete>
                            </template>
                        </v-menu>
                    </v-flex>
                    <v-flex class="mr-3">
                        <v-text-field label="Brand" v-model="brand" :items="brand" outlined dense disabled>
                        </v-text-field>
                    </v-flex>
                    <v-flex class="mr-3">
                        <v-text-field label="Qty" v-model.number="qty" outlined dense>
                        </v-text-field>
                    </v-flex>
                    <v-flex class="mr-3">
                        <v-text-field label="Unit Price" v-model.number="unitprice" outlined dense>
                        </v-text-field>
                    </v-flex>
                </v-container>
                <v-container class="d-flex justify-center align-center">
                    <v-btn width="680" class="primary" @click="generate">Update</v-btn>
                </v-container> -->
                <StockCard />
            </v-card>
        </v-layout>

        <!-- New Medicine Adding -->
        <StockentryDialog :on="enable" @off="off" @success="suc" @error="err" />

        <!-- <v-snackbar :timeout="timeout" v-model="error" bottom color="red accent-4 white--text">
            <v-icon class="mr-3">mdi-alert-circle</v-icon>
            Stock Cannot be Empty
        </v-snackbar>

        <v-snackbar :timeout="timeout" v-model="success" color="success" bottom>
            <v-icon class="mr-3">mdi-check-circle</v-icon>
            Stock Added Successfully
        </v-snackbar> -->
        <Snack :value1="success" :value2="error" />
        {{ $store.state.stock }}
    </div>
</template>

<script>
import menubar from "../components/Menubar.vue"
import StockentryDialog from "../components/StockentryDialog.vue"
import Snack from "../components/StockSnack.vue"
import StockCard from "../components/StockentryCard.vue"

export default {
    data() {
        return {
            medName: "",
            brand: "",
            error: false,
            success: false,
            qty: 0,
            unitprice: 0,
            timeout: 1500,
            items: [],
            enable: false,
        }
    },
    methods: {
        dialog() {
            this.enable = true;
        },
        off() {
            this.enable = false
        },
        suc() {
            this.success = true;
        },
        err() {
            this.error = true;
        },
        // select the brand for medicine
        call() {
            let med = this.$store.state.medicineMaster;

            for (let i = 0; i < med.length; i++) {

                if (this.medName == med[i].medicinename) {
                    this.brand = med[i].medicinebrand;
                    console.log(this.brand)
                }
            }
        },

        //  Update the Stock Array 
        // generate() {
        //     let stock = this.$store.state.stock;

        //     var counter = 0

        //     for (let j = 0; j < stock.length; j++) {

        //         if (this.qty == 0 || this.unitprice == 0) {
        //             this.error = true;
        //             break;
        //         } else if (this.medName == "" && this.qty == 0 && this.unitprice == 0) {
        //             alert("error")
        //             this.error = true;
        //             break;

        //         } else if (stock[j].medicinename == this.medName && stock[j].medicinebrand == this.brand) {
        //             // stock.push(
        //             stock[j].medicinename = this.medName,
        //                 stock[j].medicinebrand = this.brand,
        //                 stock[j].qty = this.qty + stock[j].qty,
        //                 stock[j].price = this.unitprice;
        //             this.$store.commit("setstock", stock);
        //             this.Success = true;
        //             counter++;
        //             break;
        //         }
        //     };

        //     if (counter == 0) {
        //         stock.push({
        //             medicinename: this.medName,
        //             medicinebrand: this.brand,
        //             qty: this.qty,
        //             price: this.unitprice
        //         });
        //         this.$store.commit("setstock", stock);
        //     }



        // }
    },
    components: {
        menubar,
        StockentryDialog,
        Snack,
        StockCard
    },
    mounted() {
        this.items = this.$store.state.medicineMaster;
    }
};
</script>