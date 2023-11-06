 <!-- my-button.vue -->

<template>
    <v-btn v-on="$listeners" :disabled="disabled" :color="color" :underline="underline">{{ label }}</v-btn>
</template>

<script>
import { VBtn } from 'vuetify/lib'

export default VBtn.extend({
    name: 'MyButton',
    props: {
        label: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'primary'
        },
        underline:{
            type: String,
            default: 'none',
        }
    }
})
</script>

<style scoped>
v-btn {
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    color: black;
}
v-btn:hover{
    background-color: #f5f5f5;
    opacity: 0.5;
    text-decoration: underline;
}

</style>
