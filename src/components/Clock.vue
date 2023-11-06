<template>
    <div >
        <p class=" font-weight-bold white--text">
            <v-icon size="20" color="" class="white--text ">mdi-timer</v-icon> {{ currentTime }}</p>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            currentTime: ""
        };
    },
    mounted() {
        this.updateTime();
    },
    methods: {
        updateTime() {
            setInterval(() => {
                const date = new Date();
                this.currentTime = date.toLocaleTimeString();
            }, 1000);
        }
    }
};
</script>
  