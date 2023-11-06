<template>
    <div>
        <v-layout class="d-flex justify-center align-center flex-column mt-16">
            <v-card width="700">
                <v-card-title>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                        hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="item" :search="search"></v-data-table>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
import EventServices from '../services/EventServices';
export default {

    data() {
        return {
            search: '',
            headers: [
                { text: 'Name', value: 'username' },
                { text: 'Login Date', value: 'login_date' },
                { text: 'Login time', value: 'login_time' },
                { text: 'Logout Date', value: 'logout_date' },
                { text: 'Logout time', value: 'logout_time' },
            ],
            item:[]
        }
    },
    mounted() {
        EventServices.GetLoghistory()

            .then((response) => {
                console.log(response);
                if (response.data.status == "S") {
                    this.item = response.data.loghisArr;
                } 
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

</script>