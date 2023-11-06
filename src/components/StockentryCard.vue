<template>
    <div>

        <v-container class="d-flex justify-space-between mx-auto">
            <v-flex class="mr-3">
                <v-menu offset-y>

                    <template v-slot:activator="{ on, attrs }">
                        <v-autocomplete v-bind="attrs" v-on="on" :items="newitem" item-value="med_id" item-text="medName"
                            v-model="stock.med_id" @change="call" dense outlined elevation="0">
                        </v-autocomplete>
                    </template>
                </v-menu>
            </v-flex>
            <v-flex class="mr-3">
                <v-text-field label="Brand" v-model="Brand" outlined dense disabled>
                </v-text-field>
            </v-flex>
            <v-flex class="mr-3">
                <v-text-field label="Qty" v-model.number="stock.qty" outlined dense>
                </v-text-field>
            </v-flex>
            <v-flex class="mr-3">
                <v-text-field label="Unit Price" v-model.number="stock.price" outlined dense>
                </v-text-field>
            </v-flex>
        </v-container>
        <v-container class="d-flex justify-center align-center">
            <v-btn width="680" class="primary" @click="update">Update</v-btn>
        </v-container>


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
            stock: {
                user_id: this.$store.state.temporary.user_id,
                med_id: "",
                qty: undefined,
                price: undefined,
            },
            snackbar: {
                success: "Stock Updated Successfully",
                warning: "Field Cannot be Empty",
                error: "Cannot Update Stock"
            },
            Brand: "",
            items: [],
            success: false,
            error: false,
            warning: false
        }
    },
    methods: {
        // select the brand for medicine
        call() {
            console.log("call")
            for (let i = 0; i < this.items.length; i++) {
                // console.log(this.medicineName)
                if (this.items[i].med_id == this.stock.med_id) {
                    console.log("if part")
                    this.Brand = this.items[i].brand;
                    break;
                }
            }
        },
        //  Update the Stock Array
        update() {
            if (this.stock.med_id == "" || this.stock.qty == "" || this.stock.price == "") {
                this.warning = true
            } else {
                EventServices.StockEntry(this.stock)

                    .then((response) => {
                        console.log(response);
                        if (response.data.status == "S") {
                            this.success = true;
                        } else {
                            this.error = true
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                this.stock = {}
                this.Brand = ""
            }
        },
    },

    mounted() {

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

    },
    props: {
        Newarr: []
    },
    computed: {
        newitem: {
            get() {
                return this.items
            },
            set(newval) {
                this.items = newval;
            }
        }
    }
}
</script>