<template>
  <v-app>
    <!--* Component -->
    <menubar v-show="menushow" :role="role" />
    <bottomNav :sheet="sheet" @resp="resp" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import menubar from "./components/Menubar.vue"
import bottomNav from "./components/bottomNav.vue";
import EventServices from "./services/EventServices";


export default {
  name: "App",

  data: () => ({
    role: "",
    menushow: false,
    routername: "",
    sheet: false,
  }),
  components: {
    menubar,
    bottomNav
  },
  beforeUpdate() {
    this.role = this.$store.state.temporary.role;

    if (this.role != "") {
      this.menushow = true;
    } else {
      this.menushow = false;
    }
  },
  created() {
    return this.routername = this.$router.name
  },
  watch: {
    routername: function () {
      if (this.routername == "Login") {
        this.menushow = false

      }
    }
  },
  mounted() {
    this.$router.push('/')
    EventServices.CheckValid()
      .then((response) => {
        if (response.data.status == "S") {
          console.log(response.data)
          if (response.data.valid == "Not") {
            this.sheet = true
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    resp() {
      this.sheet = false
    }
  }

};
</script>
