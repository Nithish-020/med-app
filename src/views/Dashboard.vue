<template>
    <div>
        <!-- <menubar/>             -->

        <v-layout class="d-flex justify-center align-center mt-16">
            <!-- Biller Dashboard -->
            
            <Billerdash v-show="dash_2" />

            <!-- Manager Dashboard -->
            <Managerdash v-show="dash_3" />

            <!-- Admin & Inventry Dashboard -->
            <Admindash v-show="dash_1" />

        </v-layout>
    </div>
</template>

<script>
// import menubar from "../components/Menubar.vue"
import Billerdash from "../components/Billerdash.vue"
import Managerdash from "../components/Managerdash.vue"
import Admindash from "../components/Admindash.vue"


export default {
    name: "Dashboard",

    data() {
        return {
            dash_1: false,
            dash_2: false,
            dash_3: false,
        }
    },
    components: {

        Billerdash,
        Managerdash,
        Admindash,

    },
    beforeMount() {
        let role = this.$store.state.temporary.role;

        if (role == "biller") {

            this.dash_2 = true;
        }
        else if (role == "manager") {
            this.dash_3 = true;


        }
        else if (role == "admin" || role == "inventory") {
            this.dash_1 = true;

        }

    }
}

</script>

