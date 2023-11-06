<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="600">
            <v-card max-width="600">
                <v-card-title class="primary">
                    <v-btn icon @click="close">
                        <v-icon class="white--text">mdi-close</v-icon>
                    </v-btn>
                    <span class="text-body-2 white--text">PREVIEW</span>
                </v-card-title>
                <v-card-text>
                    <v-simple-table fixed-header height="300px">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Medicine name</th>
                                    <th class="text-left">Qty</th>
                                    <th class="text-left">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in preview" :key="item.medicinename">
                                    <td>{{ item.medicinename }}</td>
                                    <td>{{ item.qty }}</td>
                                    <td>{{ item.billAmt }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    <!-- {{ preview }} -->

                    <div class="ml-16 pl-16">
                        <v-layout class="d-flex flex-column justify-end align-center ml-16 pl-16">
                            <v-flex>
                                <span class="font-weight-black">Total :</span>
                                {{ total }}</v-flex>
                            <v-flex>
                                <span class="font-weight-black">GST :</span>
                                {{ gst.toFixed(2) }}</v-flex>
                            <v-flex>
                                <span class="font-weight-black">Net Price :</span>
                                {{ netpayable }}</v-flex>
                        </v-layout>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="green darken-1 white--text" text rounded width="30%" @click="close">
                        Print
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
// import Papa from "papaparse";

export default {
    data() {
        return {
            total: 0.0,
            gst: 0.0,
            netpayable: 0.0,
            disable: false
        }
    },
    props: {
        preview: [],
        dialog: Boolean
    },
    watch: {
        preview() {
            this.total += this.preview[this.preview.length - 1].billAmt;
            this.gst = (18 / 100) * this.total;
            this.netpayable = this.total + this.gst;
        }
    },
    methods: {
        close(){
            this.$emit("off", this.disable)
        },
        
    }
}
</script>