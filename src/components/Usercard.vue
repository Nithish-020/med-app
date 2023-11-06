<template>
    <div>
        <v-container>
            <v-layout class="mt-16 d-flex align-center justify-center flex-column ">
                <v-card width="700" elevation="0">
                    <span class="subtitle-2 font-weight-bold mb-2 ml-1">User details</span>
                    <v-expansion-panels max-width="700">
                        <v-expansion-panel>
                            <v-expansion-panel-header class="primary white--text">
                                Item
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-form ref="form" v-model="valid" lazy-validation class="d-flex mt-4">
                                    <v-flex class="mr-8">
                                        <v-text-field v-model="add.username" label="User Id" dense outlined required
                                            :rules="[v => !!v || 'Username is Required']"></v-text-field>
                                    </v-flex>
                                    <v-flex class="mr-8">
                                        <v-text-field v-model="add.password" dense label="Password" outlined required
                                            :rules="[v => !!v || 'Password is Required']"></v-text-field>
                                    </v-flex>
                                    <v-flex class="mr-8">
                                        <v-autocomplete :items="items" v-model="add.role" outlined dense label="Role"
                                            required :rules="[v => !!v || 'Role is Required']">
                                        </v-autocomplete>
                                    </v-flex>
                                    <v-flex>
                                        <v-btn width="50%" class="primary" @click="addUser">ADD</v-btn>
                                    </v-flex>
                                </v-form>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </v-layout>
        </v-container>

        <!--? Snack Bar Section  -->

        <div class="text-center">
            <v-snackbar v-model="success" :timeout="timeout" color="green">
                <v-icon class="mr-3">mdi-account-check</v-icon>
                <span>User Added Successfully</span>
            </v-snackbar>

            <v-snackbar v-model="error" :timeout="timeout" color="red">
                <v-icon class="mr-3">mdi-close-circle</v-icon>
                <span>User & Role Already Exist</span>
            </v-snackbar>
        </div>

    </div>
</template>

<script>
import EventServices from '../services/EventServices';
export default {
    data() {
        return {
            valid: true,
            success: false,
            error: false,
            timeout: 1800,
            add: {
                clientId: 0,
                role: '',
                flag: '',
            },
            items: ['biller', 'manager', 'admin', 'inventory'],

        }
    },
    methods: {
        addUser() {
            this.add.user_id = this.$store.state.temporary.user_id;
            EventServices.Adduser(this.add)
                .then((response) => {
                    if (response.data.status == "S") {
                        this.success = true;
                    } else {
                        this.error = true;
                    }
                })
                .catch((error) => {
                    console.log(error)
                })

            this.$refs.form.reset();

        }

    }
}


</script>