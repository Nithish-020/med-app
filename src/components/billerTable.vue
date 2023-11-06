<template>
    <div>
        <v-container>
            <v-layout class="mt-16 d-flex justify-center align-center">
                <v-card width="900" outlined elevation="0" class="pa-5">
                    <v-data-table :headers="headers" :items="dummy" :search="search">
                    </v-data-table>
                </v-card>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            headers: [
                {
                    text: "Medicine Name",
                    align: "start",
                    sortable: false,
                    value: "medicinename",
                },
                { text: "Brand", value: "brand" },
                { text: "Quantity", value: "qty" },
                { text: "Amount", value: "billAmt" },
            ],
        }
    },
    props: {
        dummy: []
    }
}
</script>