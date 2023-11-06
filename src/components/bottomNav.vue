<template>
    <div>
        <v-bottom-sheet v-model="sheet">
            <v-sheet class="text-center" height="100px">
                <v-btn class="mt-6" text color="red" @click="resp">
                    Thanks
                </v-btn>
                <div class="py-3">
                    Hi ! <span class="primary--text">"MED APP"</span> User we are pleased to have you use our application, which was created in an intuitive and flexible manner.
                    Please contact your <u class="primary--text">admin</u> if you don't already have a user login.
                </div>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>

<script>

export default {
    props: {
        sheet: Boolean
    },
    methods: {
        resp() {
            this.$emit("resp")
        }
    }
}
</script>