<template>
    <div>
        <!-- <menubar /> -->

        <!-- Add icon for New Medicine Entry -->
        <v-layout class="d-flex justify-center align-center">
            <v-card class="mt-16 mx-auto" width="700">

                <v-container class="d-flex  justify-space-between">
                    <v-flex>Refill Stock</v-flex>
                    <v-flex class="d-flex justify-end">
                        <v-btn small elevation="0" @click="dialog">
                            <v-icon>mdi-plus</v-icon>
                            ADD
                        </v-btn>
                    </v-flex>
                </v-container>

                <!-- Refill Stock Section -->
                <StockCard @success="suc" @error="err" :Newarr="temp"/>
            </v-card>
        </v-layout>

        <!-- New Medicine Adding -->
        <StockentryDialog :on="enable" @off="off" @newval="newArr"/>
        <!-- SnackBar -->
        <Snack :value1="success" :value2="error" />
    </div>
</template>

<script>
// import menubar from "../components/Menubar.vue"
import StockentryDialog from "../components/StockentryDialog.vue"
import Snack from "../components/StockSnack.vue"
import StockCard from "../components/StockentryCard.vue"

export default {
    data() {
        return {
            error: false,
            success: false,
            enable: false,
            temp:[]
        }
    },
    methods: {
        // Popup
        dialog() {
            this.enable = true;
        },
        off() {
            this.enable = false
        },
        // snackbar
        suc(s) {
            this.success = s;
        },
        err(e) {
            this.error = e;
        },
        newArr(a){
            this.temp = a
        }
    },
    components: {
        // menubar,
        StockentryDialog,
        Snack,
        StockCard
    },
    mounted() {
        this.items = this.$store.state.medicineMaster;

    }
};
</script>