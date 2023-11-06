import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import MyButton from '../plugins/Custom.vue'

Vue.use(Vuetify);
Vue.component('my-button', MyButton)

export default new Vuetify({
    el: '#app',
    vuetify: new Vuetify()
});
