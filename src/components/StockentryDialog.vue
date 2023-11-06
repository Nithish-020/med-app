<template>
    <div>
        <v-layout>
            <v-dialog v-model="on" width="500" persistent>
                <v-card>
                    <v-card-title class="text-h5  primary white--text">
                        <v-btn class="mr-8 white--text primary" elevation="0" @click="off">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        ADD STOCK
                    </v-card-title>

                    <v-card-text class="mt-4">
                        <v-text-field label="Medicine Name" v-model="struct.medName" outlined>
                        </v-text-field>
                        <v-text-field label="Brand" v-model="struct.brand" outlined>
                        </v-text-field>
                    </v-card-text>

                    <v-card-actions class="d-flex justify-center">
                        <v-btn class="primary white--text" text @click="push">
                            ADD
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-snackbar :timeout="1000" v-model="success" color="success " elevation="24">
            {{ snackbar.success }}
        </v-snackbar>
        <v-snackbar :timeout="1000" v-model="warning" color="warning" elevation="24">
            {{ snackbar.warning }}
        </v-snackbar>
        <v-snackbar :timeout="1000" v-model="error" color="error" elevation="24">
            {{ snackbar.error }}
        </v-snackbar>
    </div>
</template>

<script>
import EventServices from '../services/EventServices';
export default {
    data() {
        return {
            struct: {
                user_id: this.$store.state.temporary.user_id,
                medName: "",
                brand: "",
            },
            success: false,
            error: false,
            warning: false,
            snackbar: {
                success: "Medicine added Successsfully",
                warning: "Field not be Empty",
                error: "Medicine already Exist"
            },
            items:[]
        }
    },
    methods: {
        push() {
            if (this.struct.user_id == "" || this.struct.medName == "" || this.struct.brand == "") {

                this.warning = true
            } else {
                EventServices.InsertMed(this.struct)
                    .then((response) => {
                        if (response.data.status == "S") {
                            this.success = true
                        } else {
                            this.error = true
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                this.refreshMedMas()
                this.$emit("newval",this.items)
                this.struct = {};
            }
        },
        off() {
            this.$emit("off")
        },
        refreshMedMas() {
            EventServices.GetMedMas()
                .then((response) => {
                    // console.log(response);
                    if (response.data.status == "S") {
                        this.items = response.data.masterArr;
                    } else {
                        this.Msg = response.data.errMsg;
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    },
    props: {
        on: Boolean
    }
}
</script>