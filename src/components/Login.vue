<template>
  <div class="Login">
    <v-layout>
      <v-flex class="d-flex justify-center align-center mt-16">
        <v-card width="350" class="px-10 py-5">
          <v-responsive :aspect-ratio="16 / 9">
            <v-card-text>
              <v-card-title class="font-weight-bold  text-h5 d-flex justify-center primary--text">Login to
                MedApp</v-card-title>
            </v-card-text>
            <v-card-text>
              <v-form ref="form">
                <v-text-field v-model="Login.username" label="Username" type="email" required outlined
                  :rules="nameRules"></v-text-field>
                <v-text-field v-model="Login.password" label="Password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'" required outlined @click:append="show = !show"
                  :rules="passRules"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-btn color="primary" @click="login" width="150">Login</v-btn>
            </v-card-actions>
          </v-responsive>
        </v-card>
      </v-flex>

      <!--* Snack bar -->

      <v-snackbar :timeout="timeout" :value="errorMessage" color="red">
        <v-icon class="white--text mr-3">mdi-alert-circle</v-icon>
        <span>Invalid User name or Password</span>
      </v-snackbar>
    </v-layout>
  </div>
</template>
  
<script>
import EventServices from '../services/EventServices';
export default {
  name: "Login",
  data() {
    return {
      Login: {
        username: "",
        password: ""
      },
      show: false,
      errorMessage: false,
      type: "Login",
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 10) || 'Password must be more than 3 characters',
      ],
      timeout: 2000,
      temp: {},
      sheet: false,
    }
  },

  methods: {
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    login() {
      if (this.Login.username == "" || this.Login.password == "") {
        this.errorMessage = true
      } else {
        EventServices.GetLogin(this.Login)
          .then((response) => {
            this.overlay = false
            if (response.data.status == "S") {

              this.temp = response.data.loginData;
              if (this.user_id == 0 || this.user_id == "") {
                this.errorMessage = true
              }
              else {
                this.$store.commit("setStore", this.temp)
                this.$router.push("/dashboard");
              }
            } else {
              this.errorMessage = true
            }
          })
          .catch((error) => {
            console.log(error)
          });

      }
    },
  },

}
</script>

<style scoped>
.Login {
  background-image: url("../assets/pharmacy.jpg");
  background: cover;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
}
</style>
  