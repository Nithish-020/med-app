<template>
    <div>
        <v-layout class="mt-16 mb-10">
            <v-flex class="d-flex justify-center ">
                <v-card width="900">
                    <v-container>
                        <v-text-field label="Search" v-model="search" append-icon="mdi-magnify"></v-text-field>

                        <v-data-table :headers="headers" :items="medicines" :items-per-page="15" :search="search">
                        </v-data-table>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Eventservice from "../services/EventServices"

export default {
    data() {
        return {
            name: "StockViewCard",
            search: '',
            headers: [
                {
                    text: 'Medicine Name',
                    align: 'start',
                    sortable: false,
                    value: 'medName',

                },
                { text: 'Quantity', align: 'center', value: 'qty' },
                { text: 'Unit price', align: 'center', value: 'price' },
            ],
            medicines: [],
            Msg: "",

        }
    },
    mounted() {
        // this.medicines = this.$store.state.stock
        Eventservice.GetStock()
            .then((response) => {
                if (response.data.status == "S") {
                    this.medicines = response.data.stockArr;
                } else {
                    this.Msg = response.data.errMsg;
                }
            })
            .catch((error) => {

                console.log(error)
            });
    },

}
</script>

<style>
.row-width {
    width: 50px;
}
</style>