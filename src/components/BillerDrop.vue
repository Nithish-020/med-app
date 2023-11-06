<template>
    <div>
        <v-container>
            <v-layout class="mt-16">
                <v-flex class="d-flex justify-center align-center">
                    <v-card width="900" elevation="0">
                        <span>BILL ENTRY</span>
                        <v-expansion-panels accordion>
                            <v-expansion-panel>
                                <v-expansion-panel-header class="primary white--text">Item</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-form class="d-flex justify-space-between align-center mt-3">
                                        <v-autocomplete :items="item" v-model="medId" item-value="med_id"
                                            item-text="medName" class="mt-2 mr-5" outlined dense label="Medicine Name"
                                            required>
                                        </v-autocomplete>
                                        <v-text-field v-model.number="qty" label="Quantity" type="number" class="mr-5 mt-2"
                                            dense outlined
                                            :rules="[(v) => !!v || 'medicine Qty is Required']"></v-text-field>
                                        <v-btn class="mb-4 primary" width="20%" @click="add">Add</v-btn>
                                    </v-form>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import Eventservice from "../services/EventServices"
export default {
    props: {
        trash: []
    },
    data() {
        return {
            billno: 0,
            medId: "",
            medName: "",
            brand: "",
            qty: 0,
            amt: 0.0,
            item: [],
            BillDetailsArr: [],
            stock: [],
            dummy: null,
            uPrice: 0.0
        }
    },
    methods: {
        getbill() {
            Eventservice.GetBillNo()
                .then((response) => {
                    // console.log(response.data)
                    if (response.data.status == "S") {
                        this.billno = response.data.billres;
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        add() {

            for (let i = 0; i < this.stock.length; i++) {

                if (
                    this.stock[i].medId == this.medId &&
                    this.stock[i].qty < this.qty
                ) {
                    alert("There is no enough quantity available in inventry");
                    break;
                } else if (
                    this.stock[i].medId == this.medId &&
                    this.stock[i].qty == 0
                ) {
                    break;
                } else if (
                    this.medId != this.stock[i].medId &&
                    this.qty == 0
                ) {
                    break;
                } else if (
                    this.stock[i].medId == this.medId &&
                    this.stock[i].qty >= this.qty
                ) {
                    this.medName = this.stock[i].medName;
                    this.brand = this.stock[i].brand;
                    this.stock[i].qty -= this.qty;
                    this.uPrice = this.stock[i].price;
                    this.amt = this.uPrice * this.qty;

                    console.log(this.qty)

                    //  This statement is used to show the temporary data table
                    this.BillDetailsArr.push({
                        user_id: this.$store.state.temporary.user_id,
                        bill_no: this.billno,
                        med_id: this.medId,
                        medicinename: this.medName,
                        brand: this.brand,
                        unitPrice: this.uPrice,
                        qty: this.qty,
                        billAmt: this.amt,
                    });


                    this.$emit("billdrop", this.BillDetailsArr)
                    this.medId = "";
                    this.qty = 0;
                    break;
                }
            }
        },
    },
    mounted() {
        this.getbill()
        Eventservice.GetMedMas()
            .then((response) => {
                if (response.data.status == "S") {
                    this.item = response.data.masterArr;
                } else {
                    this.Msg = response.data.errMsg;
                }
            })
            .catch((error) => {
                console.log(error)
            });

        Eventservice.GetStock()
            .then((response) => {
                if (response.data.status == "S") {
                    this.stock = response.data.stockArr;
                } else {
                    this.Msg = response.data.errMsg;
                }
            })
            .catch((error) => {
                console.log(error)
            });
    },
    updated() {
        this.BillDetailsArr = this.trash;
    }
}

</script>