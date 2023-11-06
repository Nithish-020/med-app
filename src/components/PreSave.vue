<template>
    <div>
        <v-layout class="mt-8 d-flex justify-center pa-4 mx-auto">
            <v-card width="900" elevation="0" outlined>

                <v-container class=" mt-2 jjustify-center ">
                    <v-flex class="d-flex justify-center align-center ">
                        <v-spacer></v-spacer>

                        <!-- <v-btn color="primary--text" elevation="0" @click="downloadCsv">Download</v-btn> -->
                    </v-flex>
                </v-container>

                <v-layout class="d-flex justify-space-between align-center pa-5">
                    <v-flex>
                        <v-btn class="primary mr-3 pa-2" @click="pre">preview</v-btn>
                        <v-btn class="light-green darken-1 white--text pa-2" @click="save">save</v-btn>
                    </v-flex>
                    <v-flex class="d-flex justify-space-between align-center">
                        <span><b>Bill no : &nbsp; {{ billno }}</b></span>
                        <span class="d-none d-md-flex"><b>Date :</b>{{ fulldate }}</span>
                        <span><b>Total :</b>{{ total }}</span>
                        <span><b>GST :</b>{{ gst.toFixed(2) }}</span>
                        <span><b>Net Payable :</b>{{ netpayable }}</span>
                    </v-flex>
                </v-layout>
                <!-- {{ Arr }} -->
            </v-card>
        </v-layout>

        <v-snackbar v-model="snack" color="green" :timeout="1000">
            <template class="green white--text">
                <v-icon class="mr-3">mdi-check-circle-outline</v-icon>
                Bill Saved Successfully
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import EventServices from '../services/EventServices';
export default {
    data() {
        return {
            user_id: this.$store.state.temporary.user_id,
            billno: "",
            total: 0.0,
            gst: 0.0,
            fulldate: "",
            netpayable: 0.0,
            dialog: true,
            snack: false
        }
    },
    props: {
        Arr: []
    },
    methods: {
        //  Function For Click Save
        save() {

            EventServices.BillEntry(this.Arr)
                .then((response) => {
                    if (response.data.status == "S") {
                        this.snack = true
                    }
                }).catch((error) => {
                    console.log(error)
                });

            this.Arr = [];
            this.$emit("dummy", this.Arr)
            this.total = 0.0;
            this.gst = 0.0;
            this.netpayable = 0.0;
            this.getbill()

        },
        pre() {
            this.$emit("on", this.dialog)
        },
        getbill() {
            EventServices.GetBillNo()
                .then((response) => {
                    // console.log(response.data)
                    if (response.data.status == "S") {
                        this.billno = response.data.billres;
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    },
    mounted() {
        this.getbill()
        // To display Todays Date
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const fulldate = `${year}-${month}-${date}`;
        this.fulldate = fulldate;


    },
    watch: {
        Arr() {
            this.total += this.Arr[this.Arr.length - 1].billAmt;
            this.gst = (18 / 100) * this.total;
            this.netpayable = this.total + this.gst;
        }

    }
}


</script>