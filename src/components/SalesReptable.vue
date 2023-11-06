<template>
    <div>
        <v-layout class="mt-16 d-flex justify-center align-center">
            <v-card outlined elevation="0">
                <template>
                    <v-container class="text-right">
                        <v-layout class="d-flex justify-space-between align-center pa-2">
                            <v-flex>
                                <v-text-field v-model="date.fromDate" label="Start Date" type="date" outlined dense
                                    class="mr-3"></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-text-field v-model="date.toDate" label="End Date" type="date" outlined dense
                                    class="mr-3"></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-btn color="primary" class="mb-6" dense @click="search">Search</v-btn>
                            </v-flex>
                        </v-layout>
                        <v-btn class="primary--text elevation-0 mb-2" small @click="downloadCSV">Download</v-btn>

                        <!-- Table For Sales View -->
                        <v-data-table :headers="headers" :items="Items">

                        </v-data-table>
                    </v-container>
                </template>
            </v-card>
        </v-layout>
    </div>
</template>


<script>
import Papa from "papaparse";
import EventServices from "../services/EventServices";

export default {
    data() {
        return {
            date: {
                fromDate: null,
                toDate: null,
            },
            headers: [
                { text: 'Bill No', value: 'bil_no' },
                { text: 'Date', value: 'date' },
                { text: 'Medicine Name', value: 'medName' },
                { text: 'Qty', value: 'qty' },
                { text: 'Amount', value: 'amt' }
            ],
            Items: [],

        };
    },

    methods: {
        search() {
            EventServices.GetSalesReport(this.date)
                .then((response) => {

                    if (response.data.status == "S") {
                        this.Items = response.data.salesReportArr;
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        downloadCSV() {
            const csv = Papa.unparse(this.Items);
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "SalesReport.csv");
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    },
};
</script>