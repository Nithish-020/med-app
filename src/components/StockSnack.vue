<template>
    <div>
        <v-snackbar :timeout="timeout" v-model="newError" bottom color="red accent-4 white--text">
            <v-icon class="mr-3">mdi-alert-circle</v-icon>
            Stock Cannot be Empty
        </v-snackbar>

        <v-snackbar :timeout="timeout" v-model="newSuccess" color="success" bottom>
            <v-icon class="mr-3">mdi-check-circle</v-icon>
            Stock Added Successfully
        </v-snackbar>
    </div>
</template>

<script>

export default {
    data() {
        return {
            success: null,
            error:null,
            timeout: 1500,
        }
    },
    props: {
        value1: Boolean,
        value2: Boolean
    },
    computed: {
        newSuccess: {
            get() {
                if (this.success == null) {
                    return this.value1
                } else {
                    return this.success
                }
               
            },
            set(success){
                this.success = success;
            }
        },
        newError:{
            get() {
                if (this.error == null) {
                    return this.value2
                } else {
                    return this.error
                }
               
            },
            set(error){
                this.error = error;
            }
        }
    },
    

}

</script>